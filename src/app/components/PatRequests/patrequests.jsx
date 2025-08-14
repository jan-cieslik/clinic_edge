import { requestGroups } from "@/utils/logic/requests";
import AppCard from "../elements/appcard";

export default function PatRequests({ patid, dict, lang, current, classname, children }) {
    return (
        <AppCard classname="col-span-1 sm:col-span-2" title={dict.pat.navigation.requests}>
            <table className="table-fixed min-w-full">
                <thead>
                    <tr className="text-left">
                        <th className=" w-4"></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                {Object.keys(requestGroups).map((group_key) => (
                    <tbody key={group_key} className="zebra">
                        <tr><th colSpan={2} className="text-left bg-slate-300 p-2">{dict.findings[group_key].name}</th></tr>
                        {requestGroups[group_key].items.map((item) => (
                            <tr key={item}>
                                <td className="p-2">
                                    {current == item ? <a
                                        className="mr-4 rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                    >
                                        {dict.general.order}
                                    </a>:
                                    <a
                                        href={"/"+lang+"/pat/"+patid+"/requests/"+group_key+"/"+item}
                                        className="mr-4 rounded bg-keyA-800 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                    >
                                        {dict.general.order}
                                    </a>}
                                </td>
                                <td className="p-2">{dict.findings[group_key].children[item].name}</td>
                            </tr>
                        ))}
                    </tbody>
                ))}


            </table>
        </AppCard>
    )
}
