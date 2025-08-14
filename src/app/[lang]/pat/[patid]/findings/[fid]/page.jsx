import PatFindings from "@/app/components/PatFindings/patfindings";
import PatFindingSingle from "@/app/components/PatFindings/patfindingsingle";
import PatHeading from "@/app/components/elements/patheading";
import { getDictionary } from "@/utils/dictionaries";
import { getFindings } from "@/utils/logic/logic";

export default async function AppPatFindingsIndividual(props) {
  const params = await props.params;

  const {
    lang,
    patid,
    fid
  } = params;

  const dict = await getDictionary(lang)
  const findings = await getFindings(patid)
  return (
    <>
      <PatHeading>{dict.pat.navigation.findings}</PatHeading>
      <PatFindings dict={dict} findings={findings} lang={lang} patid={patid}></PatFindings>
      <PatFindingSingle dict={dict} finding={findings.find(obj => obj.id === Number(fid))} lang={lang} patid={patid}></PatFindingSingle>
    </>
  );
}
