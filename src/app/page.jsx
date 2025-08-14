
import { getUser } from "@/utils/logic/logic_server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await getUser()
  if (!userId) {
    redirect("/de/login?redirect_url=/de/app")
  } else {
    redirect("/de/app")
  }
}
