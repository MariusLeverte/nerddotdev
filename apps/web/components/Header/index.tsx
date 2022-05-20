import { Container, Text } from "@nextui-org/react";
import Link from "next/link";
import ProfilePicture from "./ProfilePicture";

const Header = () => {
  return (
    <Container
      as="header"
      css={{ top: 60, position: "fixed", left: 0, right: 0, zIndex: 99 }}
      display="flex"
      alignItems="center"
    >
      <Link href="/" passHref>
        <Text
          as="a"
          weight="bold"
          size={20}
          css={{
            flex: 1,
            "@md": {
              fontSize: 40,
            },
          }}
        >
          Nerd
          <Text
            span
            size={15}
            weight="light"
            css={{
              "@md": {
                fontSize: 20,
              },
            }}
          >
            dot
          </Text>
          dev
        </Text>
      </Link>
      <ProfilePicture />
    </Container>
  );
};

export default Header;
