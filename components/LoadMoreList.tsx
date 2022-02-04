import React, { useContext, useEffect, useState } from "react";
import { Button, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Router from "next/router";
import { Marketplace, PokemonCard } from "../utilis/api/types";
import MainCard from "../components/MainCard";
import { MarketplaceContext } from "../pages";

const LoadMoreList = () => {
  const { cards, params } = useContext<Marketplace>(MarketplaceContext);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState<PokemonCard[]>(cards);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    setLoading(true);
    setInitLoading(true);
    const entries = Object.entries(params);
    const q = entries
      .filter(([, value]) => value)
      .map(([key, value]: any) => `${key}:${value?.replaceAll(" ", "*")}`)
      .join(" ");
    if (q) {
      Router.push(`/?q=${q}`, undefined, { shallow: true });
    }
    (async () => {
      const params: PokemonTCG.Parameter = {
        q: (q as string) || "",
        pageSize,
      };
      const pokemonCards: PokemonCard[] = await PokemonTCG.findCardsByQueries(
        params
      );

      setLoading(false);
      setInitLoading(false);
      setLists(pokemonCards);
    })();
  }, [params, pageSize]);

  const onLoadMore = () => {
    setLoading(true);
    setPageSize(pageSize + 12);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 42,
          lineHeight: "32px",
          marginBottom: 150,
        }}
      >
        <Button
          icon={<SearchOutlined />}
          className="load__more"
          onClick={onLoadMore}
        >
          show more
        </Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={lists}
      grid={{ gutter: 73, xs: 1, sm: 2, md: 2, lg: 3 }}
      renderItem={(card) => (
        <List.Item>
          <MainCard card={card} />
        </List.Item>
      )}
    />
  );
};

export default LoadMoreList;
