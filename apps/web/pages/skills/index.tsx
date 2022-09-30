import React from "react";
import { GetServerSideProps } from "next";
import { getUserSSR } from "../../libs/firebase/getUserSSR";
import { getClient } from "../../libs/sanity/sanity.server";
import { allSkillsWithUser } from "../../libs/sanity/queries";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";
import { Container, Tag, Text } from "ui";
import Link from "next/link";
import { isNotEmptyArray } from "@utils/array";
import { FiChevronRight } from "react-icons/fi";
import { SkillWithUser } from "@types/sanity/response";

interface Props {
  skills: SkillWithUser[];
}

const SkillsPage = ({ skills }: Props) => {
  const { user } = useFirebaseUser();

  return (
    <Container width="xs" className="my-20">
      <Text as="h2" className="text-2xl lg:text-4xl" weight="bold">
        Alle ferdigheter
      </Text>
      <ul className="divide-y divide-dashed mt-8">
        {skills.map((skill) => (
          <li key={skill._id} className="bg-white px-4 py-2 hover:bg-gray-50">
            <Link href={`/skills/${skill.slug?.current}`}>
              <a className="flex items-center justify-between">
                <div>
                  <div>
                    <Text as="span" className="text-sm mr-4">
                      {skill?.category && isNotEmptyArray(skill.category)
                        ? skill.category.map((c) => c.name).join(", ")
                        : null}
                    </Text>
                    {skill.connectedUser && <Tag text="Pro" color="success" />}
                  </div>

                  <Text weight="semibold" className="text-xl lg:text-2xl">
                    {skill.name}
                  </Text>
                </div>
                <FiChevronRight />
              </a>
            </Link>
          </li>
        ))}
      </ul>
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
