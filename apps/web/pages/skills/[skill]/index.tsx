import React from "react";
import { GetServerSideProps } from "next";
import { getUserSSR } from "@libs/firebase/getUserSSR";
import { getClient } from "@libs/sanity/sanity.server";
import { skillFeed } from "@libs/sanity/queries";
import { useFirebaseUser } from "@libs/firebase/FirebaseAuthProvider";
import SkillLayout from "@components/Layouts/Skill";
import Feed from "@components/Feed";
import { SkillFeed } from "@types/sanity/response";

interface Props {
  data: SkillFeed;
}

const SkillPage = ({ data }: Props) => {
  const { user } = useFirebaseUser();

  return (
    <SkillLayout title={data.name} users={data.users}>
      {data.shares?.map((share) => (
        <Feed item={share} />
      ))}
    </SkillLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  params,
}) => {
  const user = await getUserSSR({ res, req });

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data: SkillFeed = await getClient(false).fetch(skillFeed, {
    slug: params?.skill,
  });

  return {
    props: {
      data,
    },
  };
};

export default SkillPage;
