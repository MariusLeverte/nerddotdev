import Lottie from "lottie-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { Container, Text } from "ui";
import Github from "../components/Auth/Github";
import Meta from "../components/SEO/Meta";
import { useFirebaseUser } from "../libs/firebase/FirebaseAuthProvider";
import { auth } from "../libs/firebase/initFirebase";
import { userById } from "../libs/sanity/queries";
import { getClient } from "../libs/sanity/sanity.server";
import { User } from "../types/schema";
import { Document, getReferralCodeInformation } from "./api/invite/code";

interface InviteProps {
  claimed?: boolean;
  name?: User["name"];
  photo?: User["photo"];
  data?: Document;
}

const Invite = ({ claimed, name, photo, data }: InviteProps) => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const { providerData, user } = useFirebaseUser();
  const [signInWithGithub, githubUser, githubLoading] =
    useSignInWithGithub(auth);

  console.log({ claimed, name, photo, data, githubUser, user });

  const handleAction = useCallback(async () => {
    try {
      signInWithGithub();
    } catch (error) {
      console.error(error);
    }
  }, [signInWithGithub]);

  useEffect(() => {
    if (!githubUser) return;
    if (githubUser.operationType !== "link") return;
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

  if (claimed) {
    return (
      <Container className="h-full flex items-center">
        <Container className="flex justify-center items-center text-center flex-col">
          <Lottie
            animationData={require("../lottie/68783-bad-emoji.json")}
            loop={false}
          />
          <Text weight="bold" className="text-xl lg:text-3xl">
            Oh no!
          </Text>
          <Text className="mt-2">
            Koden er allerede brukt! <br /> Hør med {name} om du kan få én ny
            kode
          </Text>
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Meta title={`Invitasjon fra ${name}`} noIndex />
      <Container className="h-full flex justify-center items-center flex-col">
        <div className="flex items-baseline">
          <Text weight="bold" className="text-xl lg:text-3xl">
            Wow!
          </Text>
          <Lottie
            animationData={require("../lottie/42764-clapping-hands.json")}
            className="max-w-[60px]"
          />
        </div>
        <Text className="mt-2 text-center mb-8">
          En invitasjon fra {name}, ikke værst! <br />
          Meld deg inn og del kunnskapen med de andre
        </Text>
        <Github
          onAuth={handleAction}
          photoUrl={providerData?.photoURL}
          displayName={providerData?.displayName}
          loading={githubLoading || creating}
        />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.code) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const data = await getReferralCodeInformation(query.code as string);

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
