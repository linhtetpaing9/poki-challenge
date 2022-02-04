import { Col, Input, Row, Select } from "antd";
import debounce from "lodash/debounce";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import React, { useContext } from "react";
import { MarketplaceContext } from "../pages";
import { Marketplace } from "../utilis/api/types";

const SearchForm = () => {
  const { types, rarities, sets, params, setParams } =
    useContext<Marketplace>(MarketplaceContext);

  const typeOptions = types.map((type: PokemonTCG.Type) => ({
    label: type,
    value: type?.replace(/\s/g, "*") || "",
  }));
  const rarityOptions = rarities.map((rarity: PokemonTCG.Rarity) => ({
    label: rarity,
    value: rarity?.replace(/\s/g, "*") || "",
  }));
  const setOptions = sets.map((set: PokemonTCG.Set) => ({
    label: set.name,
    value: set?.id?.replace(/\s/g, "*") || "",
  }));

  const handleParams = (param: any) => (value: any) => {
    if (param == "name") {
      setParams({ ...params, [param]: `${value.target.value}*` });
    } else {
      setParams({ ...params, [param]: value });
    }
  };
  return (
    <section className="search__box">
      <Row gutter={{ xs: 15, sm: 15, md: 0 }}>
        <Col xs={24} sm={24} md={9}>
          <Input
            className="name"
            placeholder="Name.."
            onChange={debounce(handleParams("name"), 1000)}
            size="large"
            defaultValue={params.name}
          />
        </Col>
        <Col xs={8} sm={8} md={5}>
          <Select
            className="type"
            placeholder="Type"
            onChange={handleParams("types")}
            size="large"
            defaultValue={params.types}
            options={typeOptions}
            allowClear
          ></Select>
        </Col>
        <Col xs={8} sm={8} md={5}>
          <Select
            className="rarity"
            placeholder="Rarity"
            onChange={handleParams("rarity")}
            size="large"
            defaultValue={params.rarity}
            options={rarityOptions}
            allowClear
          ></Select>
        </Col>
        <Col xs={8} sm={8} md={5}>
          <Select
            className="set"
            placeholder="Set"
            onChange={handleParams("set.id")}
            size="large"
            defaultValue={params["set.id"]}
            options={setOptions}
            allowClear
          ></Select>
        </Col>
      </Row>
    </section>
  );
};

export default SearchForm;
