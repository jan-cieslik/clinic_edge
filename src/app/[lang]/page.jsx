import { redirect } from "next/navigation";

export default async function Home(props) {
    const params = await props.params;
    const {lang} = params;
    redirect(`/${lang}/app`)
}
