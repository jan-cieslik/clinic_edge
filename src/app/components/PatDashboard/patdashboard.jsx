import Markdown from "react-markdown";
import AppCard from "../elements/appcard";
import { formatDate } from "@/utils/logic/helper";

export default function PatDashboard({ pat, dict, lang, classname, children }) {
    return (
        <>

            <div className="grid sm:grid-cols-2 gap-4">
                {pat?.vignette == "" || pat?.vignette == null ? null :
                    <AppCard title={dict.general.vignette} >
                        <Markdown >{pat.vignette}</Markdown>
                    </AppCard>
                }
                <AppCard title={dict.general.data_general}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.name}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.name_last}, {pat.name_first}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.dob}</div>
                            <div className="text-lg font-semibold text-gray-900">{formatDate(pat.dob, lang)}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.gender}</div>
                            <div className="text-lg font-semibold text-gray-900">{dict.general.genders[pat.gender].adj}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.address}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.address.city}, {pat.address.zip}, {pat.address.street}</div>
                        </div>
                    </div>
                </AppCard>
                <AppCard title={dict.general.dependants}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.relations[pat.dependants[0].relation]}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.dependants[0].name_last}, {pat.dependants[0].name_first}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.dependants[0].phone}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500"></div>
                            <div className="text-lg font-semibold text-gray-900"></div>
                            <div className="text-lg font-semibold text-gray-900"></div>
                        </div>
                    </div>
                </AppCard>
                <AppCard title={dict.general.insurance}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.insurance}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.insurance.name}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.insurance_number}</div>
                            <div className="text-lg font-semibold text-gray-900">{pat.insurance.number}</div>
                        </div>
                    </div>
                </AppCard>
                {/* <AppCard title={dict.general.data_case}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">{dict.general.case_start}</div>
                            <div className="text-lg font-semibold text-gray-900"></div>
                        </div>
                    </div>
                </AppCard> */}
            </div>
        </>
    )
}
