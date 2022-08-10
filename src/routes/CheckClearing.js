import React, { useState, useEffect } from "react";
import { Row, Card, Col, Table, Form, Button } from "react-bootstrap";
// import "./myStyles.css";
import {
  CFormSelect,
  CButton,
} from "@coreui/react";
import Pagination from "@material-ui/lab/Pagination";

import Breadcrumb from "../components/common/breadcrumb";
import { TiInputChecked } from "react-icons/ti";
import { RefreshToken } from "./ref";
import { withCardActions } from "../components/hoc/index";
import { createBrowserHistory } from "history";
import { Routes } from "../api/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PNotify from "../components/features/elements/p-notify";
import { toast } from "react-toastify";



const CardWithActions = withCardActions(Card);
const useStyles = makeStyles(styles);
const styles = {
  submit: {
    marginTop: 10,
    // backgroundImage: "linear-gradient(to right, #00e184, #00bc91 29.71%)",
    backgroundColor: "#4CAF50",
    height: 50,
    color: "#fff",
    fontFamily: "DIROOZ",
    marginBottom: 20,
    fontSize: 16,
    "&:hover,&:focus": {
      backgroundColor: "#5bcc5f",
    },
  },

  calendarContainer: {
    fontFamily: "DIROOZ-FD",
    height: 40,
    color: "gray",
    padding: 5,
    width: "100%",
    border: "1px solid #e5e7e9",
    borderRadius: 5,
    fontSize: 15,
    // border: "none",
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#00acc1",
    height: 50,
    color: "#fff",
    fontFamily: "DIROOZ",
    fontSize: 16,
    cursor: "pointer",

    "&:hover,&:focus": {
      backgroundColor: "#00acc1",
    },
  },
};



function CheckClearing() {
  const classes = useStyles();

  const [contractNum, setContractNum] = useState("");
  const [checkId, setCheckId] = useState("");
  const [clDate, setClDate] = useState("");
  const [checksList, setChecksList] = useState([
    "0987070707",
    "0970797007",
    "0977097007",
    "0977090770",
  ]);

  const [checkAmount, setCheckAmount] = useState("10,000,000,000");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [AccordianTwo, setAccordianTwo] = useState(true);
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const [loading, setloading] = useState(false);
  const [countPage, setCountPage] = useState("");

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

  const handleChange = (event, value) => {
    setPage(value);
  };
  function defaultDate() {
    var d = new Date().toLocaleDateString("fa-IR");

    var y = d.split("/")[0];
    var m = d.split("/")[1];
    var day = d.split("/")[2];
    if (m.length == 1) {
      setMonth("0" + fixNumbers(m));
    } else {
      setMonth(fixNumbers(m));
    }
    if (day.length == 1) {
      setMonth("0" + fixNumbers(day));
    } else {
      setMonth(fixNumbers(day));
    }
    setYear(fixNumbers(y));
  }

  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function(str) {
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };
    const [page, setPage] = useState(1);
const[clearedChecks,setClearedChecks]=useState("")
const [ContractChecks,setContractChecks]=useState("")

    const changeCheckState = () => {
      setloading(true);
      axios
        .post(
          Routes.changeCheckState,
          {
            checkId: checkId?checkId:0,
            stateId: 4,
            stateComment: "",
          },
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {

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
          
            setContractNum("")
            setDay("")
            setYear("")
            setMonth("")
            setCheckId("")
            setContractChecks("")
          }else{
            toast(
              <PNotify
                title="خطا!"
                icon="fas fa-exclamation"
                text=""
              />,
              {
                containerId: "bottom-bar",
                className: "notification-warning",
              }
            );
          }

          setloading(false);
        })
        .catch(async (err) => {
          
          if (err.response.status === 401) {
            let ref = await RefreshToken();
            if (ref.result) {
              changeCheckState();
            }
          }
        });
    };
    const GetChecksByContract = () => {
      axios
        .get(Routes.GetChecksByContract, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            contractNumber:contractNum
          },
        })
        .then((res) => {
          if (res.data.responseCode === 200) {
            setContractChecks(res.data.value.response)
          } else {
            setErrorText(res.data.message);
            setTimeout(() => {
              setErrorText("");

            }, 3000);
          }
        })
  
        .catch(async (err) => {


        });
    };
    const getCheckByState = () => {
      setloading(true);
  
      axios
        .get(Routes.getCheckByState, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token"),
            stateId: 4,
            pageSize: 10,
            pageNumber:page,
          },
        })
        .then((res) => {
          if (res.data.responseCode === 200) {
            setClearedChecks(res.data.value.response.checksList)
            setCountPage(res.data.value.response.count / 10);
          } else {
            setErrorText(res.data.message);
          }
          setloading(false);
        })
        .catch(async (err) => {
          if (err.response.status === 401) {
            if (!localStorage.getItem("refreshToken")) {
              history.push(`/#/FinishToken`);
              window.location.reload();
            } else {
              let ref = await RefreshToken();
              if (ref.result) {
                getCheckByState();
              }
            }
          }
        });
    };
    useEffect(() => {
      defaultDate();
    }, []);
  useEffect(()=>{
  getCheckByState()
  },[page])
    const[contractAmount,setContractAmount]=useState("")

  return (
    <>
      <Breadcrumb current={`وصولی اقساط `} />
      <div className="white-div" style={{ paddingTop: "0" }}>
        <Row
          style={{
            direction: "rtl",
          }}
        >
          <div style={{ padding: "0px 5px", width: "100%" }}>
            <CardWithActions
              collapsed={AccordianTwo}
              dismissible={false}
              collapsible={false}
            >
              <Card.Header
                onClick={() => setAccordianTwo(!AccordianTwo)}
                style={{
                  textAlign: "right",
                  cursor: "pointer",
                }}
              >
                <Card.Title> ثبت وصولی جدید</Card.Title>
              </Card.Header>
              <Card.Body
                style={{
                  direction: "rtl",
                  padding: "0px 100px",
                }}
                className="p-10"
              >
                <Form.Group
                  as={Col}
                  lg={12}
                  style={{ textAlign: "right" }}
                  className="order-last"
                >
                  <Row>
                    <div style={{ marginBottom: "5px" }} className="col-6">
                      شماره قرارداد
                      <Form.Control
                        onChange={(e) => setContractNum(e.target.value)}
                        value={contractNum}
                        type="text"
                        maxLength={15}
                        style={{ marginBottom: "10px" }}
                        className=""
                        onBlur={()=>GetChecksByContract()}
                      />
                    </div>
                    <div style={{ marginBottom: "5px" }} className="col-6 p-0">
                      انتخاب چک
                      <CFormSelect
                        style={{
                          color: "black",
                          width: "100%",
                          lineHeight: "2.8em",
                          marginBottom: "10px",
                        }}
                        value={checkId}
                        onChange={(e) =>{ setCheckId(e.target.value)}}
                        className=""
                      >
                        <option>شناسه صیاد</option>
                        {ContractChecks
                          ? ContractChecks.map((ck) => {
                              return (
                                <>
                                  <option value={ck.id}>{ck.sayyadNumber}</option>
                                </>
                              );
                            })
                          : null}
                      </CFormSelect>
                    </div>
                    <div className="error-text">
{errorText}
                    </div>
                  </Row>
                  {/* <Row>
                    <div style={{ marginBottom: "5px" }} className="col-6">
                      تاریخ وصولی
                      <Form.Group
                        as={Col}
                        lg={12}
                        style={{ textAlign: "right", padding: "0" }}
                        className="col-6"
                      >
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
                    </div>

                 
                  </Row> */}
                </Form.Group>
                <div className="col-12 txt-al-r mg-t-10 p-0">
                  <Button
                    style={{
                      width: "100px",
                      backgroundColor: "#4BB543",
                      margin: "0px 10px",
                      fontFamily: "DIROOZ-FD",
                    }}
                    //   onClick={() => {

                    //   }}
                    className="mb-1 mt-1 mr-1"
                    variant="primary"
                    disabled={!contractNum ? true : false}
                    onClick={()=> {changeCheckState();setPage(1);getCheckByState()}}
                  >
                    <TiInputChecked
                      style={{ fontSize: "19px", margin: "0 2px" }}
                    />
                    ثبت
                  </Button>
                </div>
              </Card.Body>
            </CardWithActions>
            {/* <Accordion
              style={{
                direction: "rtl",
                textAlign: "right",
                backgroundColor: "#fff",
                margin: "20px 0px",
                fontFamily: "DIROOZ-FD",
                width: "100%",
              }}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  style={{ fontFamily: "DIROOZ-FD", padding: "0px 6px" }}
                >
                  ثبت وصولی جدید
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ fontFamily: "DIROOZ-FD", color: "black" }}>
                  <Form.Group
                    as={Col}
                    lg={12}
                    style={{ textAlign: "right" }}
                    className="order-last"
                  >
                    <Row>
                      <div style={{ marginBottom: "5px" }} className="col-6">
                        شماره قرارداد
                        <Form.Control
                          onChange={(e) => setContractNum(e.target.value)}
                          value={contractNum}
                          type="text"
                          maxLength={15}
                          style={{ marginBottom: "10px" }}
                          className=""
                        />
                      </div>
                      <div
                        style={{ marginBottom: "5px" }}
                        className="col-6 p-0"
                      >
                        انتخاب چک
                        <CFormSelect
                          style={{
                            color: "black",
                            width: "100%",
                            lineHeight: "2.8em",
                            marginBottom: "10px",
                          }}
                          value={checkId}
                          onChange={(e) => setCheckId(e.target.value)}
                          className=""
                        >
                          <option>انتخاب</option>
                          {checksList
                            ? checksList.map((ck) => {
                                return (
                                  <>
                                    <option>{ck}</option>
                                  </>
                                );
                              })
                            : null}
                        </CFormSelect>
                      </div>
                    </Row>
                    <Row>
                      <div style={{ marginBottom: "5px" }} className="col-6">
                        تاریخ وصولی
                        <Form.Group
                          as={Col}
                          lg={12}
                          style={{ textAlign: "right", padding: "0" }}
                          className="col-6"
                        >
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
                                      <option value={day.id}>
                                        {day.value}
                                      </option>
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
                                      <option value={month.id}>
                                        {month.value}
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
                                      <option value={year.value}>
                                        {year.value}
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
                      </div>

                      <div className="col-6 p-0">
                        مبلغ(ریال)
                        <Form.Group as={Col} lg={12} className="p-0">
                          <Form.Control value={checkAmount} />
                        </Form.Group>
                      </div>
                    </Row>
                  </Form.Group>

                  <div className="col-12 txt-al-r mg-t-10 p-0">
                    <Button
                      style={{
                        width: "100px",
                        backgroundColor: "#4BB543",
                        margin: "0px 10px",
                        fontFamily: "DIROOZ-FD",
                      }}
                      //   onClick={() => {

                      //   }}
                      className="mb-1 mt-1 mr-1"
                      variant="primary"
                      disabled={!contractNum ? true : false}
                    >
                      <TiInputChecked
                        style={{ fontSize: "19px", margin: "0 2px" }}
                      />
                      ثبت
                    </Button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        </Row>
        <div className="col-12 txt-al-c">
          <Table
            style={{ marginTop: "50px", direction: "rtl" }}
            className="buyers-table"
            responsive=""
            bordered
          >
            <thead>
              <tr>
                <th className="text-center">ردیف</th>
                <th className="text-center">شناسه صیاد</th>
                <th className="text-center">تاریخ سررسید </th>
                <th className="text-center">تاریخ موثر </th>
                <th className="text-center">تاریخ وصول </th>
                <th className="text-center">مبلغ(ریال)</th>
                <th className="text-center">صاحب چک</th>
                <th className="text-center">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {clearedChecks?clearedChecks.map((e,index)=>{

                return<>
                <tr>
                <td>{index+1}</td>
                <td>{e.sayyadNumber}</td>
                <td>{e.dueDate}</td>
                <td>{e.effectiveDate}</td>
                <td>{e.effectiveDate}</td>
                <td>{e.amount}</td>
                <td>{e.ownerName}</td>
                <td>وصول شده</td>
              </tr>
                </>
              }):null}
              
            </tbody>
          </Table>
          <Pagination
                          count={Math.ceil(countPage)}
                          page={page}
                          onChange={handleChange}
                          className={classes.root}
                        />
        </div>
      </div>
    </>
  );
}

export default CheckClearing;
