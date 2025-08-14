'use server'
import { checkPatientExists, generateAndPushPatient } from "@/utils/logic/logic";
import { getUser } from "@/utils/logic/logic_server";
import { redirect } from "next/navigation";

export default async function AppNewPat(props) {
    const params = await props.params;

    const {
        lang,
        case_id,
        timestamp
    } = params;

    const { userId } = await getUser();
    const already_requested = await checkPatientExists(userId, timestamp)
    if (already_requested !== null) {
        redirect("/" + lang + "/pat/" + already_requested)
    }
    var newdata = await generateAndPushPatient(case_id, userId, timestamp)
    redirect("/" + lang + "/pat/" + newdata[0].pat_id)
}
