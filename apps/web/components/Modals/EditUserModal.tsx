import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useEditUserProfile from "../../hooks/useEditUserProfile";
import { auth } from "../../libs/firebase/initFirebase";
import { generateKey } from "../../utils/key";
import GithubRepos from "../GithubRepos";
import InputSkills from "../Skills/InputSkills";
import SlateEditor from "../Slate";
import { initialValue } from "../Slate/initialValue";
import { toSlate } from "../Slate/utils";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  id: string;
}

const EditUserModal = ({ visible, onClose, id }: EditUserModalProps) => {
  const { intro, github, linkedin, skills, about, repos, setValue } =
    useEditUserProfile();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSaveData = useCallback(async () => {
    if (!user) return;
    if (user.uid !== id) return;

    try {
      const idToken = await user.getIdToken();

      await fetch("/api/user/edit", {
        method: "POST",
        headers: {
          Authorization: `bearer ${idToken}`,
        },
        body: JSON.stringify({
          intro,
          social: {
            github,
            linkedin,
          },
          about,
          skills: skills?.map((skill) => ({
            _key: generateKey(12),
            _ref: skill._id,
            _type: "reference",
          })),
          repos,
        }),
      });
      router.push(router.asPath);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [
    user,
    id,
    intro,
    github,
    linkedin,
    about,
    skills,
    repos,
    router,
    onClose,
  ]);

  return (
    <Modal
      scroll
      closeButton
      blur
      open={visible}
      onClose={onClose}
      width="600px"
      fullScreen
    >
      <Modal.Header>
        <Text size={26} weight="bold">
          Rediger din profil
        </Text>
      </Modal.Header>
      <Modal.Body css={{ padding: "$10" }}>
        <Input
          clearable
          label="Intro"
          initialValue={intro}
          onChange={({ target: { value } }) => setValue("intro", value)}
        />
        <Input
          clearable
          label="Github"
          initialValue={github}
          onChange={({ target: { value } }) => setValue("github", value)}
        />
        <Input
          clearable
          label="LinkedIn"
          initialValue={linkedin}
          onChange={({ target: { value } }) => setValue("linkedin", value)}
        />
        <InputSkills
          initialValue={skills}
          onChange={(value) => setValue("skills", value)}
        />
        <SlateEditor
          initialValue={about ? toSlate(about) : initialValue}
          onChange={(value) => setValue("about", value)}
        />
        <GithubRepos
          username={github || ""}
          initialValue={repos}
          onChange={(value) => setValue("repos", value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="warning" onClick={onClose}>
          Forhåndsvis
        </Button>
        <Button auto flat color="success" onClick={handleSaveData}>
          Lagre
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
