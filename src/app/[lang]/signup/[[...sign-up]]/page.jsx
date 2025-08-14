import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function PageLogin() {
  return (
    <>
      <div className="px-8 mt-12 flex flex-col items-center">
        <Image src="/logo_01.png"
          width={5872 / 5}
          height={1820 / 5}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          alt="Clinic Edge Logo"
        />
        <SignUp />
      </div>
    </>
  );
}
