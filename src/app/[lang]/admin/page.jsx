import { getDictionary } from "@/utils/dictionaries";

export default async function AppDashboard(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang)
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl text-center font-bold my-4">{ dict.app.navigation.admin}</h2>
      <p>... Siehe Navigation oben</p>
    </div>
  )
}
