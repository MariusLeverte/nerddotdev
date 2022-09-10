import { atom, useAtom } from "jotai";
import { groq } from "next-sanity";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../libs/firebase/initFirebase";
import { userWithProjectsByIdQuery } from "../libs/sanity/queries";
import { User } from "../types/schema";
import useSanityData from "./useSanityData";

const userAtom = atom<any | undefined>(undefined);

const useUser = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const [user, firebaseLoading, firebaseError] = useAuthState(auth);
  const {
    fetchData,
    data,
    loading: sanityLoading,
    error: sanityError,
  } = useSanityData<User>(
    {
      query: userWithProjectsByIdQuery,
      params: { id: user?.uid },
    },
    false,
    true
  );

  useEffect(() => {
    if (!user) return;
    if (data) return;
    if (sanityLoading || sanityError) return;
    if (currentUser) return;

    fetchData();
  }, [user, data, sanityLoading, sanityError, fetchData, currentUser]);

  useEffect(() => {
    if (currentUser) return;
    if (!data) return;

    setCurrentUser({
      ...data,
      id: user?.uid,
      slug: data?.slug?.current,
      name: data?.name,
    });
  }, [currentUser, data, setCurrentUser, user]);

  return {
    user: currentUser,
    loading: firebaseLoading || sanityLoading,
    error: firebaseError || sanityError,
    refetch: fetchData,
  };
};

export default useUser;
