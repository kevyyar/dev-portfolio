"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  link: { href: string; label: string };
}

const NavbarLink = ({ link }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <li key={link.label}>
      <Link
        href={link.href}
        className={`hover:text-gray-600 transition-colors px-2 py-1 lg:text-xl ${
          pathname === link.href
            ? "font-medium text-carbon bg-gray-300 py-3 px-4 rounded-md"
            : ""
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
};

export default NavbarLink;
