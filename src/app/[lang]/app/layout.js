import AppNavbar from "@/app/components/navbar/appnavbar";
import { getDictionary } from "@/utils/dictionaries";
import { getUser } from "@/utils/logic/logic_server";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default async function AppLayout(props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const {isAdmin} = await getUser()

  const dict = await getDictionary(lang);
  return (
    <html lang="de" className="h-full bg-white">
      <body className={inter.className + " h-full"}>
        <AppNavbar dict={dict} lang={lang} isAdmin={isAdmin}>
          {children}
        </AppNavbar>
      </body>
    </html>
  );
}
