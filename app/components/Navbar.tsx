"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LinkElement } from "../types/link";

import { GrTasks } from "react-icons/gr";

import classNames from "classnames";

const links: LinkElement[] = [
  { label: "Dashboard", href: "/" },
  { label: "Tasks", href: "/tasks" },
];

const Navbar = (): JSX.Element => {
  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GrTasks />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, idx) => {
          return (
            <li key={idx}>
              <Link
                className={classNames(
                  ["hover:text-zinc-800", "transition-colors"],
                  {
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                  }
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
