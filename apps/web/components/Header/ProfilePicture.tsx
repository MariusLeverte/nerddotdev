import { Avatar, Tooltip } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase/initFirebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import useUser from "../../hooks/userUser";
import { Button } from "ui";

const ProfileMenu = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleAction = () => {
    signOut(auth);
  };

  return (
    <div className="space-y-4 flex flex-col">
      <Button
        onClick={() => router.push(user?.slug || "")}
        color="transparent"
        size="sm"
      >
        Se profil
      </Button>
      <Button onClick={handleAction} color="transparent" size="sm">
        Logg ut
      </Button>
    </div>
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
