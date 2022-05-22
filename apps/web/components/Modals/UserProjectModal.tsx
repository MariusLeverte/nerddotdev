import { Modal, Text } from "@nextui-org/react";
import { PortableText } from "@portabletext/react";
import { UserProject } from "../../types/sanity";

interface UserProjectModalProps {
  visible: boolean;
  onClose: () => void;
  name: UserProject["name"];
  about: UserProject["about"];
}

const UserProjectModal = ({
  visible,
  onClose,
  name,
  about,
}: UserProjectModalProps) => {
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
        <Text h2>{name}</Text>
      </Modal.Header>
      <Modal.Body>
        <PortableText components={{}} value={about} />
      </Modal.Body>
    </Modal>
  );
};

export default UserProjectModal;
