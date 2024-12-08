import client from "@/apolloClient";
import Layout from "../components/layouts/main";
import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";

const Website = ({ Component, pageProps, router }) => {
  return (
    <ApolloProvider client={client}>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ApolloProvider>
  );
};

export default Website;
