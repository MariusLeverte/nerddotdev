import { GetStaticProps } from "next";
import { Container, Text } from "ui";
import Landing from "../components/MatterJS/Landing";
import Meta from "../components/SEO/Meta";
import { pageWithContent } from "../libs/sanity/queries";
import { getClient } from "../libs/sanity/sanity.server";
import { getCanoniical } from "../utils/canonical";

const Home = ({ data }: { data: any }) => {
  const [banner, ...rest] = data.content;
  return (
    <>
      <Meta
        title="Kanskje Norges kuleste utvikler miljø - Nerd.dev"
        description="Webutvikler miljø for de beste utviklerne i Norge av utviklere"
        canonical={getCanoniical()}
        locale={{
          current: "nb_NO",
        }}
        keywords="webutvikler,frontend,miljø for utviklere"
      />
      <div className="absolute top-0 w-full">
        <div className="h-screen flex items-center relative">
          <Container width="xl" className="relative z-10 text-center space-y-6">
            <Text as="h1" weight="bold" className="text-2xl lg:text-6xl">
              {banner.title}
            </Text>
            {banner.text && (
              <Container width="sm">
                <Text as="h2" weight="normal" className="text-lg lg:text-2xl">
                  {banner.text}
                </Text>
              </Container>
            )}
          </Container>

          <Landing />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getClient(preview).fetch(pageWithContent, {
    page: "0381cc1d-e982-485a-b965-59204bae7cdd",
  });

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};

export default Home;
