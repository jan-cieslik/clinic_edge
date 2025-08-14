import PatNavbar from "@/app/components/navbar/patnavbar";
import { getDictionary } from "@/utils/dictionaries";
import { getPatient } from "@/utils/logic/logic";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default async function PatLayout(props) {
  const params = await props.params;
  const { lang, patid } = params;
  const { children } = props;

  const dict = await getDictionary(lang);
  const pat_prom = getPatient(patid);
  return (
    <html lang="de" className="h-full bg-white">
      <body className={inter.className + " h-full"}>
        <PatNavbar dict={dict} lang={lang} patid={patid} pat_prom={pat_prom}>
          {children}
        </PatNavbar>
      </body>
    </html>
  );
}
