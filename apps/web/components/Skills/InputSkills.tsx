import { Button, Col, Container, Grid, Spacer } from "@nextui-org/react";
import { groq } from "next-sanity";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import useSanityData from "../../hooks/useSanityData";
import { getClient } from "../../libs/sanity/sanity.server";
import { Skill } from "../../types/schema";
import Select from "../NextUI/Select";
const AddSkillModal = dynamic(() => import("../Modals/AddSkillModal"));

type InputSkillsProps = {
  initialValue: Skill[] | [] | undefined;
  onChange?: (skill: Skill[] | []) => void;
};

const InputSkills = ({ initialValue, onChange }: InputSkillsProps) => {
  const [visible, setVisible] = useState(false);

  const { data, loading, fetchData } = useSanityData<Skill[]>(
    groq`*[_type == "skill"]`,
    false
  );

  const handleRemoveSkill = useCallback(
    (id) => {
      const newValue = initialValue?.filter((skill) => skill._id !== id);
      if (onChange) {
        onChange(newValue || []);
      }
    },
    [initialValue, onChange]
  );

  const removeAddedSkills = useCallback(
    (skill) => {
      return !initialValue?.find((s) => s._id === skill._id);
    },
    [initialValue]
  );

  const availableSkills = data?.filter(removeAddedSkills);

  const handleSelectSkill = useCallback(
    (value) => {
      const selectedSkill = availableSkills?.find(
        (skill) => skill.name === value
      );
      if (onChange && selectedSkill) {
        const newValue = initialValue?.concat(selectedSkill);

        onChange(newValue);
      }
    },
    [availableSkills, initialValue, onChange]
  );

  return (
    <>
      <Container
        fluid
        css={{ padding: 0, flex: "1 1 auto", flexDirection: "column" }}
        display="flex"
      >
        <Select
          name="skills"
          label="Ferdigheter"
          options={availableSkills?.map((skill) => skill.name)}
          onChange={({ target: { value } }) => handleSelectSkill(value)}
        />
        <Col
          css={{
            pt: 8,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button size="sm" onPress={() => setVisible(true)} color="warning">
            Lag ny ferdighet
          </Button>
        </Col>

        <Spacer y={0.5} />
        <Container fluid display="flex" css={{ padding: 0 }}>
          <Grid.Container gap={0.5}>
            {initialValue
              ?.map((skill) => (
                <Grid key={skill._id}>
                  <Button
                    auto
                    icon={<RiCloseLine />}
                    size="xs"
                    color="success"
                    rounded
                    onPress={() => handleRemoveSkill(skill._id)}
                  >
                    {skill.name}
                  </Button>
                </Grid>
              ))
              .reverse()}
          </Grid.Container>
        </Container>
      </Container>
      {visible && (
        <AddSkillModal
          visible={visible}
          onClose={() => setVisible(false)}
          onCallback={fetchData}
        />
      )}
    </>
  );
};

export default InputSkills;
