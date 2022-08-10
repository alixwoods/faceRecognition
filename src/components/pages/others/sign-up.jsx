import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Routes } from "../../../api/api";
import axios from "axios";

function SignUp(props) {
  useEffect(() => {
    document.querySelector("body").classList.add("loaded");
  }, []);

  function signUp(e) {
    e.preventDefault();
    props.history.push(`${process.env.PUBLIC_URL}/`);
  }

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const Login = () => {
    setLoading(true);
    axios
      .post(
        Routes.Login,
        {
          userName: UserName,
          password: Password,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          localStorage.setItem("token", res.data.value.response.token);
          var firstName = res.data.value.response.firstName;
          var lastName = res.data.value.response.lastName;
          localStorage.setItem("fullName", firstName + " " + lastName);

          props.history.push("../../");
        } else {
          setError("نام کاربری یا رمز عبور اشتباه است");
        }
        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <section className="body-sign">
      <div className="center-sign">
        <Card className="card-sign">
          <Card.Body style={{ direction: "rtl", textAlign: "right" }}>
            <h2 className="sign-title">ورود</h2>

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
                />
              </Form.Group>

              {/* <Row className="mb-3">
                <Col sm={8}>
                  <Form.Check
                    custom
                    required
                    id="agree"
                    label={
                      <>
                        I agree with{" "}
                        <a href="#terms" onClick={(e) => e.preventDefault()}>
                          terms of use
                        </a>
                      </>
                    }
                  />
                </Col>

                <Col sm={4} className="text-right"></Col>
              </Row> */}
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
                }}
                // className="btn-login mt-2"
                // variant=""
                disabled={!UserName || !Password}
                // block
              >
                ورود
              </Button>
              {/* 
              <span className="my-3 line-thru text-center text-uppercase">
                <span>or</span>
              </span> */}
              {/* 
              <div className="mb-1 text-center">
                <Button href="#" className="mb-3 mx-1" variant="facebook">
                  Connect with <i className="fab fa-facebook-f"></i>
                </Button>
                <Button href="#" className="mb-3 mx-1" variant="twitter">
                  Connect with <i className="fab fa-twitter"></i>
                </Button>
              </div> */}

              {/* <p className="text-center">
                Already have an account ?{" "}
                <Link to={`${process.env.PUBLIC_URL}/pages/sign-in`}>
                  Sign In!
                </Link>
              </p> */}
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

export default React.memo(withRouter(SignUp));
