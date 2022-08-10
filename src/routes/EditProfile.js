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
import { toast } from "react-toastify";
import useStylee from "../components/Styles";

import Breadcrumb from "../components/common/breadcrumb";

import PNotify from "../components/features/elements/p-notify";
import { createBrowserHistory } from "history"; 
import {
  CModalBody,
  CCard,
  CCardHeader,
  CModal,
  CModalFooter,
  CTextarea,
  CFormSelect,
  CButton,
} from "@coreui/react";
import axios from "axios";
import { Routes } from "../api/api";

import { days, months, newYears } from "../components/date";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
import { RefreshToken } from "./ref";
const CardWithActions = withCardActions(Card);

function EditProfile(props) {
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
  const [nationalCode, setnationalCode] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [userId, setuserId] = useState("");
  const history = createBrowserHistory();
  const[errorText,setErrorText]=useState("")
  const [error, setError] = useState("");
  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = () => {
    setloading(true);
    axios
      .get(
        Routes.GetProfile,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {

        if(res.data.responseCode===200){
          setloading(false);
          setuserId(res.data.value.response.userId);
          setUserName(res.data.value.response.userName);
          setFirstName(res.data.value.response.firstName);
          setLastName(res.data.value.response.lastName);
          setnationalCode(res.data.value.response.nationalCode);
          setYear(res.data.value.response.birthDate.substr(0, 4));
          var x = res.data.value.response.birthDate.substr(5);
          setMonth(x.substr(0, 2));
          setDay(x.substr(3));
          setphone(res.data.value.response.phone);
          setMobile(res.data.value.response.mobile);
          setemail(res.data.value.response.email);
          setaddress(res.data.value.response.address);
        }
        else{
        setErrorText("خطای داخلی رخ داده است.")
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
              GetProfile();
            }
          }
        }
      });
  };

  const EditPro = () => {
    setloading(true);
    axios
      .post(
        Routes.EditProfile,
        {
          userId: userId,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          nationalCode: nationalCode,
          birthDate: `${year}/${month}/${day}`,
          phone: phone,
          mobile: mobile,
          email: email,
          address: address,
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
          toast(
            <PNotify
              title=""
              icon="fas fa-exclamation"
              text="عملیات با موفقیت انجام شد"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          setTimeout(() => {
            props.history.push(`/`);
          window.location.reload();
          }, 2000);
          
        }else{
          setErrorText("خطای داخلی رخ داده است.")
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
              EditPro();
            }
          }
        }
      });

  };

  const phoneValidation = () => {
    let valid = new RegExp("^(\\+98|0)?9\\d{9}$");
    if (!valid.test(mobile) && mobile !== "") {
      setErrors({
        ...errors,
        mobileNumber: "شماره موبایل وارد شده اشتباه است",
      });
    } else {
    }
  };
  return (
    <>
      <Breadcrumb current="پروفایل" />
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
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
نام                            </div>
                        <Form.Control
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          type="text"
                          maxLength={30}
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
نام خانوادگی                            </div>
                        <Form.Control
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          type="text"
                          maxLength={30}
                          placeholder=""
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
            کد ملی
                            </div>
                        <Form.Control
                          onChange={(e) => setnationalCode(e.target.value)}
                          value={nationalCode}
                          type="tel"
                          maxLength={10}
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
      تاریخ تولد
                            </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 40,
                          }}
                        >
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            onChange={(e) => setDay(e.target.value)}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={day}
                          >
                            <option>روز</option>
                            {days
                              ? days.map((day) => {
                                  return (
                                    <option value={day.value}>{day.label}</option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option>ماه</option>
                            {months
                              ? months.map((month) => {
                                  return (
                                    <option value={month.value}>
                                      {month.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option>سال</option>
                            {newYears
                              ? newYears.map((year) => {
                                  return (
                                    <option value={year.label}>
                                      {year.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                        </div>
                        {errors.date ? (
                          <span style={{ color: "red" }}>{errors.date}</span>
                        ) : null}
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
               شماره تماس
                            </div>
                        <Form.Control
                          onChange={(e) => setphone(e.target.value)}
                          value={phone}
                          placeholder="
                          "
                          type="tel"
                          maxLength={11}
                          // onBlur={phoneValidation}
                          // onFocus={() =>
                          //   setErrors({ ...errors, mobileNumber: "" })
                          // }
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
شماره همراه                            </div>
                        <Form.Control
                          onChange={(e) => setMobile(e.target.value)}
                          value={mobile}
                          placeholder=""
                          type="tel"
                          maxLength={11}
                          onBlur={phoneValidation}
                          onFocus={() =>
                            setErrors({ ...errors, mobileNumber: "" })
                          }
                        />
                        {errors.mobileNumber ? (
                          <div
                            style={{
                              color: "red",
                              textAlign: "right",
                              direction: "rtl",
                            }}
                          >
                            {errors.mobileNumber}
                          </div>
                        ) : null}
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
ایمیل                            </div>
                        <Form.Control
                          onChange={(e) => setemail(e.target.value)}
                          value={email}
                          placeholder=""
                          type="email"
                          maxLength={50}
                          // onBlur={phoneValidation}
                          // onFocus={() =>
                          //   setErrors({ ...errors, mobileNumber: "" })
                          // }
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setUserName(e.target.value)}
                          value={userName}
                          type="text"
                          placeholder="نام کاربری"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
آدرس                            </div>
                        <Form.Control
                          onChange={(e) => setaddress(e.target.value)}
                          value={address}
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>

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
                            EditPro();
                          }}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
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

export default EditProfile;
