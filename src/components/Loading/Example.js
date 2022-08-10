import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";
import "./styles.css";
import BouncingBalls from "react-cssfx-loading/lib/BouncingBalls";

const Loading = () => (
  <Section
    style={{
      position: "fixed",
      zIndex: "999999999",
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      top: 0,
    }}
  >
    {list.map((l) => (
      <Article
        key={l.prop}
        style={{
          position: "fixed",
          top: "400px",
          zIndex: "99999999",
        }}
      >
        {/* <ReactLoading type={l.prop} color="black" /> */}
        <BouncingBalls />

        <Prop style={{ zIndex: "9999", color: "black" }}>{l.name}</Prop>
      </Article>
    ))}
  </Section>
);

export default Loading;
