import PatRx from "@/app/components/PatRx/patrx";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getRx } from "@/utils/logic/logic_server";

export default async function AppPatRx(props) {
    const params = await props.params;

    const {
        lang,
        patid
    } = params;

    const dict = await getDictionary(lang)
    const rxdata = await getRx(patid)

    return (
        <div className="">
            <PatHeading>{dict.pat.navigation.rx}</PatHeading>
            <PatRx dict={dict} lang={lang} patid={patid} rxdata_preload={rxdata}></PatRx>
        </div>
    )
}
