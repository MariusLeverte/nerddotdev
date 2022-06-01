import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase/initFirebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import useUser from "../../hooks/userUser";
import SpaceBetween from "../Wrapper/SpaceBetween";

const ProfileMenu = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleAction = () => {
    signOut(auth);
  };

  return (
    <SpaceBetween y={4}>
      <Button
        onPress={() => router.push(user?.slug || "")}
        css={{
          padding: 0,
          backgroundColor: "transparent",
          color: "$accents6",
          justifyContent: "start",
          "&:hover": {
            color: "$accents9",
          },
        }}
      >
        Se profil
      </Button>
      <Button
        onClick={handleAction}
        css={{
          padding: 0,
          backgroundColor: "transparent",
          color: "$accents6",
          justifyContent: "start",
          "&:hover": {
            color: "$error",
          },
        }}
      >
        Logg ut
      </Button>
    </SpaceBetween>
  );
};

const ProfilePicture = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;
  if (!user) return null;

  return (
    <Tooltip
      placement="bottomEnd"
      content={<ProfileMenu />}
      trigger="click"
      css={{ padding: "$10" }}
    >
      <Avatar src={user.photoURL || ""} size="lg" bordered color="gradient" />
    </Tooltip>
  );
};

export default ProfilePicture;
