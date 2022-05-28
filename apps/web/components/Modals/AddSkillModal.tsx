import { Button, Input, Modal, Text } from "@nextui-org/react";
import { groq } from "next-sanity";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSanityData from "../../hooks/useSanityData";
import { auth } from "../../libs/firebase/initFirebase";
import { SkillCategory } from "../../types/schema";
import Select from "../NextUI/Select";

interface AddSkillModalProps {
  visible: boolean;
  onClose: () => void;
  onCallback?: () => void;
}

const AddSkillModal = ({
  visible,
  onClose,
  onCallback,
}: AddSkillModalProps) => {
  const [user] = useAuthState(auth);
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [publishing, setPublishing] = useState(false);
  const { data } = useSanityData<SkillCategory[]>(
    groq`*[_type == "skillCategory"]`,
    false
  );
  const selectedCategory = data?.find((d) => d.name === category);

  const handleCreateSkill = useCallback(async () => {
    if (!user) return;

    setPublishing(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/skill", {
        method: "POST",
        headers: {
          Authorization: `bearer ${idToken}`,
        },
        body: JSON.stringify({ name: skill, category: selectedCategory }),
      });
      if (!response.ok) throw new Error(response.statusText);
      if (onCallback) {
        await onCallback();
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setPublishing(false);
    }
  }, [user, skill, selectedCategory, onCallback, onClose]);

  const formIsValid = skill && category;

  return (
    <Modal
      scroll
      closeButton
      blur
      open={visible}
      onClose={onClose}
      width="600px"
    >
      <Modal.Header>
        <Text size={26} weight="bold">
          Legg til ny ferdighet
        </Text>
      </Modal.Header>
      <Modal.Body css={{ padding: "$10" }}>
        <Input
          clearable
          label="Ferdighet"
          value={skill}
          onChange={({ target: { value } }) => setSkill(value)}
        />
        <Select
          name="category"
          label="Kategori"
          value={category}
          options={data?.map((c) => c.name)}
          onChange={({ target: { value } }) => setCategory(value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color="success"
          onClick={handleCreateSkill}
          disabled={!formIsValid || publishing}
        >
          Lagre
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSkillModal;
