import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";

export default async function AppPatDiagnosis(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang)
const pat = await getPatient(patid);
  //var data = await getICD()
  return (
  <>
  <PatHeading>Debug</PatHeading>
  <pre>{JSON.stringify(pat, null, 2)}</pre>
  </>);
}
