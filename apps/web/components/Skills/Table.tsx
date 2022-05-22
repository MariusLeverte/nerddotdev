import { Collapse, Text } from "@nextui-org/react";
import { Skill } from "../../types/sanity";
import { reduceSkills } from "../../utils/skills";

interface TableProps {
  skills: Skill[];
}

const Table = ({ skills }: TableProps) => {
  const reducedSkills = reduceSkills(skills);

  return (
    <Collapse.Group css={{ px: 0 }}>
      {reducedSkills.map((category) => (
        <Collapse key={category.name} title={category.name}>
          <Text>{category.skills.join(", ")}</Text>
        </Collapse>
      ))}
    </Collapse.Group>
  );
};

export default Table;
