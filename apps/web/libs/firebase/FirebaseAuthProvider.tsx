import { User } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "./hooks";
import { auth, firestore } from "./initFirebase";

type Claims = { code: string } | null;
type CountProviderProps = { children: React.ReactNode };
type Referral = {
  claimed: boolean;
  code: string;
  referrer: string;
  user: string;
};

const FirebaseAuthContext = createContext<
  | {
      isAuthenticated: boolean;
      user: User | null | undefined;
      loading: boolean;
      error: Error | undefined;
      claims: Claims;
      providerData: Pick<User, "displayName" | "photoURL"> | null;
      referrals: Referral[] | null;
    }
  | undefined
>(undefined);

const FirebaseAuthProvider = ({ children }: CountProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [claims, setClaims] = useState<Claims>(null);

  const { loadData, data: referrals } = useCollectionDataOnce();

  const providerData = useMemo(() => {
    if (!user) return null;

    return { displayName: user.displayName, photoURL: user.photoURL };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (claims) return;

    user.getIdTokenResult().then((result) => {
      setClaims({ code: result?.claims?.code as string });
    });
  }, [user, claims]);

  useEffect(() => {
    if (!user) return;

    loadData(
      query(
        collection(firestore, "referral"),
        where("referrer", "==", user.uid)
      )
    );
  }, [user, loadData]);

  const value = {
    isAuthenticated: !!user,
    user: claims?.code ? user : null,
    loading,
    error,
    claims,
    providerData,
    referrals,
  };
  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseUser = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseUser must be used within a FirebaseAuthProvider"
    );
  }
  return context;
};

export { FirebaseAuthProvider, useFirebaseUser };
