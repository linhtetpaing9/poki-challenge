import { Button, Col, List, Modal, Row } from "antd";
import React, { useContext, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { OrderCard } from "./MainCard";
import { Marketplace, OrderProduct } from "../utilis/api/types";
import { MarketplaceContext } from "../pages";

const Cart = () => {
  const { order, setOrder } = useContext<Marketplace>(MarketplaceContext);
  const [visible, setVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const clearOrder = () => {
    setOrder({ products: [] });
  };

  const handleCheckout = () => {
    // extends payment process, need create payment
    setVisible(false);
    setCheckoutVisible(true);
  };

  const totalCards = order?.products?.length || 0;
  const totalPrice = order?.products.reduce(
    (acc: number, product: OrderProduct) => {
      const price =
        product?.cardmarket?.prices?.averageSellPrice ||
        product?.cardmarket?.prices?.trendPrice ||
        10000;
      const quantity = product?.quantity || 0;
      return acc + price * quantity;
    },
    0
  );

  return (
    <section id="cart">
      <div className="cart">
        <p style={{
          
        }}>{totalCards}</p>
        <Button
          className="cart__btn"
          icon={<ShoppingCartOutlined />}
          onClick={() => setVisible(true)}
        >
          View cart
        </Button>
      </div>
      <Modal
        title={false}
        visible={visible}
        // width={420}
        centered
        wrapClassName={"cart__modal"}
        onCancel={() => setVisible(false)}
        closeIcon={<img src="/img/Close.png" />}
        footer={false}
      >
        <div className="cart__cards">
          <List
            itemLayout="horizontal"
            dataSource={order.products}
            grid={{ column: 1 }}
            renderItem={(card: OrderProduct) => (
              <List.Item>
                <OrderCard card={card} />
              </List.Item>
            )}
          />
        </div>
        {/* <div className="bg__space"></div> */}
        <div className="clear__all" onClick={clearOrder}>
          Clear all
        </div>
        <div className="total__price">
          <div className="layout">
            <h4>Total cards</h4>
            <p>{totalCards}</p>
          </div>
          <div className="layout">
            <h3>Total price</h3>
            <p className="lg">{totalPrice.toFixed(2)}</p>
          </div>
          <Button
            disabled={order.products.length == 0}
            onClick={handleCheckout}
          >
            Pay now
          </Button>
        </div>
      </Modal>
      <Modal
        title={false}
        visible={checkoutVisible}
        width={400}
        centered
        wrapClassName={"payment__modal"}
        onCancel={() => setCheckoutVisible(false)}
        closeIcon={<img src="/img/Close.png" />}
        footer={false}
      >
        <img className="payment__success" src="/img/message.png" />
      </Modal>
    </section>
  );
};

export default Cart;
