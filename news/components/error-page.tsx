import Image from "next/image";
import { Navigation } from "./navigation";

export function ErrorPage() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col max-w-xs mx-auto my-4 bg-yellow-200 p-6 rounded-xl">
        <p className="text-lg text-center">There is an error in application.</p>
        <p className="text-lg text-center">Please go to Main to fix it.</p>
        <Image src="/error.svg" alt="error" />
      </div>
    </>
  );
}
