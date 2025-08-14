import AdminNavBar from "@/app/components/navbar/adminnavbar";
import { getDictionary } from "@/utils/dictionaries";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default async function AppLayout(props) {
  const params = await props.params;

  const { lang } = params;

  const { children } = props;

  const dict = await getDictionary(lang);
  return (
    <html lang="de" className="h-full bg-white">
      <body className={inter.className + " h-full"}>
        <AdminNavBar dict={dict} lang={lang}>
          {children}
        </AdminNavBar>
      </body>
    </html>
  );
}
