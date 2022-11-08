import Link from "next/link";
import { useRouter } from "next/router";
import { Text, Container, Button } from "ui";
import ProfilePicture from "./ProfilePicture";
import { useFirebaseUser } from "@libs/firebase/FirebaseAuthProvider";
import clsx from "clsx";

const navbarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Examples",
    link: "/examples",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Reviews",
    link: "/reviews",
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="text-white space-x-6">
      {navbarItems.map((navbarItem) => {
        const isActive = router.asPath === navbarItem.link;

        return (
          <Link href={navbarItem.link} passHref>
            <a className="text-white">
              <Text
                as="span"
                className="text-sm lg:text-2xl"
                weight={isActive ? "bold" : "light"}
              >
                {navbarItem.name}
              </Text>
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => {
  const { user, loading } = useFirebaseUser();

  return (
    <header className="bg-slate-900">
      <Container
        width="xl"
        className="pt-10 mb-20 h-20 flex justify-between items-center z-10 relative"
      >
        <Link href="/" passHref>
          <a className="text-white max-w-[50px] overflow-visible">
            <Text weight="bold" className="text-lg lg:text-4xl">
              Nerd
              <Text as="span" className="text-sm lg:text-2xl" weight="light">
                dot
              </Text>
              dev
            </Text>
          </a>
        </Link>

        <Navbar />
        <div
          className={clsx(
            "overflow-hidden transition-all",
            !loading ? "w-[50px]" : "w-0"
          )}
        >
          {user ? <ProfilePicture /> : <Button>Login</Button>}
        </div>
      </Container>
    </header>
  );
};

export default Header;
