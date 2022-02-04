import React, { createContext, useEffect, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Marketplace, PokemonCard } from "../utilis/api/types";

import Cart from "../components/Cart";
import SearchForm from "../components/SearchForm";
import LoadMoreList from "../components/LoadMoreList";

import Head from "next/head";

// mockup only
export const MarketplaceContext = createContext<Marketplace>({ cards: [] });

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const getInitialParams = (query: any) => {
    const splitTypes = query?.q?.split(" ") || [];
    const rawParams = splitTypes.map((type: string) =>
      type?.replace(/\*/g, " ").split(":")
    );
    return Object.fromEntries(rawParams);
  };

  console.log(getInitialParams(props.query));
  
  const [params, setParams] = useState(getInitialParams(props.query));
  const [order, setOrder] = useState({ products: [] });

  useEffect(() => {
    const products =
      JSON.parse(localStorage.getItem("products") as string) || [];
    setOrder({ products });
  }, []);

  useEffect(() => {
    // storage in localStorage
    localStorage.setItem("products", JSON.stringify(order.products));
  }, [order]);

  if (props.notFound) {
    return (
      <div className="error wrap">
        <h1>Could not find any cards matching your search criteria!</h1>
      </div>
    );
  }

  return (
    <MarketplaceContext.Provider
      value={{
        params,
        setParams,
        cards: props.cards,
        types: props.types,
        rarities: props.rarities,
        sets: props.sets,
        order,
        setOrder,
      }}
    >
      <Head>
        <title>TCG Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchForm />

      <section className="wrap">
        <LoadMoreList />
      </section>
      {/* later move to _app */}
      <Cart />
    </MarketplaceContext.Provider>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { size, q } = query;

  const params: PokemonTCG.Parameter = {
    q: (q as string) || "",
    pageSize: parseInt(size as string) || 12,
  };
  try {
    const cards: PokemonCard[] =
      (await PokemonTCG.findCardsByQueries(params)) || [];

    const types: PokemonTCG.Type[] = await PokemonTCG.getTypes();
    const rarities: PokemonTCG.Rarity[] = await PokemonTCG.getRarities();
    const sets: PokemonTCG.Set[] = await PokemonTCG.getAllSets();

    return { props: { query, cards, types, rarities, sets } };
  } catch (error) {
    return { props: { notFound: true } };
  }
};
