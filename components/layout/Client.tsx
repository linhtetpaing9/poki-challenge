import React, { FC, ReactNode, useState } from "react";
import { Col, Layout, Menu, Row } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import config from "../../customize/config";
import Head from "next/head";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const ClientLayout: FC<ReactNode> = ({ children }) => {
  return (
    <Layout id="client__layout">
      <MetaTag />
      <Header>
        <div className="main__header">
          <Row justify="center" align="middle">
            <h1>TCG Marketplace</h1>
          </Row>
          <Row justify="center" align="middle">
            <div className="logo"/>
          </Row>
        </div>
        {/* <div className="logo" /> */}
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const Navigation = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (value: any) => {
    console.log("click ", value);
    setCurrent(value.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Navigation Three - Submenu"
      >
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};

const MetaTag = ({ title }: { title?: string }) => {
  return (
    <Head>
      <>
        {/* <title>{title}</title> */}
        <title>{title || config.defaultTitle}</title>
        {/* custom font */}
        <link rel="stylesheet" type="text/css" href="/fonts/style.css" />
        {/* https://favicon.io/ */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${config.domain}/img/favicon_io/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${config.domain}/img/favicon_io/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${config.domain}/img/favicon_io/favicon-16x16.png`}
        />
        {/* <link rel="manifest" href={`${config.domain}/img/favicon_io/site.webmanifest`} /> */}
        {/* https://megatags.co/ */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* Search Engine */}
        <meta name="description" content={config.description} />
        <meta name="image" content={`${config.domain}/img/og/1200x630.jpg`} />
        {/* Schema.org for Google */}
        <meta itemProp="name" content={config.defaultTitle} />
        <meta itemProp="description" content={config.description} />
        <meta
          itemProp="image"
          content={`${config.domain}/img/og/1200x630.jpg`}
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={config.defaultTitle} />
        <meta name="twitter:description" content={config.description} />
        <meta
          name="twitter:image:src"
          content={`${config.domain}/img/og/1024x512.jpg`}
        />
        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content={config.defaultTitle} />
        <meta name="og:description" content={config.description} />
        <meta
          name="og:image"
          content={`${config.domain}/img/og/1200x630.jpg`}
        />
        <meta name="og:url" content={`http://${config.domain}`} />
        <meta name="og:site_name" content={config.defaultTitle} />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="website" />
        {/* facebook pixel code */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css" /> */}
      </>
    </Head>
  );
};

export default ClientLayout;
