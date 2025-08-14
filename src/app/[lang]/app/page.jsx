import CaseCardStart from "@/app/components/elements/casecardStart";
import CasesCard from "@/app/components/elements/casescard";
import CsCard from "@/app/components/elements/cscard";
import { getDictionary } from "@/utils/dictionaries";
import { getAllCardinalSymptoms, getAllCaseTemplates, getAllPatients } from "@/utils/logic/logic";
import { getClassrooms, getUser } from "@/utils/logic/logic_server";

export default async function AppDashboard(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang)
  const { userId, isAdmin } = await getUser()
  const allcases = await getAllPatients(userId)
  const allCardinalSymptoms = await getAllCardinalSymptoms(dict)
  const allCaseTemplates = await getAllCaseTemplates()
  const classrooms = await getClassrooms()
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl text-center font-bold my-4">{dict.app.general.case_overview}</h2>
      <CasesCard allcases={allcases} dict={dict} lang={lang} dummy={false} />

      {Object.values(classrooms).map((classroom) => (
        <div key={classroom.id}>
          <h2 className="text-xl text-center font-bold my-4">{dict.app.general.classroom}: {classroom.name}</h2>
          <CaseCardStart data={classroom.classroom_cases} dict={dict} lang={lang} dummy={true} />
        </div>
      ))}

      {isAdmin ? <><h2 className="text-xl text-center font-bold my-4">{dict.app.general.new_case_cs}</h2>
        <CsCard allcs={allCardinalSymptoms} dict={dict} lang={lang} dummy={true} /></> : null}

      {isAdmin ? <><h2 className="text-xl text-center font-bold my-4">{dict.app.general.new_case_direct}</h2>
        <CaseCardStart data={allCaseTemplates} dict={dict} lang={lang} dummy={true} /></> : null}
    </div>
  )
}
