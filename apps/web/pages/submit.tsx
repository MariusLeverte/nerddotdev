import CodeEditor from "@components/CodeEditor";
import { getUserSSR } from "@libs/firebase/getUserSSR";
import { auth, firestore } from "@libs/firebase/initFirebase";
import { addDoc, collection } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "ui";
import { defaultEditorValue } from "../constants";

const Submit = () => {
  const [user] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (value: string, title: string, language: string) => {
      if (!value || value === defaultEditorValue) return;
      setSubmitting(true);

      try {
        await addDoc(collection(firestore, "submissions"), {
          code: value,
          user: user?.uid,
          title: title,
          language: language,
        });

        router.push("/submissions");
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    },
    [user, router]
  );

  return (
    <section className="bg-slate-900 h-screen">
      <Container className="h-full flex">
        <CodeEditor onSubmit={handleSubmit} loading={submitting} />
      </Container>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const user = await getUserSSR({ res, req });

  if (!user || user.error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Submit;
