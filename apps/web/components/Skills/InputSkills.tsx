import { groq } from "next-sanity";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { RiCloseLine, RiAddLine } from "react-icons/ri";
import { Button, Select } from "ui";
import useSanityData from "../../hooks/useSanityData";
import { Skill } from "../../types/schema";
import { isEmptyArray } from "../../utils/array";
const AddSkillModal = dynamic(() => import("../Modals/AddSkillModal"));

type InputSkillsProps = {
  initialValue: Skill[] | [] | undefined;
  onChange?: (skill: Skill[] | []) => void;
  className?: string;
};

const InputSkills = ({
  initialValue,
  onChange,
  className,
}: InputSkillsProps) => {
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
    <div className={className}>
      <div className="flex items-end">
        <Select
          className="flex-1"
          name="skills"
          label="Ferdigheter"
          onChange={({ target: { value } }) => handleSelectSkill(value)}
        >
          <option disabled selected>
            {isEmptyArray(availableSkills ?? [])
              ? "Legg til nye ferdigheter"
              : "Velg dine ferdigheter"}
          </option>
          {availableSkills?.map((skill) => (
            <option key={skill._id} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </Select>
        <Button size="lg" className="ml-2" onClick={() => setVisible(!visible)}>
          <RiAddLine />
        </Button>
      </div>
      <div className="flex flex-wrap mt-2">
        {initialValue
          ?.map((skill) => (
            <div key={skill._id} className="pr-2 pb-2">
              <Button
                size="xs"
                color="secondary"
                onClick={() => handleRemoveSkill(skill._id)}
              >
                <span className="flex items-center">
                  {skill.name}
                  <RiCloseLine />
                </span>
              </Button>
            </div>
          ))
          .reverse()}
      </div>
      {visible && (
        <AddSkillModal
          visible={visible}
          onClose={() => setVisible(false)}
          onCallback={fetchData}
        />
      )}
    </div>
  );
};

export default InputSkills;
