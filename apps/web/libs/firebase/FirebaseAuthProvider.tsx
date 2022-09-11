import { onAuthStateChanged, User, onIdTokenChanged } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "./hooks";
import { auth, firestore } from "./initFirebase";

const dev = process.env.NODE_ENV !== "production";

const server = dev ? "http://localhost:3000" : "https://nerd.dev";

onAuthStateChanged(auth, (user) => {
  if (user) return;
  fetch(server + "/api/auth/check");
});

onIdTokenChanged(auth, (user) => {
  if (!user) return;
  user.getIdToken().then((token) =>
    fetch(server + "/api/auth/login", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
  );
});

type Metadata = { code?: string; thread?: string } | null;
type CountProviderProps = { children: React.ReactNode };
type Referral = {
  claimed: boolean;
  code: string;
  referrer: string;
  user: string;
};

const FirebaseAuthContext =
  createContext<
    | {
        isAuthenticated: boolean;
        user: User | null | undefined;
        loading: boolean;
        error: Error | undefined;
        metadata: Metadata;
        providerData: Pick<User, "displayName" | "photoURL"> | null;
        referrals: Referral[] | null;
      }
    | undefined
  >(undefined);

const FirebaseAuthProvider = ({ children }: CountProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [metadata, setMetadata] = useState<Metadata>(null);
  const { loadData: loadReferrals, data: referrals } = useCollectionDataOnce();

  const providerData = useMemo(() => {
    if (!user) return null;

    return { displayName: user.displayName, photoURL: user.photoURL };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    loadReferrals(
      query(
        collection(firestore, "referral"),
        where("referrer", "==", user.uid)
      )
    );
  }, [user, loadReferrals]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user: user,
      loading,
      error,
      metadata,
      providerData,
      referrals,
    }),
    [metadata, error, loading, providerData, referrals, user]
  );

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
