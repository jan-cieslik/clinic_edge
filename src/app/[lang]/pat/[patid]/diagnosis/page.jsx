import PatDisplayDiagnosis from "@/app/components/PatDiagnosis/patDisplaydiagnosis";
import PatDiagnosis from "@/app/components/PatDiagnosis/patdiagnosis";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getDiagnosis } from "@/utils/logic/logic";

export default async function AppPatDiagnosis(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang)
  const data = await getDiagnosis(patid)
  //var data = await getICD()
  return (
  <>
  <PatHeading>{dict.pat.navigation.diagnosis}</PatHeading>
  <PatDisplayDiagnosis dict={dict} lang={lang} patid={patid} data={data}></PatDisplayDiagnosis>
  <PatDiagnosis dict={dict} lang={lang} patid={patid}></PatDiagnosis>
  </>);
}
