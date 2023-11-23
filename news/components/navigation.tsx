import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Navigation() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleBurger = () => setIsBurgerOpen(!isBurgerOpen);

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2  bg-slate-500 z-10 drop-shadow-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between max-w-4xl">
        <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            target="_blank"
            href="https://open-platform.theguardian.com/documentation/"
            rel="noreferrer"
          >
            <Image
              src="https://open-platform.theguardian.com/public/img/theguardian-op-logo.svg"
              width={300}
              height={50}
              alt="Logo"
              className="inline-block hover:opacity-75"
            />
          </a>
          <button
            className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            type="button"
            onClick={toggleBurger}
          >
            <Image
              src="/menu.svg"
              width={50}
              height={50}
              alt="menu"
              className="inline-block"
            />
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (isBurgerOpen ? " flex" : " hidden")
          }
        >
          <ul className="flex flex-col md:flex-row list-none md:ml-auto font-serif text-white	text-xl	">
            <Link href={"/"} onClick={toggleBurger}>
              <li className="m-2">Main</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
