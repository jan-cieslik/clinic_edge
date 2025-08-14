import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="h-full bg-keyA-500">
      <body className={inter.className + " h-full"}>{children}</body>
    </html>
  );
}
