import { Container, Text } from "@nextui-org/react";
import Landing from "../components/MatterJS/Landing";

const Home = () => {
  return (
    <Container
      fluid
      css={{ height: "100vh" }}
      display="flex"
      alignItems="center"
    >
      <Landing />
      <Container sm css={{ zIndex: 10 }}>
        <Text
          h1
          size="$md"
          css={{
            "@md": {
              fontSize: "$xl",
            },
          }}
        >
          Snart kommer <em>kanskje</em> det kuleste prosjektet for utviklere i
          Norge
        </Text>
      </Container>
    </Container>
  );
};

export default Home;
