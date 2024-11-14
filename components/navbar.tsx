import MobileMenu from "./mobile-menu";
import NavbarLink from "./navbar-link";
import Separator from "./separator";

interface NavbarProps {
  links: { href: string; label: string }[];
}

const Navbar = ({ links }: NavbarProps) => {
  return (
    <header className="px-4 py-4">
      <div className="md:hidden">
        <MobileMenu links={links} />
      </div>
      <nav className="sm:hidden mb-3 md:block">
        <ul className="flex items-center justify-between pb-4 lg:justify-around">
          {links.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </ul>
      </nav>
      <Separator />
    </header>
  );
};

export default Navbar;
