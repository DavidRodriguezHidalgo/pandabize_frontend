import Head from "next/head";
import Navbar from "../navbar";

interface MainProps {
  children: React.ReactNode;
  router: {
    asPath: string;
  };
}

const Main = ({ children, router }: MainProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pandabize S.L - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />
      <div className="py-2 px-4">{children}</div>
    </>
  );
};

export default Main;
