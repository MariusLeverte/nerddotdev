import { Container, Grid, Text } from "ui";
import { HeroImage } from "@components/Banners/HeroImage/HeroImage";
import { RatingCard, Score } from "@components/Cards/RatingCard";

const mock_ratings = [
  {
    user: "google",
    review:
      "Maecenas convallis non sapien in commodo. Nulla semper pulvinar luctus. Proin luctus.",
    score: 5 as Score,
  },
  {
    user: "amazon",
    review:
      "Maecenas convallis non sapien in commodo. Nulla semper pulvinar luctus. Proin luctus.",
    score: 4 as Score,
  },
  {
    user: "spotify",
    review:
      "Maecenas convallis non sapien in commodo. Nulla semper pulvinar luctus. Proin luctus.",
    score: 1 as Score,
  },
];

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
      <section className="mb-32 lg:mb-64">
        <div className="bg-slate-900 flex flex-col	justify-between">
          <Container className="text-center text-white mb-10 lg:mb-12">
            <Text className="text-sm lg:text-2xl">
              Using basic skills you can improve your business stuff with Around
            </Text>
            <Text className="text-2xl lg:text-[72px]" weight="extrabold">
              Refactor your code <br /> with ease
            </Text>
          </Container>
        </div>
        <HeroImage
          topSectionColor="bg-slate-900"
          bottomSectionColor="bg-transparent"
        />
      </section>
      <Container as="section" className="text-center mb-32 lg:mb-64">
        <Text
          className="text-2xl lg:text-[72px] mb-10 lg:mb-12"
          weight="extrabold"
        >
          Customers have consistently <br />
          rated Around 4.7/5 stars
        </Text>
        <Grid>
          {mock_ratings.map(({ score, review, user }) => (
            <Grid.Column className="col-span-6 lg:col-span-4">
              <RatingCard score={score} review={review} user={user} />
            </Grid.Column>
          ))}
        </Grid>
      </Container>
      <Container as="section" className="text-center">
        <Text className="text-2xl lg:text-[72px]" weight="extrabold">
          How Does It Work?
        </Text>
        <Text className="text-sm lg:text-2xl">
          By uploading your snippet to get it refactored
        </Text>
      </Container>
    </>
  );
};

export default Home;
