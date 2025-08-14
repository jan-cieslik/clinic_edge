'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    createColumnHelper,
    useReactTable,
    getFilteredRowModel,
} from '@tanstack/react-table'
import React from 'react'

export default function DiagnosisDataTable({ classname, data, children }) {
    const [sorting, setSorting] = React.useState([{ id: "primary1", asc: true }])
    const [columnVisibility, setColumnVisibility] = React.useState({ primary1: true, text: true})

    const columnHelper = createColumnHelper()
    const columns = [

        columnHelper.accessor(row => `${row.primary1}`, {
            id: 'primary1',
            accessorKey: 'primary1',
            cell: info => {info.getValue()},
            header: () => <span>ICD</span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => true,
        }),

        columnHelper.accessor(row => `${row.text}`, {
            id: 'text',
            accessorKey: 'text',
            cell: info => {info.getValue()},
            header: () => <span>Beschreibung</span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => true,
        }),
    ]

    const fuzzyFilter = (row, columnId, value, addMeta) => {
        return row.getValue(columnId).toLowerCase().includes(value.toLowerCase())
    }


    function DebouncedInput({
        value: initialValue,
        onChange,
        debounce = 500,
        ...props
    }) {
        const [value, setValue] = React.useState(initialValue)

        React.useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        React.useEffect(() => {
            const timeout = setTimeout(() => {
                onChange(value)
            }, debounce)

            return () => clearTimeout(timeout)
        }, [value])

        return (
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>

                <input {...props} value={value} onChange={e => setValue(e.target.value)}
                    className="placeholder:italic block w-auto rounded-md border-0 bg-white py-1.5 pl-10 pr-3
                 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                 focus:ring-2 focus:ring-inset focus:ring-keyD-600" />
            </div>
        )
    }

    const [globalFilter, setGlobalFilter] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
            columnVisibility
        },
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
        enableSortingRemoval: false
    })

    return (
        <div className="p-2">
            <div className="h-2" />
            <div className='flex gap-x-2 gap-y-2 flex-wrap'>
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter(String(value))}
                    placeholder="Suchen..."
                />
            </div>
            <table className="table-fixed min-w-full divide-y divide-gray-300">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} className={"py-3.5 text-left text-sm font-semibold text-gray-900" + (header.column.id == "bookmark" ? " px-2" : "")}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " ▲",
                                                    desc: " ▼",
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 zebra">
                    {table
                        .getRowModel()
                        .rows
                        .map(row => {
                            return (
                                <tr key={row.id} className=' hover:bg-keyA-200'>

                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className={"px-1 py-2 text-sm text-gray-900"}>

                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}


                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}
