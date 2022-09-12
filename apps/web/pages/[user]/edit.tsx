import Meta from "../../components/SEO/Meta";

import { getArraySkills } from "../../utils/skills";
import { useCallback, useState } from "react";
import useEditUserProfile from "../../hooks/useEditUserProfile";

import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";
import { Button, Container, Input, Label } from "ui";
import InputSkills from "../../components/Skills/InputSkills";
import useUser from "../../hooks/useUser";
import SlateEditor from "../../components/Slate";
import { toSlate } from "../../components/Slate/utils";

import { useRouter } from "next/router";
import { generateKey } from "../../utils/key";
import { initialValue } from "../../components/Slate/initialValue";

const Edit = () => {
  const router = useRouter();
  const { user: firebaseUser } = useFirebaseUser();
  const { user, refetch } = useUser();
  const { merged, intro, github, linkedin, skills, about, repos, setValue } =
    useEditUserProfile(user);
  const [updating, setUpdating] = useState(false);

  const handleSaveData = useCallback(async () => {
    if (!firebaseUser) return;
    if (user._id !== firebaseUser.uid) return;

    setUpdating(true);
    try {
      const idToken = await firebaseUser.getIdToken();

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
      await refetch();
      router.push(`/${user.slug}`);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }, [
    firebaseUser,
    user,
    intro,
    github,
    linkedin,
    about,
    skills,
    repos,
    router,
    refetch,
  ]);

  if (!user) {
    return null;
  }

  const data = merged || user;

  return (
    <div className="my-20">
      <Meta
        title={user.name + " - Nerd.dev"}
        description={`${user.name}${data.intro && ` - ` + data.intro}`}
        keywords={getArraySkills(user?.skills ?? []).join(",")}
      />
      <Container as="section" width="xs">
        <Input
          label="Intro"
          value={intro}
          onChange={({ target: { value } }) => setValue("intro", value)}
          className="mb-4"
        />
        <Input
          label="Github"
          value={github}
          onChange={({ target: { value } }) => setValue("github", value)}
          className="mb-4"
        />
        <Input
          label="LinkedIn"
          value={linkedin}
          onChange={({ target: { value } }) => setValue("linkedin", value)}
          className="mb-4"
        />
        <div className="mb-4">
          <Label text="Om deg" />
          <SlateEditor
            initialValue={about ? toSlate(about) : user.about ?? initialValue}
            onChange={(value) => setValue("about", value)}
          />
        </div>
        <InputSkills
          initialValue={skills}
          onChange={(value) => setValue("skills", value)}
          className="mb-4"
        />
        <div className="flex justify-end mt-10">
          <Button color="success" onClick={handleSaveData} disabled={updating}>
            Lagre
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Edit;
