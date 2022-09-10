import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import UserPresentation from "../../components/Banners/UserPresentation";
import Meta from "../../components/SEO/Meta";
import Table from "../../components/Skills/Table";
import { getClient } from "../../libs/sanity/sanity.server";
import { User, UserWithProjects } from "../../types/sanity";
import { getArraySkills } from "../../utils/skills";
import { userWithProjectsBySlugQuery } from "../../libs/sanity/queries";
import { revalidateMinutes } from "../../utils/revalidate";
import { Container, Text } from "ui";

interface UserProps {
  user: UserWithProjects;
}

const User = ({ user }: UserProps) => {
  if (!user) {
    return null;
  }

  const data = user;

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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const user: UserWithProjects = await getClient(preview).fetch(
    userWithProjectsBySlugQuery,
    { slug: params?.user }
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
