import AppCard from "../elements/appcard";

export default function PatDisplayDiagnosis({ data, patid, dict, lang }) {
    return (
        <AppCard title={dict.diagnosis.diagnosisCoded} classname="mb-12">
            {data == null || Array.isArray(data) && data.length === 0 ? <p>{dict.diagnosis.noData}</p> : <table className="table text-left mt-4">
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
                                    href={`/${lang}/pat/${patid}/diagnosis/remove/${row.id}`}
                                    className=" rounded bg-keyA-800 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-keyA-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-keyA-600"
                                >
                                    -
                                </a></td>
                            <td className="p-2">{row.ref_icd.primary1}</td>
                            <td className="p-2">{row.ref_icd.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}

        </AppCard>
    )
}
