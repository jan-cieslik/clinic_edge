'use client'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import RxDataTable from './rxtable';

async function fetchresults(e, setSearchResults) {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URI + "/rxsearch/" + encodeURI(e.target.elements.rx_search.value))
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    var data = await res.json()
    setSearchResults(data)
}

export default function RxDB({ activeLine, open, setOpen, formData, setFormData, dict }) {
    const [searchresults, setSearchResults] = useState([])
    return (
        <>
            <Dialog className="relative z-10" open={open} onClose={setOpen}>
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div> */}
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        RxDB; {dict.rx.line} {activeLine + 1}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form onSubmit={(e) => { fetchresults(e, setSearchResults) }}>
                                            <div className='grid grid-cols-2 items-end gap-x-4'>
                                                <div className="">
                                                    <label htmlFor="rx_search" className="block text-sm font-medium leading-6 text-gray-900">
                                                        {dict.rx.search_agent}...
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="rx_search"
                                                            name="rx_search"
                                                            type="text"
                                                            className="h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className=" h-8 inline-flex w-full justify-center rounded-md bg-keyA-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                                >
                                                    {dict.general.search}
                                                </button>
                                            </div>
                                            {searchresults.length == 0 ? "" : <RxDataTable data={searchresults} setData={setSearchResults} modalSetOpen={setOpen} activeLine={activeLine} formData={formData} setFormData={setFormData} dict={dict} />}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-keyA-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                    onClick={() => setOpen(false)}
                                >
                                    Zurück
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>

    )
}