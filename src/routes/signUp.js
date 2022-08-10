import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Routes } from "../api/api";
import axios from "axios";
import BouncingBalls from "react-cssfx-loading/lib/BouncingBalls";

function SignUp(props) {
  useEffect(() => {
    document.querySelector("body").classList.add("loaded");
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
  }, []);

  function signUp(e) {
    e.preventDefault();
    props.history.push(`/`);
  }

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const Login = () => {
    setLoading(true);
    axios
      .post(Routes.Login, {
        userName: UserName,
        password: Password,
        rememberMe: remember,
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          localStorage.setItem("token", res.data.value.response.token);
          var firstName = res.data.value.response.firstName;
          var lastName = res.data.value.response.lastName;
          localStorage.setItem("fullName", firstName + " " + lastName);
          localStorage.setItem("userName", res.data.value.response.userName);
          localStorage.setItem(
            "refreshToken",
            res.data.value.response.refreshToken
          );
          props.history.push(`/`); 
          window.location.reload();
        }else if(res.data.responseCode === 500) {
          setError(res.data.message)
        } else {
          setError("نام کاربری یا رمز عبور اشتباه است");
        }
        setLoading(false);
      })
      .catch((err) => {});
  };
  //===============================================================
  var input = document.getElementById("pass");
  if (input) {
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("signIn").click();
      }
    });
  }
  var md5 = require("md5");
  var str = md5(Password);
  var res = str.toUpperCase();
  return (
    <section className="body-sign" style={{ marginTop: "-30px" }}>
      <div className="center-sign">
        <Card className="card-sign">
          <Card.Body style={{ direction: "rtl", textAlign: "right" }}>
            <div style={{ textAlign: "center", margin: "10px 0px", }}>
              <img
                style={{ width: "70px", height: "auto" }}
                src={"data:image/png;base64,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"}
              />
            </div>
            {/* <h2 className="sign-title">ورود</h2> */}
            <Form onSubmit={signUp}>
              <Form.Group className="form-custom-group mb-3">
                <Form.Label>نام کاربری</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setError("");
                  }}
                  type="text"
                  required
                />
              </Form.Group>

              {/* <Form.Group className="form-custom-group mb-3">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control type="email" required />
              </Form.Group> */}

              <Form.Group className="form-custom-group mb-3">
                <Form.Label>رمز عبور</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  type="password"
                  required
                  id="pass"
                />
              </Form.Group>
              <Form.Group className="form-custom-group mb-3">
                <input
                  onChange={(e) => setRemember(e.target.checked)}
                  type="checkbox"
                  style={{ margin: " 0 5px" }}
                />
                <Form.Label>مرا به خاطر بسپار</Form.Label>
              </Form.Group>
              {error ? (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {error}
                </div>
              ) : null}

              <Button
                onClick={() => Login()}
                // type="submit"
                style={{
                  width: "100%",
                  height: "50px",
                  fontFamily: "DIROOZ-FD",
                  textAlign: "-webkit-center",
                  backgroundColor: "#00a74c",
                }}
                id="signIn"
                disabled={!UserName || !Password || Loading === true}
              >
                {Loading === true ? (
                  <BouncingBalls style={{ width: "15%" }} color="white" />
                ) : (
                  "ورود"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* <p className="text-center text-muted my-3">
          &copy; Copyright 2021. All Rights Reserved.
        </p> */}
      </div>
    </section>
  );
}

export default SignUp;
