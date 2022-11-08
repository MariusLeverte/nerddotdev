import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import { useFirebaseUser } from "@libs/firebase/FirebaseAuthProvider";

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
    </div>
  );
};

export default ProfilePicture;
