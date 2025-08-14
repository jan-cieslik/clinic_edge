import AppCard from "../elements/appcard";
import DiagnosisSearchForm from "./diagnosissearchform";

export default function PatDiagnosis({ data, patid, dict, lang, classname, children, searchtext }) {
    return (
        <AppCard title="ICD10">
            <DiagnosisSearchForm dict={dict} lang={lang} patid={patid} searchtextdefault={searchtext} />
            {data == null ? <div></div> : <table className="table text-left mt-4">
                <thead className="bg-slate-400">
                    <tr>
                        <th></th>
                        <th className="p-2">ICD</th>
                        <th className="p-2">{dict.general.description}</th>
                    </tr>
                </thead>
                <tbody className="zebra">
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td className="p-2">
                                <a
                                    href={`/${lang}/pat/${patid}/diagnosis/add/${row.id}`}
                                    className=" rounded bg-keyA-800 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                >
                                    +
                                </a></td>
                            <td className="p-2">{row.primary1}</td>
                            <td className="p-2">{row.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}

        </AppCard>
    )
}
