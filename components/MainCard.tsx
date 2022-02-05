import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { MarketplaceContext } from "../pages";
import { Marketplace, OrderProduct, PokemonCard } from "../utilis/api/types";
import { UpOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons";

const MainCard = ({ card }: { card: PokemonCard }) => {
  const { order, setOrder } = useContext<Marketplace>(MarketplaceContext);
  const currency = "$";
  const price =
    (card?.cardmarket &&
      `${currency} ${
        card?.cardmarket?.prices?.averageSellPrice ||
        card?.cardmarket?.prices?.trendPrice
      }`) ||
    "Nego";

  const $isOrderSelected = order.products.some(
    (product: any) => product.id == card.id
  );

  const handleOrder = () => {
    if (!$isOrderSelected) {
      setOrder({ products: [...order.products, card] });
    }
    if ($isOrderSelected) {
      setOrder({
        products: order.products.filter(
          (product: any) => product.id != card.id
        ),
      });
    }
  };

  return (
    <div className="product__card">
      {/* later use of optimization */}
      {/* <Image src={card?.images?.small} width={294} height={432} /> */}
      <img src={card?.images?.small} loading="lazy" />
      <div className="product__mask">
        <div className="product__content">
          <h2>{card?.name}</h2>
          <p>{card?.rarity || "none"}</p>
          <div className="price__item">
            <div>{price}</div>
            <div>{card?.set?.total} left</div>
          </div>
        </div>
        {$isOrderSelected ? (
          <Button className="order__selected__btn" onClick={handleOrder}>
            Selected
          </Button>
        ) : (
          <Button onClick={handleOrder}>Select card</Button>
        )}
      </div>
    </div>
  );
};

export const OrderCard = ({ card }: { card: OrderProduct }) => {
  const { order, setOrder } = useContext<Marketplace>(MarketplaceContext);
  const currency = "$";

  const handleQuantity = (value: number) => {
    setOrder({
      products: order.products.map((product: OrderProduct) => {
        if (product.id == card.id) {
          return { ...product, quantity: value };
        }
        return product;
      }),
    });
  };

  const remainStock = card.quantity
    ? card?.set?.total - card?.quantity
    : card?.set?.total;

  const price =
    card?.cardmarket?.prices?.averageSellPrice ||
    card?.cardmarket?.prices?.trendPrice ||
    10000;
  const priceDisplay =
    (card?.cardmarket &&
      `${currency}${
        card?.cardmarket?.prices?.averageSellPrice ||
        card?.cardmarket?.prices?.trendPrice
      } per card`) ||
    "$10000 per card";

  const totalPrice = card?.quantity ? price * card.quantity : price * 0;

  const totalPriceDisplay = `$ ${totalPrice.toFixed(2)}`;

  return (
    <div className="order__card">
      <Row>
        <Col xs={8} sm={6}>
          <img src={card?.images?.small} loading="lazy" />
        </Col>
        <Col xs={10} sm={12}>
          <div className="order__content">
            <h2>{card?.name}</h2>
            <p>{priceDisplay}</p>
            <h5>
              <span>{remainStock} </span>cards left
            </h5>
          </div>
        </Col>
        <Col xs={6} sm={6}>
          <div className="price__item">
            <InputNumber
              min={1}
              max={card?.set?.total}
              onChange={handleQuantity}
            />
            <p>price</p>
            <h5>{totalPriceDisplay}</h5>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Customize input number, fix need to set proper type
const InputNumber = ({ min, max, onChange = () => {} }: any) => {
  const [value, setValue] = useState(min);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleDown = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };
  const handleUp = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };
  return (
    <div className="input__number">
      <input value={value} readOnly />

      {value !== max ? (
        <Button className="up" icon={<UpOutlined />} onClick={handleUp} />
      ) : (
        <Button className="not__up" icon={<UpOutlined />} onClick={handleUp} />
      )}
      {value !== min  ? (
        <Button className="down" icon={<DownOutlined />} onClick={handleDown} />
      ) : (
        <Button
          className="not__down"
          icon={<CloseOutlined />}
          onClick={handleDown}
        />
      )}
    </div>
  );
};

export default MainCard;
