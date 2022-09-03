import { GetStaticProps } from "next";
import { Container, Grid, Text } from "ui";
import Meta from "../components/SEO/Meta";
import { pageWithContent } from "../libs/sanity/queries";
import { getClient } from "../libs/sanity/sanity.server";
import { getCanoniical } from "../utils/canonical";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";

const Home = ({ data }: { data: any }) => {
  const [banner] = data.content;
  const spline = useRef<any>();

  return (
    <>
      <Meta
        title="Kanskje norges kuleste utvikler miljø - Nerd.dev"
        description="Webutvikler miljø for de beste utviklerne i Norge av utviklere"
        canonical={getCanoniical()}
        locale={{
          current: "nb_NO",
        }}
        keywords="webutvikler,frontend,miljø for utviklere"
      />
      <div className="h-screen absolute top-0 w-full pt-28 md:pt-0 bg-[#ffe4c4]">
        <Container width="xl" className="h-full flex items-center">
          <Grid className="flex-1 w-full h-full">
            <Grid.Column className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <Text as="h1" weight="bold" className="text-2xl lg:text-6xl">
                {banner.title}
              </Text>
              {banner.text && (
                <>
                  <Text
                    as="h2"
                    weight="normal"
                    className="text-lg lg:text-2xl mt-4"
                  >
                    {banner.text}
                  </Text>
                  <Text as="span" className="mt-6 text-sm italic">
                    Invitasjoner slippes fortløpende
                  </Text>
                </>
              )}
            </Grid.Column>
            <Grid.Column className="col-span-12 lg:col-span-6 overflow-visible">
              <Spline
                scene="https://prod.spline.design/FK8UjuMdGShMnScz/scene.splinecode"
                onLoad={(splineApp) => (spline.current = splineApp)}
              />
            </Grid.Column>
          </Grid>
        </Container>
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
