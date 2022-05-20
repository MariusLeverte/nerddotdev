import { Avatar, Button, Popover } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase/initFirebase";
import { signOut } from "firebase/auth";

const ProfilePicture = () => {
  const [user, loading] = useAuthState(auth);

  const handleAction = () => {
    signOut(auth);
  };

  if (loading) return null;
  if (!user) return;

  return (
    <Popover>
      <Popover.Trigger>
        <Avatar src={user.photoURL || ""} size="lg" bordered color="gradient" />
      </Popover.Trigger>
      <Popover.Content>
        <Button shadow color="error" onClick={handleAction}>
          Logg ut
        </Button>
      </Popover.Content>
    </Popover>
  );
};

export default ProfilePicture;
