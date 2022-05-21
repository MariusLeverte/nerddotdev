import { Container, Grid, Text } from "@nextui-org/react";
import Landing from "../components/MatterJS/Landing";
import Meta from "../components/SEO/Meta";

const Home = () => {
  return (
    <>
      <Meta
        title="Kanskje Norges kuleste utvikler miljø - Nerd.dev"
        description="Webutvikler miljø for de beste utviklerne i Norge av utviklere"
        canonical={process.env.NEXT_PUBLIC_VERCEL_URL}
        locale={{
          current: "nb_NO",
        }}
        keywords="webutvikler,frontend,miljø for utviklere"
      />
      <Container css={{ height: "100vh" }} display="flex" alignItems="center">
        <Landing />
        <Container css={{ zIndex: 10, padding: 0 }} fluid>
          <Grid.Container justify="center">
            <Grid md={8}>
              <Text
                h1
                size="$md"
                css={{
                  "@md": {
                    fontSize: "$xl",
                  },
                }}
              >
                Snart kommer <em>kanskje</em> det kuleste prosjektet for
                utviklere i Norge
              </Text>
            </Grid>
          </Grid.Container>
        </Container>
      </Container>
    </>
  );
};

export default Home;
