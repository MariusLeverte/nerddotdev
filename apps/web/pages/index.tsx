import { Container, Grid, Text } from "ui";
import { HeroImage } from "@components/Banners/HeroImage";
import { RatingCard, Score } from "@components/Cards/RatingCard";
import { Blue } from "@components/Cards/Blue";
import { RefactoredBadge } from "@components/Badges/RefactoredBadge";

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

const howToStepsPitch = [
  {
    header: "Target youur audience effectively",
    body: "Using basic skills you can improve your business stuff with Around Using basic skills ",
  },
  {
    header: "Build deshboard in minutes",
    body: "Using basic skills you can improve your business stuff with Around Using basic skills ",
  },
  {
    header: "Easily download your tables and data",
    body: "Using basic skills you can improve your business stuff with Around Using basic skills ",
  },
  {
    header: "Access to dashboard from all devices",
    body: "Using basic skills you can improve your business stuff with Around Using basic skills ",
  },
];

const Home = () => {
  return (
    <>
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
          className="text-2xl lg:text-[48px] mb-10 lg:mb-12"
          weight="extrabold"
        >
          Customers have consistently <br />
          rated Around 4.7/5 stars
        </Text>
        <Grid>
          {mock_ratings.map(({ score, review, user }) => (
            <Grid.Column
              className="col-span-6 lg:col-span-4"
              key={score + user}
            >
              <RatingCard score={score} review={review} user={user} />
            </Grid.Column>
          ))}
        </Grid>
      </Container>
      <Container as="section" className="mb-32 lg:mb-64">
        <div className="text-center">
          <Text className="text-2xl lg:text-[48px]" weight="extrabold">
            How Does It Work?
          </Text>
          <Text className="text-sm lg:text-2xl mb-10 lg:mb-12">
            By uploading your snippet to get it refactored
          </Text>
        </div>

        <Grid>
          {howToStepsPitch.map(({ header, body }, index) => (
            <Grid.Column className="col-span-3" key={"howToStepsPitch" + index}>
              <Blue>
                <div className="flex mb-2">
                  <Text weight="bold" className="pr-2">
                    {index + 1}.
                  </Text>
                  <Text weight="bold">{header}</Text>
                </div>
                <Text className="text-white">{body}</Text>
              </Blue>
            </Grid.Column>
          ))}
        </Grid>
      </Container>

      <Container as="section" className="mb-32 lg:mb-64">
        <Grid>
          <Grid.Column className="col-span-6 flex items-center">
            <Grid className="flex-1">
              {[...new Array(3)].map((__, index) => (
                <Grid.Column
                  className={
                    index !== 1
                      ? "col-span-2 md:col-span-4 lg:col-span-11 md:col-start-2 lg:col-start-1"
                      : "col-span-2 md:col-span-4 lg:col-span-11 md:col-start-3 lg:col-start-2"
                  }
                >
                  <Blue>
                    <div className="flex justify-between">
                      <Text>Username here</Text>
                      <RefactoredBadge added={0} removed={69} />
                    </div>
                  </Blue>
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>
          <Grid.Column className="col-span-6">
            <Text className="text-2xl lg:text-[48px]" weight="extrabold">
              The robust and highly customizable data analysis tool
            </Text>
            <Text className="text-sm lg:text-2xl">
              Using basic skills you can improve your business stuff with Around
              Using basic skills you can improve your business stuff with Around
              Using basic skills
            </Text>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
