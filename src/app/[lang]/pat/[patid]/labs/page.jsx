import PatLabs from "@/app/components/PatLabs/patlabs";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getLabs } from "@/utils/logic/logic";

export default async function AppPatLabs(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang)
  const labs = await getLabs(patid)
  return (
  <>
  <PatHeading>{dict.pat.navigation.labs}</PatHeading>
  {(Array.isArray(labs.labs) && labs.labs.length === 0) ? dict.general.noData:<PatLabs dict={dict} data={labs} lang={lang} patid={patid}></PatLabs>}
  </>);
}
