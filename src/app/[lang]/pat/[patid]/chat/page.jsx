import PatHeading from "@/app/components/elements/patheading";
import PatChat from "@/app/components/PatChat/patchat";
import { getDictionary } from "@/utils/dictionaries";
import { getUser } from "@/utils/logic/logic_server";
import { createClient } from "@/utils/supabase/server";

export default async function AppPatChat(props) {
    const params = await props.params;

    const {
        lang,
        patid
    } = params;

    const { userId } = await getUser();
    const supabase = await createClient();
    const dict = await getDictionary(lang)
    var res = await supabase
    .from("PatChat")
    .select("id, created_at, content, instance, role, audio_base64, PatBase(userId)")
    .eq("PatBase.userId", userId)
    .eq("pat_id", patid)
    .order("id", { ascending: true });
    if(res.error){
        console.warn(res.error)
    }
    const messages = res.data

    return (
        <>
            <PatHeading>{dict.pat.navigation.anamnesis}</PatHeading>
            <PatChat pre_messages={messages} patid={patid} dict={dict} />
        </>
    );
}
