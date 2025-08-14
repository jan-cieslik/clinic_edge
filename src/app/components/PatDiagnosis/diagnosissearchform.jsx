'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DiagnosisSearchForm({dict, lang, patid, searchtextdefault = ''}) {
    const router = useRouter();
    const [searchtext, setSearchtext] = useState(searchtextdefault);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/${lang}/pat/${patid}/diagnosis/search/${searchtext}`);
    };

    return (
        <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSearch}>
            <div className="w-full sm:max-w-xs">
                <label htmlFor="searchtext" className="sr-only">
                    Suchtext
                </label>
                <input
                    type="text"
                    name="searchtext"
                    id="searchtext"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                    placeholder="..."
                    value={searchtext}
                    onChange={(e) => setSearchtext(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-keyA-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-keyA-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
                {dict.general.search}
            </button>
        </form>
    );
}
