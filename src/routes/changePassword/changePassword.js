import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import useStylee from "../../components/Styles";
import Breadcrumb from "../../components/common/breadcrumb";


import axios from "axios";
import { Routes } from "../../api/api";
// import "./styles.scss";

import { withCardActions } from "../../components/hoc/index";
import $ from "jquery";
import Loading from "../../components/Loading/Example";
import Select from "react-select";
import { RefreshToken } from "../ref";
import { createBrowserHistory } from "history";

const CardWithActions = withCardActions(Card);

function ChangePassword(props) {
  const [search, setSearch] = useState("");
  const [tableRef, setTableRef] = useState(null);
  const [table, settable] = useState("");
  const [errors, setErrors] = useState({
    typeRegister: "",
    firstName: "",
    lastName: "",
    date: "",
    certificatePlace: "",
    sacrificeTypeId: "",
    sacrificeRelId: "",
    certificateNumber: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    mobileNumber: "",
    email: "",
    nationalCode: "",
    password: "",
    repeatPass: "",
    sacrificeFileNumber: "",
    faxNumber: "",
  });
  const history = createBrowserHistory();

  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [modal, setModal] = useState(-1);

  function openModal(index) {
    setModal(index);
  }

  function closeModal() {
    setModal(-1);
  }
  const classes = useStylee();
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setloading] = useState(false);
  const [View, setView] = useState(false);

  useEffect(() => {
    $("#pass")
      .focus(function() {
        $("#password-strength").css({
          height: "7px",
        });
      })
      .blur(function() {
        $("#password-strength").css({
          height: "0px",
        });
      });
  }, []);

  function passwordCheck(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;

    if (password.match(/(?=.*[0-9])/)) strength += 1;

    if (password.match(/(?=.*[a-z])/)) strength += 1;

    if (password.match(/(?=.*[A-Z])/)) strength += 1;
    displayBar(strength);
  }

  function CheckPass() {
    if (ConfirmPass === password) {
      setPassword(ConfirmPass);
      setButtonActive(true);
    }
    if (ConfirmPass !== password) {
      setButtonActive(false);
      setTextPass("رمز عبور مطابقت ندارد");
      setb(false);
    } else {
      setTextPass("");
      setb(true);
    }
  }

  function displayBar(strength) {
    switch (strength) {
      case 1:
        seta(false);
        $("#password-strength span").css({
          width: "30%",
          background: "#de1616",
        });
        break;

      case 2:
        seta(false);

        $("#password-strength span").css({
          width: "50%",
          background: "#de1616",
        });
        break;

      case 3:
        seta(false);

        $("#password-strength span").css({
          width: "75%",
          background: "#FFA200",
        });
        break;

      case 4:
        seta(true);
        $("#password-strength span").css({
          width: "100%",
          background: "#06bf06",
        });
        break;
      default:
        return;
    }
  }
  const [Text, setText] = useState("");
  const [TextPass, setTextPass] = useState("");
  const [ButtonActive, setButtonActive] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [fillField, setFillField] = useState(false);
  const [a, seta] = useState(false);
  const [b, setb] = useState(false);
  var md5 = require("md5");
  var str = md5(ConfirmPass);
  var res = str.toUpperCase();

  const [passwordOld, setPasswordOld] = useState("");

  var OldPass = md5(passwordOld);
  var resOld = OldPass.toUpperCase();

  const [error, setError] = useState("");
  const ChangePassword = () => {
    setloading(true);
    axios
      .post(
        Routes.ChangePassword,
        {
          userId: 0,
          oldPassword: passwordOld,
          newPassword: ConfirmPass,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setloading(false);
        if (res.data.responseCode === 200) {
          setError("تغییر رمز عبور با موفقیت انجام شد.");
          setTimeout(() => {
            props.history.push(`/`);
          }, 3000);
        } else {
          setError(res.data.message);
        }
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ChangePassword();
            }
          }
        }
      });
  };
  return (
    <>
      <Breadcrumb current="تغییر رمز عبور" />
      <section className="media-gallery">
        <Form action="#" method="get" onSubmit={searchMedia}>
          <div
            className="inner-body mg-main ml-0"
            style={{ marginTop: "-160px" }}
          >
            <Row style={{ marginBottom: "20px" }}>
              <Col>
                <CardWithActions
                  collapsed={View}
                  dismissible={false}
                  collapsible={false}
                >
                  <Card.Header
                    // onClick={() => setView(!View)}
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    <Card.Title> </Card.Title>
                  </Card.Header>

                  <Card.Body style={{ direction: "rtl" }}>
                    <Row>
                      <Form.Group as={Col} lg={12}></Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setPasswordOld(e.target.value)}
                          value={passwordOld}
                          type="password"
                          placeholder="رمز عبور قدیمی"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          placeholder="رمز عبور"
                          // style={{
                          //   // height: 40,
                          //   // border: "1px solid rgb(118, 118 , 118)",
                          //   // borderRadius: 2,
                          // }}
                          onKeyUp={(e) => {
                            passwordCheck(e.target.value);
                          }}
                          type="password"
                          id="pass"
                          data-strength
                          className={"form-control input-lg"}
                          name="password"
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                          id="password-strength"
                          //  className={"strength"}
                          style={{
                            height: "0px",
                            width: "100%",
                            background: "#ccc",
                            marginTop: "-7px",
                            borderBottomLeftRadius: "4px",
                            borderBottomRightRadius: "4px",
                            overflow: "hidden",
                            transition: "height 0.3s",
                          }}
                        >
                          <span
                            style={{
                              width: "0px",
                              height: "7px",
                              display: "block",
                              transition: "width 0.3s",
                              backgroundColor: "#06bf060",
                            }}
                            // style={{
                            //   width: "0",
                            //   backgroundColor: "#06bf060",
                            // }}
                          ></span>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        {/* <span style={{ color: fillField ? "red" : "#3c4b64" }}>
    تکرار رمزعبور * :
  </span> */}
                        <Form.Control
                          placeholder="تکرار رمزعبور"
                          // style={{
                          //   height: 40,
                          //   border: "1px solid rgb(118, 118 , 118)",
                          //   borderRadius: 2,
                          // }}
                          type="password"
                          id="confirm"
                          data-strength
                          className={"form-control input-lg"}
                          name="confirm"
                          onBlur={() => CheckPass()}
                          autoComplete="current-password"
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <div id="password-strength" className={"strength"}>
                          <span
                            style={{
                              width: "0",
                              backgroundColor: "#06bf060",
                            }}
                          ></span>
                        </div>
                      </Form.Group>

                      {/* </div> */}

                      <div
                        style={{
                          color: "red",
                          width: "100%",
                          textAlign: "right",
                          paddingRight: 40,
                          marginTop: "20px",
                        }}
                      >
                        {TextPass}
                      </div>

                      {
                        <div
                          style={{
                            color:
                              error === "تغییر رمز عبور با موفقیت انجام شد."
                                ? "green"
                                : "red",
                            width: "100%",
                            textAlign: "right",
                            paddingRight: 40,
                            marginTop: "20px",
                          }}
                        >
                          {error}
                        </div>
                      }

                      <Col
                        lg={7}
                        xl={12}
                        style={{ textAlign: "right", marginTop: "10px" }}
                      >
                        <Button
                          style={{
                            width: "100px",
                            backgroundColor: "#4BB543	",
                            margin: "0px 10px",
                            fontFamily: "DIROOZ-FD",
                          }}
                          onClick={() => {
                            setButtonActive(false);
                            ChangePassword();
                          }}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
                          disabled={
                            ButtonActive === false || !passwordOld
                              ? true
                              : false
                          }
                        >
                          ثبت
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </CardWithActions>
              </Col>
            </Row>
          </div>
        </Form>
      </section>

      {loading === true ? <Loading /> : null}
    </>
  );
}

export default ChangePassword;
