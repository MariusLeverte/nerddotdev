import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenuFold } from "react-icons/ai";
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
    <nav className="hidden md:block text-white space-x-6 ">
      {navbarItems.map((navbarItem) => {
        const isActive = router.asPath === navbarItem.link;

        return (
          <Link href={navbarItem.link} passHref>
            <a>
              <Text
                as="span"
                className="text-sm lg:text-xl text-white"
                weight={isActive ? "bold" : "thin"}
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
        className="pt-10 mb-10 lg:mb-20 h-20 flex justify-between items-center z-10 relative"
      >
        <Link href="/" passHref>
          <a className="text-white max-w-[70px] overflow-visible">
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
            "overflow-hidden transition-all hidden md:block",
            !loading ? "w-[70px]" : "w-0"
          )}
        >
          {user ? (
            <ProfilePicture />
          ) : (
            <Link href="/login">
              <a>
                <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  Login
                </Button>
              </a>
            </Link>
          )}
        </div>
        <Button className="block md:hidden bg-transparent px-0">
          <AiOutlineMenuFold size={30} />
        </Button>
      </Container>
    </header>
  );
};

export default Header;
