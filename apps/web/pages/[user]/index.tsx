import { Button, Container, Grid, Spacer } from "@nextui-org/react";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import UserPresentation from "../../components/Banners/UserPresentation";
import Meta from "../../components/SEO/Meta";
import Table from "../../components/Skills/Table";
import { getClient } from "../../libs/sanity/sanity.server";
import { User, UserWithProjects } from "../../types/sanity";
import { getArraySkills } from "../../utils/skills";
import { userWithProjectsQuery } from "../../libs/sanity/queries";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase/initFirebase";
import { RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import EditUserModal from "../../components/Modals/EditUserModal";
import useEditUserProfile from "../../hooks/useEditUserProfile";
import UserRepos from "../../components/Grids/UserRepos";

interface UserProps {
  user: UserWithProjects;
}

const User = ({ user }: UserProps) => {
  const [visible, setVisible] = useState(false);
  const [firebaseUser] = useAuthState(auth);
  const { merged } = useEditUserProfile(user);

  console.log({ user, merged });

  if (!user) {
    return null;
  }

  const data = merged || user;

  const isCurrentUser = firebaseUser?.uid === user?._id;

  return (
    <>
      <Meta
        title={user.name + " - Nerd.dev"}
        description={`${user.name}${data.intro && ` - ` + data.intro}`}
        keywords={getArraySkills(user.skills).join(",")}
      />
      <Spacer y={10} />
      <Container md as="section">
        <UserPresentation
          name={user.name || ""}
          intro={data.intro}
          photoUrl={user.photo?.photoURL || ""}
          social={data.social}
        />
      </Container>

      {data.about && (
        <>
          <Spacer y={5} />
          <Container md as="section">
            <Grid.Container justify="center">
              <Grid md={6} direction="column" css={{ textAlign: "center" }}>
                <PortableText value={data.about} components={{}} />
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
      {data.repos && (
        <>
          <Spacer y={5} />
          <Container md as="section">
            <UserRepos repos={data.repos} />
          </Container>
        </>
      )}
      <Spacer y={10} />
      {isCurrentUser && (
        <>
          <Container
            display="flex"
            justify="center"
            css={{
              bottom: 0,
              position: "fixed",
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <Button
              rounded
              shadow
              color="gradient"
              onClick={() => setVisible(true)}
            >
              Rediger <RiEdit2Line />
            </Button>
            <Spacer y={3} />
          </Container>
          <EditUserModal
            visible={visible}
            onClose={() => setVisible(false)}
            id={user._id}
          />
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const user: UserWithProjects = await getClient(preview).fetch(
    userWithProjectsQuery,
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
    paths:
      users?.map((user) => ({ params: { user: user.slug?.current } })) || [],
    fallback: true,
  };
};

export default User;
