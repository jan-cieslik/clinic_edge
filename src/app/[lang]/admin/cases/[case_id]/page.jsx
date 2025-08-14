import { getDictionary } from "@/utils/dictionaries";
import { generatePatient, getCaseTemplates } from "@/utils/logic/logic";
import Markdown from "react-markdown";

export default async function AdminCases(props) {
    const params = await props.params;

    const {
        lang,
        case_id
    } = params;

    const dict = await getDictionary(lang)
    const CaseTemplates = await getCaseTemplates(case_id)
    const case_gen = await generatePatient(case_id, "dummyUser", 0)

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl text-center font-bold my-4">{dict.admin.navigation.cases}</h2>
            <table className="border-collapse table-auto w-full text-sm">
                <thead>
                    <tr>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Name, Comment</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Cardinal Symptoms</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">History</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Labs</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Findings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr key={CaseTemplates.case_id} className="odd:bg-slate-50">
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{CaseTemplates.internal_name}<br />{CaseTemplates.internal_comment}</td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}cardinal_symptoms{'"'}:  {JSON.stringify(CaseTemplates.case_data.cardinal_symptoms, null, 2)}
                                </pre><br />
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}age{'"'}: {JSON.stringify(CaseTemplates.case_data.age, null, 2)}
                                </pre>
                                <br />
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}vitals{'"'}:  {JSON.stringify(CaseTemplates.case_data.vitals, null, 2)}
                                </pre>
                            </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}history{'"'}:  {JSON.stringify(CaseTemplates.case_data.history, null, 2)}
                                </pre>
                            </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}labs{'"'}:  {JSON.stringify(CaseTemplates.case_data.labs, null, 2)}
                                </pre>
                            </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}findings{'"'}:  {JSON.stringify(CaseTemplates.case_data.findings, null, 2)}
                                </pre>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div>

                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                    {JSON.stringify(case_gen, null, 2)}
                </pre>
                <Markdown className="prose">
                    {case_gen.pat_data.vignette}
                </Markdown>
            </div>
        </div>
    )
}
