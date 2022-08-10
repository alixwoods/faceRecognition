import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function FinishToken(props) {
  useEffect(() => {
    document.querySelector("body").classList.add("loaded");
  }, []);
  return (
    <>
      <section
        class="error-container"
        style={{ height: "1000px", marginTop: "0px" }}
      >
        <span style={{ marginTop: "300px" }}>4</span>
        <span style={{ marginTop: "300px" }}>
          <span class="screen-reader-text">0</span>
        </span>
        <span style={{ marginTop: "300px" }}>1</span>
        <div style={{ marginTop: "50px", fontSize: "20px" }}>
          زمان نشست شما به پایان رسیده است
        </div>
        <Button
          style={{
            width: "150px",
            fontFamily: "DIROOZ-FD",
            marginTop: "50px",
          }}
          onClick={() => props.history.push("./signUp")}
        >
          دوباره وارد شوید
        </Button>
      </section>
    </>
  );
}

export default React.memo(withRouter(FinishToken));
