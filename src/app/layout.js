import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";


export const metadata = {
  title: "Clinic Edge",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={deDE} afterSignOutUrl="/de/login?redirect_url=/de/app" dynamic>
    {children}
    </ClerkProvider>
  );
}
