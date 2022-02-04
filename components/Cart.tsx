import { Button, Col, List, Modal, Row } from "antd";
import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartCard } from "./MainCard";

const Cart = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCart = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <section id="cart">
      <Button
        className="cart"
        icon={<ShoppingCartOutlined />}
        onClick={() => setVisible(true)}
      >
        View cart
      </Button>
      <Modal
        title={false}
        visible={visible}
        width={420}
        centered
        onOk={handleCart}
        wrapClassName={"cart__modal"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="cart__cards">
          <List
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={[]}
            grid={{ gutter: 73, xs: 1, sm: 2, md: 2, lg: 3 }}
            renderItem={(card) => (
              <List.Item>
                <CartCard card={card} />
              </List.Item>
            )}
          />
        </div>
        <div className="total__price">
          <Row>
            <Col>
              <h3>Total cards</h3>
            </Col>
            <Col>7</Col>
          </Row>
          <Row>
            <Col>
              <h3>Total price</h3>
            </Col>
            <Col>$19.97</Col>
          </Row>
          <Button>Pay now</Button>
        </div>
      </Modal>
    </section>
  );
};

export default Cart;
