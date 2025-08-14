import PatFindings from "@/app/components/PatFindings/patfindings";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getFindings } from "@/utils/logic/logic";

export default async function AppPatFindings(props) {
  const params = await props.params;

  const {
    lang,
    patid
  } = params;

  const dict = await getDictionary(lang)
  const findings = await getFindings(patid)
  return (
    <a>
      <PatHeading>{dict.pat.navigation.findings}</PatHeading>
      {(typeof findings === 'undefined' || (Array.isArray(findings) && findings.length === 0))? "Keine Daten vorhanden." : <PatFindings dict={dict} findings={findings} lang={lang} patid={patid}></PatFindings>}
    </a>);
}
