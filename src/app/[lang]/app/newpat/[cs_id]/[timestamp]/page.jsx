'use server'
import { checkPatientExists, generateAndPushPatient, getAllCaseTemplates, getCardinalSymptom } from "@/utils/logic/logic";
import { getUser } from "@/utils/logic/logic_server";
import { redirect } from "next/navigation";

export default async function AppNewPat(props) {
  const params = await props.params;

  const {
    lang,
    cs_id,
    timestamp
  } = params;

  const { userId } = await getUser()
  const already_requested = await checkPatientExists(userId, timestamp)
  if (already_requested !== null) {
    redirect("/" + lang + "/pat/" + already_requested)
  }
  const cardinalSymptom = await getCardinalSymptom(cs_id);

  if(cardinalSymptom === null || Array.isArray(cardinalSymptom) && cardinalSymptom.length === 0){
    redirect("/")
  }
  const allCaseTemplates = await getAllCaseTemplates(cardinalSymptom.cs_key);
  if (allCaseTemplates === null) {
    return ("Error: No cases found for this cardinal symptom")
  }
  const randomCase = allCaseTemplates[Math.floor(Math.random() * allCaseTemplates.length)];
  var newdata = await generateAndPushPatient(randomCase.case_id, userId, timestamp)
  redirect("/" + lang + "/pat/" + newdata[0].pat_id)
}
