import { Button } from "antd";
import React from "react";
import { PokemonCard } from "../utilis/api/types"

const MainCard = ({ card }: { card: PokemonCard }) => {
  const currency = "$";
  const price =
    (card?.cardmarket &&
      `${currency} ${
        card?.cardmarket?.prices?.averageSellPrice ||
        card?.cardmarket?.prices?.trendPrice
      }`) ||
    "Nego";

  return (
    <div className="product__card">
      <img src={card?.images?.small} />
      <div className="product__mask">
        <div className="product__content">
          <h2>{card?.name}</h2>
          <p>{card?.rarity || "none"}</p>
          <div className="price__item">
            <div>{price}</div>
            <div>{card?.set?.total} left</div>
          </div>
        </div>
        <Button>Select card</Button>
      </div>
    </div>
  );
};

export const CartCard = ({ card }: { card: PokemonCard }) => {
  const currency = "$";
  const price =
    (card?.cardmarket &&
      `${currency} ${
        card?.cardmarket?.prices?.averageSellPrice ||
        card?.cardmarket?.prices?.trendPrice
      }`) ||
    "Nego";

  return (
    <div className="product__card">
      <img src={card?.images?.small} />
      <div className="product__mask">
        <div className="product__content">
          <h2>{card?.name}</h2>
          <p>{card?.rarity || "none"}</p>
          <div className="price__item">
            <div>{price}</div>
            <div>{card?.set?.total} left</div>
          </div>
        </div>
        <Button>Select card</Button>
      </div>
    </div>
  );
};

export default MainCard