import CodeEditor from "@components/CodeEditor";
import { auth, firestore } from "@libs/firebase/initFirebase";
import { addDoc, collection } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "ui";
import { defaultEditorValue } from "../../constants";

const Submit = () => {
  const [user] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (value: string) => {
      if (!value || value === defaultEditorValue) return;
      setSubmitting(true);

      try {
        await addDoc(collection(firestore, "submissions"), {
          code: value,
          user: user?.uid,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    },
    [user]
  );

  return (
    <section className="bg-slate-900 h-screen">
      <Container className="h-full flex">
        <CodeEditor onSubmit={handleSubmit} loading={submitting} />
      </Container>
    </section>
  );
};

export default Submit;
