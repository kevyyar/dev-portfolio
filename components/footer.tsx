import Link from "next/link";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import Separator from "./separator";

const Footer = () => {
  return (
    <footer>
      <Separator />
      <div className="flex flex-col items-center justify-between gap-4 md:text-lg lg:text-2xl">
        <div>Kev The Dev | FE Developer</div>
        <Link
          href="/contact"
          className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom after:scale-y-[0.3] after:bg-current after:transition-all after:duration-300 hover:after:scale-y-100 hover:after:bg-carbon font-semibold md:text-lg lg:text-2xl"
        >
          Get in touch
        </Link>
        <div className="flex items-center gap-4">
          <Link href="https://linkedin.com">
            <RxLinkedinLogo className="text-4xl md:text-5xl" />
          </Link>
          <Link href="https://github.com/kevyyar">
            <RxGithubLogo className="text-4xl md:text-5xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
