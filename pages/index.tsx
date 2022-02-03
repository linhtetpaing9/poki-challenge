import React, { useEffect } from "react";
import Head from "next/head";
import { Button } from "antd";

import type { GetStaticProps, InferGetStaticPropsType } from "next";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>TCG Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world antd template !</h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/product");
  // const people = await res.json();
  // if (!people) {
  //   return {
  //     notFound: true,
  //   };
  // }
  const people: any = [];
  return { props: { people } };
};
