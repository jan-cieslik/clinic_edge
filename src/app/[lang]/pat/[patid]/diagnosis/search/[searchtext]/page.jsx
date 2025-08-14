import PatDisplayDiagnosis from "@/app/components/PatDiagnosis/patDisplaydiagnosis";
import PatDiagnosis from "@/app/components/PatDiagnosis/patdiagnosis";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getDiagnosis, getICD } from "@/utils/logic/logic";

export default async function AppPatDiagnosis(props) {
  const params = await props.params;

  const {
    lang,
    patid,
    searchtext
  } = params;

  var searchtext_decoded = decodeURIComponent(searchtext)
  const dict = await getDictionary(lang)
  const icd_data = await getICD(searchtext_decoded)
  const data = await getDiagnosis(patid)
  return (
  <>
  <PatHeading>{dict.pat.navigation.diagnosis}</PatHeading>
  <PatDisplayDiagnosis dict={dict} lang={lang} patid={patid} data={data}></PatDisplayDiagnosis>
  <PatDiagnosis dict={dict} data={icd_data} lang={lang} patid={patid} searchtext={searchtext_decoded}></PatDiagnosis>
  </>);
}
