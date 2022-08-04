import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase/initFirebase";
import Select from "../NextUI/Select";

interface AddSkillCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onCallback?: () => void;
}

const AddSkillCategoryModal = ({
  visible,
  onClose,
  onCallback,
}: AddSkillCategoryModalProps) => {
  const [user] = useAuthState(auth);

  const handleCreateSKillCategory = () => console.log("save");

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
          Legg til ny ferdighetskategori
        </Text>
      </Modal.Header>
      <Modal.Body css={{ padding: "$10" }}>
        <Input
          clearable
          label="Kategori"
          onChange={({ target: { value } }) => console.log({ value })}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="success" onClick={handleCreateSKillCategory}>
          Lagre
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSkillCategoryModal;
