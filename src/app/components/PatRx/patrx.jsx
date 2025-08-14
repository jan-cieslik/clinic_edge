'use client'
import { useState } from "react";
import AppCard from "../elements/appcard";
import RxDB from "./rxdb";
import { ArrowPathIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { addRx, getRx } from "@/utils/logic/logic_server";
import { setNestedValue } from "@/utils/logic/helper";

export default function PatRx({ patid, dict, rxdata_preload, lang, current, classname, children }) {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        setLoading(true)
        for (let [key, value] of formData.entries()) {
            if (value != null && value != '') {
                setNestedValue(data, key.split('-'), value.trim());
            }
        }
        const res = await addRx(patid, Object.values(data.rx))
        const rxdata_new = await getRx(patid)
        setRxdata(rxdata_new)
        setLoading(false)
        setSuccess(true)
    }

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [open, setOpen] = useState(false)
    const [activeLine, setActiveLine] = useState(-1)
    const [rxdata, setRxdata] = useState(rxdata_preload)
    const [formData, setFormData] = useState({
        0: { name: '', ppn: '', regime: '' },
        1: { name: '', ppn: '', regime: '' },
        2: { name: '', ppn: '', regime: '' }
      })
    return (
        <>
            <AppCard classname="col-span-1 sm:col-span-2 mb-4" title={dict.pat.navigation.rx}>
                {(rxdata && Array.isArray(rxdata) && rxdata.length > 0) ? <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-900 text-left">{dict.rx.line} 1</th>
                            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-900 text-left">{dict.rx.line} 2</th>
                            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-900 text-left">{dict.rx.line} 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rxdata.map((rx) => (
                    <tr key={rx.rx_id}>
                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-900">{rx["data-0"]?.name && rx["data-0"]?.name != '' ? <>{rx["data-0"]?.name}<br/>{dict.rx.ppn} {rx["data-0"]?.ppn}<br/>{rx["data-0"]?.regime}</>:"-"}</td>
                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-900">{rx["data-1"]?.name && rx["data-1"]?.name != '' ? <>{rx["data-1"]?.name}<br/>{dict.rx.ppn} {rx["data-1"]?.ppn}<br/>{rx["data-1"]?.regime}</>:"-"}</td>
                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-900">{rx["data-2"]?.name && rx["data-2"]?.name != '' ? <>{rx["data-2"]?.name}<br/>{dict.rx.ppn} {rx["data-2"]?.ppn}<br/>{rx["data-2"]?.regime}</>:"-"}</td>
                    </tr>
                ))}
                    </tbody>
                </table> : "..."}
            </AppCard>
            <AppCard classname="col-span-1 sm:col-span-2" title={dict.pat.navigation.rx}>
                <RxDB open={open} setOpen={setOpen} activeLine={activeLine} formData={formData} setFormData={setFormData} dict={dict} />
                {isLoading ? (
                    <div className="flex justify-start mb-2">
                        <div className="flex items-center space-x-2 max-w-xs rounded-lg bg-gray-300 px-4 py-2 text-black">
                            <ArrowPathIcon className="h-5 w-5 animate-spin text-gray-600" />
                            <span>{dict.requests.loading}</span>
                        </div>
                    </div>
                ) : isSuccess ?
                    <div className="flex justify-start mb-2">
                        <div className="flex items-center space-x-2 max-w-xs rounded-lg bg-green-300 px-4 py-2 text-black">
                            <CheckIcon className="h-5 w-5 text-gray-600" />
                            <span>{dict.requests.success}</span>
                        </div>
                    </div> :
                    <form onSubmit={handleSubmit}>

                        <div className="gap-x-4 flex">
                            <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_gebfrei"
                                        name="rx_gebfrei"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_gebfrei" className="font-medium text-gray-900">
                                        {dict.rx.charge_free}
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_gebpfl"
                                        name="rx_gebpfl"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_gebpfl" className="font-medium text-gray-900">
                                        {dict.rx.charge}
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_noctu"
                                        name="rx_noctu"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_noctu" className="font-medium text-gray-900">
                                        {dict.rx.noctu}
                                    </label>
                                </div>
                            </div>
                            {/* <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_sonstige"
                                        name="rx_sonstige"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_sonstige" className="font-medium text-gray-900">
                                        Sonstige
                                    </label>
                                </div>
                            </div> */}
                            <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_unfall"
                                        name="rx_unfall"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_unfall" className="font-medium text-gray-900">
                                        {dict.rx.accident}
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex gap-x-1">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="rx_arbeitsunfall"
                                        name="rx_arbeitsunfall"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="rx_arbeitsunfall" className="font-medium text-gray-900">
                                        {dict.rx.accident_occupational}
                                    </label>
                                </div>
                            </div>

                        </div>

                        {[1, 2, 3].map((_, index) => (<div className="grid grid-cols-5 items-end gap-x-2" key={index}>
                            <input
                                type="text"
                                name={`rx-line${index}-rx_key`}
                                id={`rx-line${index}-rx_key`}
                                value={formData[index].rx_key}
                                hidden
                            />
                            <div className="mt-4">
                                <label htmlFor={`rx-line${index}-name`} className="block text-sm font-medium leading-6 text-gray-900">
                                    {dict.rx.agent}, {dict.rx.dosage}
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name={`rx-line${index}-name`}
                                        id={`rx-line${index}-name`}
                                        value={formData[index].name}
                                        className="px-2 cursor-not-allowed block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor={`rx-line${index}-ppn`} className="block text-sm font-medium leading-6 text-gray-900">
                                    {dict.rx.ppn}
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name={`rx-line${index}-ppn`}
                                        id={`rx-line${index}-ppn`}
                                        value={formData[index].ppn}
                                        className="px-2 cursor-not-allowed block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor={`rx-line${index}-regime`} className="block text-sm font-medium leading-6 text-gray-900">
                                    {dict.rx.regime}
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name={`rx-line${index}-regime`}
                                        id={`rx-line${index}-regime`}
                                        className="px-2 block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.preventDefault(); setOpen(true); setActiveLine(index) }}
                                className="rounded bg-keyA-800 px-2 py-1 font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                            >
                                {dict.rx.rxdb_open}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    const newFormData = { ...formData };
                                    newFormData[index] = { name: '', ppn: '', regime: '' };
                                    setFormData(newFormData);
                                }}
                                className="flex gap-x-4 justify-center rounded bg-keyA-800 px-2 py-1 font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                            >
                                <TrashIcon className="h-5 w-5" /> {dict.general.delete}
                            </button>
                        </div>))}

                        <button
                            type="submit"
                            className="my-5 mr-5 inline-flex max-w-24 items-center justify-center rounded-md bg-keyA-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                        >
                            {dict.general.submit}
                        </button>
                    </form>}
            </AppCard>
        </>
    )
}
