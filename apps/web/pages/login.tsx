import { useCallback, useEffect } from "react";
import { Container } from "@nextui-org/react";
import { useSignInWithGithub, useAuthState } from "react-firebase-hooks/auth";
import Github from "../components/Auth/Github";
import { auth } from "../libs/firebase/initFirebase";
import { useRouter } from "next/router";
import { USER_REDIRECT_URL } from "../constants";
import Meta from "../components/SEO/Meta";

const Login = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGithub, githubUser, githubLoading] =
    useSignInWithGithub(auth);

  const handleAction = useCallback(async () => {
    if (!user) {
      signInWithGithub();
    } else {
      router.push(USER_REDIRECT_URL);
    }
  }, [signInWithGithub, user, router]);

  // useEffect(() => {
  //   if (githubLoading) return;
  //   if (!githubUser) return;

  //   router.push(USER_REDIRECT_URL);
  // }, [githubLoading, githubUser, router]);

  return (
    <>
      <Meta noIndex />
      <Container
        fluid
        css={{ height: "100vh" }}
        display="flex"
        alignItems="center"
      >
        <Github
          onAuth={handleAction}
          photoUrl={user?.photoURL}
          displayName={user?.displayName}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default Login;
