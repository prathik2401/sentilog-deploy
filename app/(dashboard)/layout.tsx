"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./Style.scss";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Logs" },
  { href: "/history", label: "History" },
];

const DashboardLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="h-screen w-screen relative bg-zinc-900">
      <div className="md:hidden absolute top-0 left-0 p-4">
        <button onClick={toggleMenu} style={{ color: "white" }}>
          ☰
        </button>
      </div>
      <aside
        className={`absolute w-[200px] top-0 ${
          isMenuOpen ? "left-0" : "-left-full"
        } md:left-0 h-full border-r border-black/10 text-center items-center bg-black text-white pt-10 transition-all duration-300 ease-in-out`}
      >
        {isMenuOpen && (
          <div className="absolute top-0 right-0 p-4">
            <button onClick={toggleMenu} style={{ color: "white" }}>
              ✕
            </button>
          </div>
        )}
        <div className="text-2xl font-bold mb-10">Sentilog</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl">
              <Link href={link.href} onClick={toggleMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "ml-0 md:ml-[200px]" : "ml-0 md:ml-[200px]"
        } h-full`}
      >
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="overflow-auto md:h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
