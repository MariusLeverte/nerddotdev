import { getUserSSR } from "@libs/firebase/getUserSSR";
import { GetServerSideProps } from "next";

const Dashboard = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const user = await getUserSSR({ res, req });

  console.log({ user });

  return {
    props: {},
  };
};

export default Dashboard;
