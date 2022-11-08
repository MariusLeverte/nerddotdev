import { getUserSSR } from "@libs/firebase/getUserSSR";
import admin from "@libs/firebase/initFirebase.server";
import { Submission } from "@types/firebase";
import { isNotEmptyArray } from "@utils/array";
import { GetServerSideProps } from "next";
import { Container } from "ui";

interface Props {
  initialData: Submission[];
}

const Dashboard = ({ initialData }: Props) => {
  return (
    <section className="before:bg-slate-900 before:h-20 before:block">
      <Container className="-mt-20">
        {isNotEmptyArray(initialData) && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <ul className="divide-y divide-solid">
              {initialData.map((code) => (
                <li className="p-4 mx-6">
                  <div className="-mx-8">Foo</div>
                </li>
              ))}
            </ul>
          </div>
        )}
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

  const db = admin.firestore();
  const collection = await db.collection("submissions");
  const snapshot = await collection.where("user", "==", user.uid).get();

  if (snapshot.empty) {
    return {
      props: {
        initialData: [],
      },
    };
  }

  let result = [];

  for await (const doc of snapshot.docs) {
    const data = doc.data() as Document;
    result.push({ ...data, id: doc.id });
    continue;
  }

  return {
    props: {
      initialData: result,
    },
  };
};

export default Dashboard;
