import CodeView from "@components/CodeView";
import admin from "@libs/firebase/initFirebase.server";
import { GetServerSideProps } from "next";
import { Container } from "ui";

const Submission = ({ initialData }) => {
  console.log({ initialData });

  return (
    <section className="bg-slate-900 h-screen">
      <Container className="h-full flex">
        <CodeView code={initialData?.code} />
      </Container>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log({ params });

  const db = admin.firestore();
  const document = await db
    .collection("submissions")
    .doc(params?.submission)
    .get();

  if (!document.exists) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      initialData: document.data(),
    },
  };
};

export default Submission;
