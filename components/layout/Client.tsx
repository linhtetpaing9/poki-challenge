import React, { FC, ReactNode, useState } from "react";
import { Col, Layout, Menu, Row } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import config from "../../customize/config";
import Head from "next/head";
import Router from "next/router";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const ClientLayout: FC<ReactNode> = ({ children }) => {
  return (
    <Layout id="client__layout">
      <MetaTag />
      <Header>
        <div className="main__header" onClick={() => Router.push("/")}>
          <Row justify="center" align="middle">
            <h1>TCG Marketplace</h1>
          </Row>
          <Row justify="center" align="middle">
            <div className="logo"/>
          </Row>
        </div>
      </Header>
      <Content
        className="site-layout"
      >
        <div
          className="site-layout-background"
        >
          {children}
        </div>
      </Content>
    </Layout>
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
      </>
    </Head>
  );
};

export default ClientLayout;
