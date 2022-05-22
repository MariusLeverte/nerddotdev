import { Container, Grid, Spacer } from "@nextui-org/react";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import UserPresentation from "../components/Banners/UserPresentation";
import Meta from "../components/SEO/Meta";
import Table from "../components/Skills/Table";
import { getClient } from "../libs/sanity/sanity.server";
import { User, UserWithProjects } from "../types/sanity";
import { getArraySkills } from "../utils/skills";
import UserProjects from "../components/Grids/UserProjects";

interface UserProps {
  user: UserWithProjects;
}

const User = ({ user }: UserProps) => {
  if (!user) return null;

  return (
    <>
      <Meta
        title={user.name + " - Nerd.dev"}
        description={`${user.name}${user.intro && ` - ` + user.intro}`}
        keywords={getArraySkills(user.skills).join(",")}
      />
      <Spacer y={10} />
      <Container md as="section">
        <UserPresentation
          name={user.name || ""}
          intro={user.intro}
          photoUrl={user.photo?.photoURL || ""}
          social={user.social}
        />
      </Container>

      {user.about && (
        <>
          <Spacer y={5} />
          <Container md as="section">
            <Grid.Container justify="center">
              <Grid md={6} direction="column" css={{ textAlign: "center" }}>
                <PortableText value={user.about} components={{}} />
              </Grid>
            </Grid.Container>
          </Container>
        </>
      )}
      <Spacer y={5} />
      <Container
        fluid
        as="section"
        css={{ backgroundColor: "#F7F9FE", py: 60, px: 0 }}
      >
        <Container md>
          <Table skills={user.skills} />
        </Container>
      </Container>
      {user.projects && (
        <>
          <Spacer y={5} />
          <Container md as="section">
            <UserProjects projects={user.projects} />
          </Container>
        </>
      )}
      <Spacer y={10} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const user: UserWithProjects = await getClient(preview).fetch(
    groq`*[_type == "user" && slug.current == $user][0] {
      ...,
      skills[]->{
        ..., 
        category[]->
      },
      "projects": *[references(^._id)] {
        ...,
        "role": developers[user._ref in *[_type == "user" && slug.current == $user]._id] {
          role->
        }[0].role
      }
    }`,
    { user: params?.user }
  );

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users: User[] = await getClient(false).fetch(groq`*[_type == "user"]`);

  return {
    paths: users.map((user) => ({ params: { user: user.slug?.current } })),
    fallback: true,
  };
};

export default User;
