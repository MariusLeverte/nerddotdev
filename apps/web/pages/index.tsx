import { Container, Text } from "ui";
import { LandingHeroImage } from "@components/HeroImages/LandingHeroImage";

const Home = () => {
  return (
    <>
      {/* <Meta
        title="Kanskje Norges kuleste utvikler miljø - Nerd.dev"
        description="Webutvikler miljø for de beste utviklerne i Norge av utviklere"
        canonical={getCanoniical()}
        locale={{
          current: "nb_NO",
        }}
        keywords="webutvikler,frontend,miljø for utviklere"
      /> */}
      <section className="bg-slate-900 flex flex-col	justify-between">
        <Container className="text-center text-white lg:mb-10">
          <Text className="text-sm lg:text-2xl">
            Using basic skills you can improve your business stuff with Around
          </Text>
          <Text className="text-2xl lg:text-[72px]" weight="extrabold">
            Refactor your code <br /> with ease
          </Text>
        </Container>
      </section>
      <LandingHeroImage
        topSectionColor="bg-slate-900"
        bottomSectionColor="bg-transparent"
      />
      <Container as="section" className="min-h-screen text-center">
        <Text className="text-2xl lg:text-[72px]" weight="extrabold">
          Customers have consistently rated Around 4.7/5 stars
        </Text>
      </Container>
    </>
  );
};

export default Home;
