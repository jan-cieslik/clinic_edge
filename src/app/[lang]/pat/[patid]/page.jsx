import PatDashboard from "@/app/components/PatDashboard/patdashboard";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";

export default async function AppPatDashboard(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang);
  const pat = await getPatient(patid);
  return (
    <>
      <PatHeading>{dict.pat.navigation.overview}</PatHeading>
      <PatDashboard dict={dict} patid={patid} pat={pat.pat_data} lang={lang}></PatDashboard>
    </>
  );
}
