import PatDisplayDiagnosis from "@/app/components/PatDiagnosis/patDisplaydiagnosis";
import PatDiagnosis from "@/app/components/PatDiagnosis/patdiagnosis";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getDiagnosis } from "@/utils/logic/logic";
import { addDiagnosis } from "@/utils/logic/logic_server";

export default async function AppPatDiagnosis(props) {
  const params = await props.params;

  const {
    lang,
    patid,
    icd_id
  } = params;

  const dict = await getDictionary(lang)
  const update = await addDiagnosis(patid, icd_id, lang)
  const data = await getDiagnosis(patid)
  return (
  <>
  <PatHeading>{dict.pat.navigation.diagnosis}</PatHeading>
  <PatDisplayDiagnosis dict={dict} lang={lang} patid={patid} data={data}></PatDisplayDiagnosis>
  <PatDiagnosis dict={dict} lang={lang} patid={patid} searchtext="..."></PatDiagnosis>
  </>);
}
