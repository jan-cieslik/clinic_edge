import PatRequests from "@/app/components/PatRequests/patrequests";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";

export default async function AppPatRequests(props) {
    const params = await props.params;

    const {
        lang,
        patid
    } = params;

    const dict = await getDictionary(lang)
    const pat = await getPatient(patid)

    return (
        <div className="">
            <PatHeading>{dict.pat.navigation.requests}</PatHeading>
            <PatRequests dict={dict} patid={patid} lang={lang}></PatRequests>
        </div>
    )
}
