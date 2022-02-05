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
          href={`/img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/img/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/img/favicon-16x16.png`}
        />
        {/* <link rel="manifest" href={`${config.domain}/img/site.webmanifest`} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* Search Engine */}
        <meta name="description" content={config.description} />
        <meta name="image" content={`/img/og/1200x630.jpg`} />
        {/* Schema.org for Google */}
        <meta itemProp="name" content={config.defaultTitle} />
        <meta itemProp="description" content={config.description} />
        <meta
          itemProp="image"
          content={`/img/og/1200x630.jpg`}
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={config.defaultTitle} />
        <meta name="twitter:description" content={config.description} />
        <meta
          name="twitter:image:src"
          content={`/img/og/1024x512.jpg`}
        />
        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content={config.defaultTitle} />
        <meta name="og:description" content={config.description} />
        <meta
          name="og:image"
          content={`/img/og/1200x630.jpg`}
        />
        <meta name="og:url" content={`http://`} />
        <meta name="og:site_name" content={config.defaultTitle} />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="website" />
        {/* facebook pixel code */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </>
    </Head>
  );
};

export default ClientLayout;
