import { getDictionary } from "@/utils/dictionaries";
import { getAllTemplates } from "@/utils/logic/logic";

export default async function AdminTemplates(props) {
    const params = await props.params;

    const {
        lang
    } = params;

    const dict = await getDictionary(lang)
    const templates = await getAllTemplates()
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl text-center font-bold my-4">{dict.admin.navigation.cases}</h2>
            <table className="border-collapse table-auto w-full text-sm">
                <thead>
                    <tr>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Info</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Template</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Vars</th>
                        <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">Path. Vars</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map((template) => (
                        <tr key={template.id} className="odd:bg-slate-50"><td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                            <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                {JSON.stringify(
                                    Object.fromEntries(Object.entries(template).filter(([key]) => ["title", "request_group", "request_item", "request_type"].includes(key))), null, 2
                                )}
                            </pre>
                        </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {template.template}
                                </pre>
                            </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}vars{'"'}:  {JSON.stringify(template.vars, null, 2)}
                                </pre>
                            </td>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                <pre className="bg-gray-100 rounded p-2 text-sm text-slate-600 overflow-x-auto">
                                    {'"'}vars_path{'"'}:  {JSON.stringify(template.vars_path, null, 2)}
                                </pre>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
