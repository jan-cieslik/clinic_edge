import PatRequests from "@/app/components/PatRequests/patrequests";
import PatRequestSingle from "@/app/components/PatRequests/patrequestsingle";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";

export default async function AppPatRequestsSingle(props) {
    const params = await props.params;

    const {
        lang,
        patid,
        request_group,
        request_item
    } = params;

    const dict = await getDictionary(lang)
    const pat = await getPatient(patid)

    return (
        <div className="">
            <PatHeading>{dict.pat.navigation.requests}</PatHeading>
            <PatRequests dict={dict} patid={patid} lang={lang} current={request_item}></PatRequests>
            <PatRequestSingle dict={dict} request_group={request_group} request_item={request_item} patid={patid} lang={lang}></PatRequestSingle>
        </div>
    )
}
