import { Collapse, Text } from "ui";
import { Skill } from "../../types/sanity";
import { reduceSkills } from "../../utils/skills";

interface TableProps {
  skills: Skill[];
}

const Table = ({ skills }: TableProps) => {
  const reducedSkills = reduceSkills(skills);

  return (
    <>
      {reducedSkills.map((category) => (
        <Collapse key={category.name} title={category.name}>
          <Text>{category.skills.join(", ")}</Text>
        </Collapse>
      ))}
    </>
  );
};

export default Table;
