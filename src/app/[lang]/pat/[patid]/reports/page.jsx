import PatReports from "@/app/components/PatReports/patreports";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";

export default async function AppPatReports(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang)
  const pat = await getPatient(patid)
  return (
    <>
    <PatHeading>{dict.pat.navigation.reports}</PatHeading>
    <PatReports />
    </>);
}
