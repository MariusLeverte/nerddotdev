import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../libs/firebase/initFirebase";

const useUser = () => {
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);

  return {
    user: user,
    loading: firebaseLoading,
    error: firebaseError,
  };
};

export default useUser;
