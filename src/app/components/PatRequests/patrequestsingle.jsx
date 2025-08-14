'use client'
import { requestItems } from "@/utils/logic/requests";
import AppCard from "../elements/appcard";
import { requestWrapper } from "@/utils/logic/logic_server";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { setNestedValue } from "@/utils/logic/helper";

export default function PatRequestSingle({
    request_item,
    request_group,
    patid,
    dict,
    lang,
    classname,
    children,
}) {

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        setLoading(true)
        for (let [key, value] of formData.entries()) {
            // Remove 'form_' prefix and split the rest to get the nested keys
            const keys = key.startsWith("form-") ? key.substring(5).split('-') : key.split('-');
            setNestedValue(data, keys, value);
        }
        const res = await requestWrapper(patid, request_group, request_item, data)
        setLoading(false)
        setSuccess(true)
    }

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    return (
        <div className="mt-4">
            <AppCard
                classname="col-span-1 sm:col-span-2"
                title={dict.findings[request_group].children[request_item].name}
            >
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
                    </div> : <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap gap-8">
                            {Object.keys(requestItems[request_item].form).map((form_key) => {
                                const path = `dict.findings["${request_group}"].children["${request_item}"].form["${form_key}"].name`;
                                // Ensure the key exists before accessing
                                var name =
                                    dict.findings?.[request_group]?.children?.[request_item]?.form?.[form_key]?.name;

                                if (name === undefined) {
                                    console.warn(`Missing key: ${path}`);
                                    name = form_key
                                }
                                return (
                                    <div key={form_key} className="mt-4 rounded-md bg-slate-200 p-8">
                                        <label
                                            htmlFor={"form-" + form_key}
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {
                                                name
                                            }
                                            {requestItems[request_item].form[form_key].required == true
                                                ? "*"
                                                : ""}
                                        </label>
                                        {requestItems[request_item].form[form_key].type == "text" ? (
                                            <div className="col-span-full">
                                                <div className="mt-2">
                                                    <textarea
                                                        id={"form-" + form_key}
                                                        name={"form-" + form_key}
                                                        rows={3}
                                                        className="bg-white p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:text-sm sm:leading-6"
                                                        defaultValue={""}
                                                        required={requestItems[request_item].form[form_key].required == true}
                                                    />
                                                </div>
                                                {dict.findings[request_group].children[request_item].form[
                                                    form_key
                                                ].comment != null ? (
                                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                                        {
                                                            dict.findings[request_group].children[request_item]
                                                                .form[form_key].comment
                                                        }
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        ) : requestItems[request_item].form[form_key].type == "select" ? (
                                            <div className="mt-2">
                                                <select
                                                    id={"form-" + form_key}
                                                    name={"form-" + form_key}
                                                    className="bg-white p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-keyA-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    defaultValue={""}
                                                    required={requestItems[request_item].form[form_key].required}
                                                >
                                                    <option value="" disabled>
                                                        ---
                                                    </option>
                                                    {Object.keys(
                                                        requestItems[request_item].form[form_key].choices
                                                    ).map((choice) => (
                                                        <option
                                                            key={choice}
                                                            value={choice}
                                                            disabled={
                                                                requestItems[request_item].form[form_key].choices[
                                                                    choice
                                                                ].type == "heading"
                                                            }
                                                        >
                                                            {
                                                                dict.findings[request_group].children[request_item]
                                                                    .form[form_key].choices[choice]
                                                            }
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : requestItems[request_item].form[form_key].type ==
                                            "checkbox" ? (
                                            <div className="mt-2">
                                                <fieldset>
                                                    <div className="mt-6 space-y-6">
                                                        {Object.keys(
                                                            requestItems[request_item].form[form_key].choices
                                                        ).map((choice) => (
                                                            <div key={choice} className="relative flex gap-x-3">
                                                                {
                                                                    requestItems[request_item].form[form_key].choices[
                                                                        choice
                                                                    ].type == "heading" ? <p className="text-lg font-bold underline">{dict.findings[request_group].children[request_item]
                                                                        .form[form_key].choices[choice]}</p> : <><div className="flex h-6 items-center">
                                                                            <input
                                                                                id={"form-" + form_key + "-" + choice}
                                                                                name={"form-" + form_key + "-" + choice}
                                                                                type="checkbox"
                                                                                className="h-4 w-4 rounded border-gray-300 text-keyA-800 focus:ring-keyA-600"
                                                                            />
                                                                        </div>
                                                                        <div className="text-sm leading-6">
                                                                            <label
                                                                                htmlFor={"form-" + form_key + "-" + choice}
                                                                                className="font-medium text-gray-900"
                                                                            >
                                                                                {
                                                                                    dict.findings[request_group].children[request_item]
                                                                                        .form[form_key]?.choices?.[choice] ?? choice
                                                                                }
                                                                            </label>
                                                                            {/*  <p className="text-gray-500">
                                                    Get notified when someones posts a comment on a
                                                    posting.
                                                </p> */}
                                                                        </div></>
                                                                }

                                                            </div>))}


                                                    </div>
                                                </fieldset>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <button
                            type="submit"
                            className="my-5 mr-5 inline-flex max-w-24 items-center justify-center rounded-md bg-keyA-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                        >
                            {dict.general.submit}
                        </button>
                        *{dict.general.required}
                    </form>}

            </AppCard>
        </div>
    );
}
