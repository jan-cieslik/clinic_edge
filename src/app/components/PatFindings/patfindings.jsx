import { formatDateTime } from "@/utils/logic/helper";
import AppCard from "../elements/appcard";

export default function PatFindings({ findings, patid, dict, lang, classname, children }) {
    function findChildById(obj, id) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                let result = findChildById(obj[key], id);
                if (result) {
                    return result;
                }
            } else if (key === id) {
                return {value: obj[key], parent: obj['name']};
            }
        }
        return null;
    }
    return (
        <div className="grid sm:grid-cols-3 gap-4">
            <AppCard title={dict.general.categories}>
                ...
            </AppCard>
            <AppCard classname="col-span-1 sm:col-span-2" title={dict.general.findings}>
                <table className="table-auto min-w-full">
                    <thead>
                        <tr className="text-left">
                            <th>{dict.general.timepoint}</th>
                            <th>{dict.general.type}</th>
                            <th>{dict.general.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {findings.map((finding) => (
                        <tr key={finding.id}>
                            <td><a className="block" href={"/"+lang+"/pat/"+patid+"/findings/"+finding.id}>{formatDateTime(finding.date, lang)}</a></td>
                            <td><a className="block" href={"/"+lang+"/pat/"+patid+"/findings/"+finding.id}>{dict.findings[finding.request_group].name}</a></td>
                            <td><a className="block" href={"/"+lang+"/pat/"+patid+"/findings/"+finding.id}>{finding.data.title}</a></td>
                            <td><a className="block text-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" href={"/"+lang+"/pat/"+patid+"/findings/"+finding.id}>Öffnen</a></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </AppCard>
        </div>
    )
}
