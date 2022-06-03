import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./initFirebase";

type Claims = { code: string } | null;
type CountProviderProps = { children: React.ReactNode };

const FirebaseAuthContext = createContext<
  | {
      isAuthenticated: boolean;
      user: User | null | undefined;
      loading: boolean;
      error: Error | undefined;
      claims: Claims;
      providerData: Pick<User, "displayName" | "photoURL"> | null;
    }
  | undefined
>(undefined);

const FirebaseAuthProvider = ({ children }: CountProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [claims, setClaims] = useState<Claims>(null);
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

  const value = {
    isAuthenticated: !!user,
    user: claims?.code ? user : null,
    loading,
    error,
    claims,
    providerData,
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
