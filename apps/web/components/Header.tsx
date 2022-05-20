import { Card, Container, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Container
      as="header"
      css={{ top: 60, position: "fixed", left: 0, right: 0, zIndex: 99 }}
    >
      <Link href="/" passHref>
        <Text
          as="a"
          weight="bold"
          size={20}
          css={{
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
    </Container>
  );
};

export default Header;
