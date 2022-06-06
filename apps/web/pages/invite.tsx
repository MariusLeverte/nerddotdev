import { Container, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import Github from "../components/Auth/Github";
import Meta from "../components/SEO/Meta";
import { useFirebaseUser } from "../libs/firebase/FirebaseAuthProvider";
import { auth } from "../libs/firebase/initFirebase";
import { userById } from "../libs/sanity/queries";
import { getClient } from "../libs/sanity/sanity.server";
import { User } from "../types/schema";
import { Document, getReferralCodeInformation } from "./api/referral/code";

interface InviteProps {
  claimed?: boolean;
  name?: User["name"];
  photo?: User["photo"];
  data?: Document;
}

const Invite = ({ claimed, name, photo, data }: InviteProps) => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const { providerData } = useFirebaseUser();
  const [signInWithGithub, githubUser, githubLoading] =
    useSignInWithGithub(auth);

  const handleAction = useCallback(async () => {
    try {
      signInWithGithub();
    } catch (error) {
      console.error(error);
    }
  }, [signInWithGithub]);

  useEffect(() => {
    if (!githubUser) return;
    if (!data?.id) return;
    setCreating(true);

    githubUser.user?.getIdToken().then((token) => {
      fetch("/api/user/create", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          id: data.id,
          code: router.query.kode,
          providerData: {
            screenName: githubUser.user?.reloadUserInfo?.screenName,
          },
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          router.replace(`/${response.slug}`);
        });
    });
  }, [data?.id, githubUser, router, router.query.kode]);

  if (claimed)
    return (
      <Container css={{ height: "100vh" }} display="flex" alignItems="center">
        <Container
          css={{ textAlign: "center", flexDirection: "column" }}
          display="flex"
          justify="center"
        >
          <Text>Oh no</Text>
        </Container>
      </Container>
    );

  return (
    <>
      <Meta title={`Invitasjon fra ${name}`} noIndex />
      <Container css={{ height: "100vh" }} display="flex" alignItems="center">
        <Container
          css={{ textAlign: "center", flexDirection: "column" }}
          display="flex"
          justify="center"
        >
          <Github
            onAuth={handleAction}
            photoUrl={providerData?.photoURL}
            displayName={providerData?.displayName}
            loading={githubLoading || creating}
          />
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.kode) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const data = await getReferralCodeInformation(query.kode as string);

  if (data.error) {
    return {
      props: {
        error: data.error,
      },
    };
  }

  if (data.result?.claimed) {
    return {
      props: {
        claimed: true,
      },
    };
  }

  const user: User = await getClient(false).fetch(userById, {
    user: data.result?.referrer,
  });

  return {
    props: {
      name: user?.name || "",
      photo: user?.photo || "",
      data: data.result,
    },
  };
};

export default Invite;
