import React from "react";
import { GetServerSideProps } from "next";
import { getUserSSR } from "../../libs/firebase/getUserSSR";
import { getClient } from "../../libs/sanity/sanity.server";
import { allSkillsWithUser } from "../../libs/sanity/queries";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";
import { Container, Text } from "ui";
import { Skill } from "../../types/schema";
import SkillCard from "../../components/Skills/Card";

interface Props {
  skills: Skill[];
}

const SkillsPage = ({ skills }: Props) => {
  const { user } = useFirebaseUser();

  return (
    <Container>
      <Text as="h2" className="text-2xl">
        Alle ferdigheter
      </Text>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const user = await getUserSSR({ res, req });

  const skills = await getClient(false).fetch(allSkillsWithUser, {
    userId: user?.uid ?? "",
  });

  return {
    props: {
      skills,
    },
  };
};

export default SkillsPage;
