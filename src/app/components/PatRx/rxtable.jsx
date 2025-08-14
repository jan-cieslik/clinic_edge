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

function AddButton({activeLine, formData, setFormData, modalSetOpen, ppn, rx_key, name_strength, adm, setData}) {
    return (<button onClick={(e) => {
        e.preventDefault()
        var tmpobj = formData
        tmpobj[activeLine].ppn = ppn
        tmpobj[activeLine].rx_key = rx_key
        tmpobj[activeLine].name = name_strength + " ("+ adm+")"
        setFormData(tmpobj)
        modalSetOpen(false)
        setData([])}
        }
        className="rounded bg-keyA-800 px-2 py-1 font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600">+</button>)
}

export default function RxDataTable({ classname, data, setData, children, modalSetOpen, setFormData, activeLine, formData, dict }) {
    const [sorting, setSorting] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({ key:false, ppn: true, name_strength: true, adm:true})

    const columnHelper = createColumnHelper()
    const columns = [

        columnHelper.accessor(row => `${row.ppn}`, {
            id: 'addButton',
            accessorKey: 'addButton',
            cell: info => <AddButton ppn={info.row.original.ppn} name_strength={info.row.original.name_strength} rx_key={info.row.original.key} adm={info.row.original.adm_short} modalSetOpen={modalSetOpen} setFormData={setFormData} activeLine={activeLine} formData={formData} setData={setData} ></AddButton>,
            header: () => <span></span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => true,
        }),

        columnHelper.accessor(row => `${row.key}`, {
            id: 'key',
            accessorKey: 'key',
            cell: info => info.getValue(),
            header: () => <span>key</span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => false,
        }),

        columnHelper.accessor(row => `${row.ppn}`, {
            id: 'ppn',
            accessorKey: 'ppn',
            cell: info => info.getValue(),
            header: () => <span>{dict.rx.ppn}</span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => true,
        }),

        columnHelper.accessor(row => `${row.adm_short}`, {
            id: 'adm',
            accessorKey: 'adm',
            cell: info => info.getValue(),
            header: () => <span>{dict.rx.adm}</span>,
            footer: info => info.column.id,
            getColumnCanGlobalFilter: () => true,
        }),

        columnHelper.accessor(row => `${row.name_strength}`, {
            id: 'name_strength',
            accessorKey: 'name_strength',
            cell: info => info.getValue(),
            header: () => <span>{dict.rx.agent}</span>,
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
            {/* <div className="h-2" />
            <div className='flex gap-x-2 gap-y-2 flex-wrap'>
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter(String(value))}
                    placeholder="Suchen..."
                />
            </div> */}
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
                <tbody className="divide-y divide-gray-200 zebra text-left">
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
