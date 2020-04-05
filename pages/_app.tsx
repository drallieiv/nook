/** @jsx jsx */
import React, { useState } from "react";
import Head from "next/head";
import { Global, jsx, css } from "@emotion/core";
import emotionReset from "emotion-reset";
import { TiHomeOutline } from "react-icons/ti";
import { IoIosMenu } from "react-icons/io";
import { FaReddit, FaDiscord } from "react-icons/fa";
import { colors, fonts } from "@maael/temtem-theme";
import NavItem from "../components/primitives/NavItem";
import HeaderBar from "../components/primitives/HeaderBar";
import AuthBlock from "../components/primitives/AuthBlock";
import HideOnMobile from "../components/primitives/HideOnMobile";
import HideOnDesktop from "../components/primitives/HideOnDesktop";
import OverlayMenu from "../components/primitives/OverlayMenu";
import useFirstSync from "../components/hooks/useFirstSync";
import { colors as nookTheme } from "../util/theme";

export default function App({ Component, pageProps }) {
  useFirstSync();
  const [overlay, setOverlay] = useState(false);
  return (
    <div css={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta httpEquiv="content-language" content="en-gb" />
        <meta name="theme-color" content={colors.uiBgGradientStart} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Matthew Elphick" />
        <meta
          name="description"
          content="A website to track your collections in Animal Crossing: New Horizons!"
        />
        <meta property="og:site_name" content="Nook Services" />
        <meta property="og:title" content="Nook Services" />
        <meta
          property="og:description"
          content="A website to track your collections in Animal Crossing: New Horizons!"
        />
        <meta
          property="og:image"
          content="https://nook.services/social-preview.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nook.services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Nook Services" />
        <title>Nook Services</title>
      </Head>
      <Global
        styles={css(`
          ${emotionReset.styles}

          html {
            min-height: 100vh;
          }

          body {
            background-color: ${nookTheme.blueLight};
            color: #FFFFFF;
            font-family: ${fonts.default.fontFamily};
            min-height: 100vh;
          }
        `)}
      />
      <div
        css={{
          backgroundColor: nookTheme.blueDark,
          padding: 5,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          css={{ flex: 1, height: 1, backgroundColor: nookTheme.blueLight }}
        ></div>
        <div css={{ padding: "0px 5px" }}>Nook Services</div>
        <div
          css={{ flex: 1, height: 1, backgroundColor: nookTheme.blueLight }}
        ></div>
      </div>
      <HeaderBar
        style={{
          padding: "0 20px 10px 20px",
          "@media (min-width: 800px)": { padding: 0 }
        }}
      >
        <React.Fragment>
          <HideOnMobile>
            <>
              <NavItem url="/" exact>
                <TiHomeOutline />
              </NavItem>
              <NavItem url="/collections">Collections</NavItem>
              <NavItem url="/custom-designs">Custom Designs</NavItem>
              <NavItem url="/items">Items</NavItem>
              <NavItem url="/events">Events</NavItem>
              <NavItem url="/users">Users</NavItem>
            </>
          </HideOnMobile>
          <HideOnDesktop style={{ flex: 1 }}>
            <div onClick={() => setOverlay(true)}>
              <IoIosMenu size={40} />
            </div>
          </HideOnDesktop>
          {overlay ? <OverlayMenu onClose={() => setOverlay(false)} /> : null}
          <AuthBlock />
        </React.Fragment>
      </HeaderBar>
      <div css={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
      <div
        css={{
          backgroundColor: nookTheme.blueDark,
          color: nookTheme.blueLight,
          padding: 5,
          textAlign: "center",
          marginTop: 10,
          fontSize: 14
        }}
      >
        Made by{" "}
        <a
          css={{
            color: nookTheme.offWhite,
            textDecoration: "none",
            marginRight: 5,
            marginLeft: 2
          }}
          href="https://reddit.com/user/maael"
        >
          <FaReddit style={{ marginRight: 2, position: "relative", top: 3 }} />
          maael
        </a>
        <a
          css={{ color: nookTheme.offWhite, textDecoration: "none" }}
          href="https://discordapp.com/"
        >
          <FaDiscord style={{ marginRight: 2, position: "relative", top: 3 }} />
          maael#2482
        </a>
        <div css={{ fontSize: 10 }}>
          Nook Services is not endorsed by Nintendo and does not reflect the
          views or opinions of Nintendo or anyone officially involved in
          producing or managing Animal Crossing. Animal Crossing is a trademark
          or registered trademark of Nintendo.
        </div>
      </div>
    </div>
  );
}
