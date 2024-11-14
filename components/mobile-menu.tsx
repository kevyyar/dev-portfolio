"use client";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

const MobileMenu = ({ links }: MobileMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);

  const onOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div>
      <RxHamburgerMenu
        onClick={onOpenMenu}
        fontSize="30px"
        className="cursor-pointer"
      />

      <nav
        className="w-full bg-carbon transition-all duration-300 ease-in-out rounded-xl my-5 overflow-hidden"
        style={{
          maxHeight: openMenu ? `${links.length * 50}px` : "0",
          opacity: openMenu ? 1 : 0,
        }}
      >
        <ul className="flex flex-col py-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-whisper inline-block hover:bg-graphite hover:text-whisper"
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
