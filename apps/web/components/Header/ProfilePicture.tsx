import { Avatar } from "@nextui-org/react";
import { auth } from "../../libs/firebase/initFirebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import useUser from "../../hooks/userUser";
import { Button } from "ui";
import { useState } from "react";
import { useFirebaseUser } from "../../libs/firebase/FirebaseAuthProvider";

const ProfileMenu = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleAction = () => {
    signOut(auth);
  };

  return (
    <div className="absolute right-0 z-20 w-48 p-4 mt-2 bg-white rounded-md shadow-xl">
      <div className="space-y-4 flex flex-col items-start">
        <Button
          onClick={() => router.push(`/${user?.slug}` || "")}
          color="transparent"
          size="xs"
        >
          Se profil
        </Button>
        <Button
          onClick={() => router.push(`/${user?.slug}/invite` || "")}
          color="transparent"
          size="xs"
        >
          Inviter en utvikler
        </Button>
        <Button onClick={handleAction} color="transparent" size="xs">
          Logg ut
        </Button>
      </div>
    </div>
  );
};

const ProfilePicture = () => {
  const { user, loading } = useFirebaseUser();
  const [open, setOpen] = useState(false);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="relative inline-block">
      <button
        className="relative z-10 hover:cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Avatar src={user.photoURL || ""} size="lg" bordered color="gradient" />
      </button>
      {open && <ProfileMenu />}
    </div>
  );
};

export default ProfilePicture;
