import { getUser } from "@/utils/logic/logic_server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request, props) {
  const params = await props.params;
  const { userId } = await getUser();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const supabase = await createClient()

  var search_term = params.search_term;
  var res = await supabase
  .rpc('search_ref_rx', { search_term: search_term })
  .limit(100)

  return Response.json(res.data);
}

