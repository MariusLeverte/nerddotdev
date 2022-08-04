import { Button, Spacer } from "@nextui-org/react";
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
import { RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import useEditUserProfile from "../../hooks/useEditUserProfile";
import UserRepos from "../../components/Grids/UserRepos";
import { revalidateMinutes } from "../../utils/revalidate";
import dynamic from "next/dynamic";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";
import { Container, Grid, Text } from "ui";
const EditUserModal = dynamic(
  () => import("../../components/Modals/EditUserModal")
);

interface UserProps {
  user: UserWithProjects;
}

const User = ({ user }: UserProps) => {
  const [visible, setVisible] = useState(false);
  const { user: firebaseUser } = useFirebaseUser();
  const { merged } = useEditUserProfile(user);

  if (!user) {
    return null;
  }

  const data = merged || user;

  const isCurrentUser = firebaseUser?.uid === user?._id;

  return (
    <div className="my-20 space-y-10 lg:space-y-20">
      <Meta
        title={user.name + " - Nerd.dev"}
        description={`${user.name}${data.intro && ` - ` + data.intro}`}
        keywords={getArraySkills(user?.skills ?? []).join(",")}
      />
      <Container as="section">
        <UserPresentation
          name={user.name || ""}
          intro={data.intro}
          photoUrl={user.photo?.photoURL || ""}
          social={data.social}
        />
      </Container>
      {data.about && (
        <Container as="section" className="flex justify-center">
          <div className="lg:w-1/2 text-center">
            <PortableText
              components={{
                block: {
                  h2: ({ children }) => {
                    return (
                      <Text as="h2" className="text-2xl lg:text-4xl mb-4">
                        {children}
                      </Text>
                    );
                  },
                  normal: ({ children }) => (
                    <Text className="mb-3">{children}</Text>
                  ),
                },
              }}
              value={data.about}
            />
          </div>
        </Container>
      )}

      {user.skills && (
        <Container
          width="xl"
          className="bg-violet-100 shadow shadow-indigo-500/20 rounded-xl"
        >
          <Container width="lg" className="py-8">
            <Table skills={user.skills} />
          </Container>
        </Container>
      )}

      {/* 
      
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
              bordered
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
      )} */}
    </div>
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
    revalidate: revalidateMinutes(10),
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
