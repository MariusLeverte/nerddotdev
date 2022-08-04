import Link from "next/link";
import { Text, Container } from "ui";
import ProfilePicture from "./ProfilePicture";

const Header = () => {
  return (
    <Container
      as="header"
      width="xl"
      className="pt-10 flex justify-between items-center z-10 relative"
    >
      <Link href="/" passHref>
        <a>
          <Text weight="bold" className="text-lg lg:text-4xl">
            Nerd
            <Text as="span" className="text-sm lg:text-2xl" weight="light">
              dot
            </Text>
            dev
          </Text>
        </a>
      </Link>
      <ProfilePicture />
    </Container>
  );
};

export default Header;
