import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { toast } from "react-toastify";
import useStylee from "../components/Styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Breadcrumb from "../components/common/breadcrumb";
import AddIcon from "@mui/icons-material/Add";
import PtTable from "../components/features/elements/table";
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
import Select from "react-select";

import { Routes } from "../api/api";

import Pagination from "@material-ui/lab/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import { getMedia } from "../api";
import { getCroppedImageUrl } from "../utils";
import { days, months, newYears } from "../components/date";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import moment from "moment-jalaali";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker2";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
// import "./myStyles.css";
import { RefreshToken } from "./ref";
import { call } from "file-loader";

const CardWithActions = withCardActions(Card);
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

const useStyles = makeStyles(styles);

function LoanCalculate(props) {
  const classes = useStyles();

  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const [search, setSearch] = useState("");
  const [tableRef, setTableRef] = useState(null);
  const [table, settable] = useState("");
  const [tableLoan, settableLoan] = useState("");
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
  function closeModal() {
    setModal(-1);
  }
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };


  const [viewModal, setViewModal] = useState("");
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        date: table[i].dueDate,
        baseAmount: table[i].baseAmount?table[i].baseAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","):null,
          benefitAmount: table[i].benefitAmount?table[i].benefitAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","):null,
          totalAmount: table[i].totalAmount?table[i].totalAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","):null,
      });
    }
    return items;
  };

  const products = productsGenerator(table);

  const columns = [
    {
      dataField: "id",
      text: "ردیف",
    },
    {
      dataField: "date",
      text: "تاریخ سر رسید",
    },

    {
      dataField: "baseAmount",
      text: "اصل بدهی (ریال)",
    },
    {
      dataField: "benefitAmount",
      text: "سود اقساطی (ریال)",
    },
    {
      dataField: "totalAmount",
      text: "مبلغ قسط (ریال)",
    },
  ];

  const thousnads = (input) => {
    var valArr = [];
    var val = input.value;
    val = val.replace(/[^0-9\.]/g, "");

    if (val != "") {
      valArr = val.split(".");
      valArr[0] = parseInt(valArr[0], 10).toLocaleString();
      val = valArr.join(".");
    }

    input.value = val;
  };
  const [loading, setloading] = useState(false);
  const [AccordianOne, setAccordianOne] = useState(false);
  const [AccordianTwo, setAccordianTwo] = useState(true);

  const [amount, setAmount] = useState("");
  const [monthAmount, setMonthAmount] = useState("");
  const [loanCount, setLoanCount] = useState("");
  const [monthses, setMonthses] = useState("");
  const [benefit, setBenefit] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [TableView, setTableView] = useState("");
  const [Table2View, setTable2View] = useState("");
  const [Months, setMonths] = useState([
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
    {
      label: "7",
      value: "7",
    },
    {
      label: "8",
      value: "8",
    },
    {
      label: "9",
      value: "9",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "11",
      value: "11",
    },
    {
      label: "12",
      value: "12",
    },
  ]);

  const [LoanNumber, setLoanNumber] = useState("");

  const tableGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        Name: table[i].id,
        lastName: table[i].id,
        nationalCode: table[i].id,
        certificateNum: table[i].id,
        certificatePlace: table[i].id,
        birthDate: table[i].id,
        mobileNum: table[i].id,

        desc: (
          <div>
            <img
              // onClick={() => {
              //   setEdit(table[i].id);
              //   setAccordianOne(false);
              //   GetWish(table[i].id);
              // }}
              style={{ cursor: "pointer", width: "40px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAuklEQVRoge3WPQqDQBiE4THkAgGL3P88adLkOrHQQgTzuzPfuMwLYiXsw+K3C6Rj9SQ+DwDXHiBSDBNxX73HI0MuAG4Q7QwTAiWGDZFhFBAJRgWhY5QQKkYNoWEqIBRMFaQ5phICzCf++gaw2/ABxKnd9Z6Uq2AWiFuBuNUN5Pzn9+/G97f9PO6zI0s2B2Y3OxKIW9VTq9k/lh1ZytRqXSBuVU+tbblrZWq5FYhbgbgViFuBuBVISq+bAFgRUo65xlzSAAAAAElFTkSuQmCC"
            />
          </div>
        ),
      });
    }
    return items;
  };
  const addCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

const handleChangSeperator = (event) =>
setAmount(addCommas(removeNonNumeric(event.target.value)))
  const table2 = tableGenerator(tableLoan);

  const columns2 = [
    {
      dataField: "id",
      text: "ردیف",
    },
    {
      dataField: "Name",
      text: "نام خریدار/نماینده",
    },
    {
      dataField: "lastName",
      text: "نام خانوادگی",
    },

    {
      dataField: "nationalCode",
      text: "کد ملی",
    },
    {
      dataField: "certificateNum",
      text: "شماره شناسنامه",
    },

    {
      dataField: "certificatePlace",
      text: "صادره",
    },

    {
      dataField: "birthDate",
      text: "تاریخ تولد",
    },
    {
      dataField: "mobileNum",
      text: "تلفن همراه",
    },
    {
      dataField: "desc",
      text: "جزییات",
    },
  ];

  const [CompanyName, setCompanyName] = useState("");
  const [NationalNum, setNationalNum] = useState("");
  const [AcceptDate, setAcceptDate] = useState("");
  const [CodeNum, setCodeNum] = useState("");
  const [ActivityType, setActivityType] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [Addrress, setAddrress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [AmountModal, setAmountModal] = useState("");
  const [MonthsModal, setMonthsModal] = useState("");
  const [LoanNumberModal, setLoanNumberModal] = useState("");
  const [MonthsesModal, setMonthsesModal] = useState("");
  const [BenefitModal, setBenefitModal] = useState("");
  const [DateModal, setDateModal] = useState("");
  const [calType, setCalType] = useState(true);
  const [growthRate, setGrowthRate] = useState("");
  const Calculate = () => {
    setloading(true);
    axios
      .post(Routes.Calculate, {
        calType: calType,
        totalAmount: amount.replaceAll(",", ""),
        loanCount: loanCount,
        loanInterval: monthses,
        break: monthAmount,
        interestRate: benefit,
        startDate: `${year}/${month}/${day}`,
        annualGrowthRate: growthRate,
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          settable(res.data.value.response);
        } else {
          toast(
            <PNotify
              title=""
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
          setErrorText("خطای داخلی رخ داده است.");
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
              Calculate();
            }
          }
        }
      });
  };

  //=======================================
  const CalculateToXlsFile = () => {
    setloading(true);
    axios
      .post(Routes.CalculateToXlsFile, {
        calType: calType,
        totalAmount: amount.replaceAll(",", ""),
        loanCount: loanCount,
        loanInterval: monthses,
        break: monthAmount,
        interestRate: benefit,
        startDate: `${year}/${month}/${day}`,
        annualGrowthRate: growthRate,
      })
      .then((res) => {
        if (res.data.responseCode === 200) {let {
          fileContents,
          contentType,
          fileDownloadName,
        } = res.data.value.response;
        let link = "data:application/octet-stream;base64," + fileContents;
        var a = document.createElement("a");
        a.href = link;
        a.download = fileDownloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        toast(
        <PNotify
        title="خطا"
        icon="fas fa-exclamation"
        text={res.data.message}
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
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              CalculateToXlsFile();
            }
          }
        }
      });
  };

  return (
    <>
      <Breadcrumb current="محاسبه اقساط" />
      <section className="media-gallery">
        <Form action="#" method="get" onSubmit={searchMedia}>
          <div
            className="inner-body mg-main ml-0"
            style={{ marginTop: "-160px" }}
          >
            <Row style={{ marginBottom: "20px" }}>
              <Col>
                <CardWithActions
                  collapsed={AccordianOne}
                  dismissible={false}
                  collapsible={false}
                >
                  <Card.Header
                    onClick={() => setAccordianOne(!AccordianOne)}
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    <Card.Title>محاسبه اقساط معامله</Card.Title>
                  </Card.Header>

                  <Card.Body style={{ direction: "rtl", padding: "0px 100px" }}>
                    <Row className="cal-types-row">
                      <Form.Group as={Col} lg={12}></Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        {" "}
                        <div style={{ marginBottom: "5px" }}> نوع محاسبه </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 40,
                          }}
                        >
                          <CFormSelect
                            style={{ width: "100%", color: "black" }}
                            onChange={(e) => {
                              setGrowthRate("");
                              setCalType(e.target.value);
                            }}
                            // onFocus={() => setErrors({ ...errors, date: "" })}
                          >
                            <option value={true}>عادی</option>
                            <option value={false}>پلکانی</option>
                          </CFormSelect>
                        </div>
                        {errors.date ? (
                          <span style={{ color: "red" }}>{errors.date}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          {" "}
                          نرخ رشد سالانه (%)
                        </div>
                        <Form.Control
                          onChange={(e) => setGrowthRate(e.target.value)}
                          value={growthRate}
                          type="tel"
                          maxLength={2}
                          disabled={
                            calType === true || calType === "true"
                              ? true
                              : false
                          }
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} lg={12}></Form.Group>
                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          اصل مبلغ تسهیلات (ریال)
                        </div>

                        <Form.Control
                          onChange={handleChangSeperator}
                          value={amount}
                          type="text"
                          maxLength={15}
                          // placeholder="مبلغ کل (ریال)"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          بازه تنفس (ماه)
                        </div>

                        <Form.Control
                          onChange={(e) => setMonthAmount(e.target.value)}
                          value={monthAmount}
                          type="tel"
                          maxLength={2}
                          // placeholder="تعداد تنقس (ماه)"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        {" "}
                        <div style={{ marginBottom: "5px" }}>تعداد اقساط </div>
                        <Form.Control
                          onChange={(e) => setLoanCount(e.target.value)}
                          value={loanCount}
                          type="tel"
                          maxLength={2}
                          // placeholder="تعداد اقساط"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        {" "}
                        <div style={{ marginBottom: "5px" }}>
                          {" "}
                          فاصله زمانی اقساط (ماه)
                        </div>
                        <Form.Control
                          onChange={(e) => setMonthses(e.target.value)}
                          value={monthses}
                          type="tel"
                          maxLength={2}
                          // placeholder="بازه اقساط (ماه)"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          {" "}
                          نرخ سود سالانه (%)
                        </div>
                        <Form.Control
                          onChange={(e) => setBenefit(e.target.value)}
                          value={benefit}
                          type="tel"
                          maxLength={2}
                          // placeholder="نرخ سود (%)"
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        {" "}
                        <div style={{ marginBottom: "5px" }}> شروع اقساط </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 40,
                          }}
                          className="selects-font"

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

                      <Col
                        lg={7}
                        xl={12}
                        style={{ textAlign: "right", margin: "20px 0px" }}
                      >
                        {/* {edit ? (
                          <Button
                            style={{
                              backgroundColor: "#4BB543",
                              width: "100px",
                              fontFamily: "DIROOZ-FD",
                            }}
                            onClick={() => (edit ? EditWish() : AddWish())}
                            className="mb-1 mt-1 mr-1"
                            variant="primary"
                            disabled={!Title || !goalAmount || !description}
                          >
                            ثبت
                          </Button>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: "#4BB543",
                              width: "100px",
                              fontFamily: "DIROOZ-FD",
                            }}
                            onClick={() => (edit ? EditWish() : AddWish())}
                            className="mb-1 mt-1 mr-1"
                            variant="primary"
                            disabled={
                              !Title ||
                              !goalAmount ||
                              !description ||
                              !ffile ||
                              !PerioritiesId
                            }
                          >
                            ثبت
                          </Button>
                        )} */}

                        <Button
                          style={{
                            width: "100px",
                            fontFamily: "DIROOZ-FD",
                          }}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
                          disabled={
                            !year ||
                            !month ||
                            !day ||
                            !amount ||
                            !loanCount ||
                            !monthses ||
                            !monthAmount ||
                            !benefit
                          }
                          onClick={() => {
                            setTableView("1");
                            Calculate();
                          }}
                        >
                          محاسبه
                        </Button>
                      </Col>
                      {TableView === "1" ? (
                        <Col
                          lg={12}
                          xl={12}
                          style={{ textAlign: "right", marginTop: "10px" }}
                        >
                          <div className="mg-files">
                            <Card className="card-modern">
                              <Card.Body style={{ direction: "rtl" }}>
                                <div
                                  // className="App"
                                  style={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                  }}
                                >
                                  <div className="col-12 txt-al-l">                    <Button
                      className= "mg-l-10"
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        onClick={() => CalculateToXlsFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVElEQVRoge2aP2gUQRTGv5c/mBPEqIgiqE0UolGiYqOCKGIrKGihloYU0drOTqxtrNIJgoXYiIqFCCo2wWsUFEUxCBqI/4hGTbyfxW6SdTK7t3u3e3ccfrBwN+/te983M7szOzOmAgF0SOqTNChpR3gNSnptZnvzzGV5BQK6JW2WtCu8tkjaKWmlN7FZbrklqauWm4BeLdTuXG33e+Ih6ZWkp5Hrdq1kk1BVCLBOQe1u1UJt92txa85Kei5pTNKz8PdjM5t04tXP2oN5IUCnpI0O4d2S1njum5L0IkJ8TNKYmU0XwjIFuoCzkk5J2iap5PGZkFTWv93jlZlVGsYyBQz4Lak7/P9GC2TLkp6a2fu8kgFLJP3MK56kcUlDZnbHWOi0K8zsS45JFiF8s/3OOey4mW0QIXIOHos880VjdeQRsBXwX0iroW2E1DRFyQPuAz8396r2Ioibo7V/iwCrJB10in+Y2a0Y/z4Fk8coHpjZhM8/rmZrnhXHvdeBTqDMYuyOifPI8XsWDoCp8tXNPSkwsA+oOARvePyOegQfqJq8UUJC+3WHYAUYiNg7w9qP4mqq5A0Wsh6YiiMKnHFsXwm+YVpLSOhzwSE7C2wCeoB3ju1cmuQuqtl9PGsRUgLeODEvA8NOWRlIHJuaKiT0O+bE/Ag8ifyvAHtSxEmVLw1qEhL63k2orNHMyetEPUIGgBmPiE/A6szJ60Q0VtYpyqykP57yHknL6iVWFzI8Ix3Aw4SulWq9quldCxhxiN8Lu1QUR9Imd1HN7uOZWQjBoPjNiXkCuOKUvQWWtrKQm068MkFXWwd8d2wX0whJ8kmLTELCmndxOGK/5Nh+Af0tJQRYDrx3iN53fHqBScfnAeD9rmiWkFGHYAXY5fE772m1ky0hBNjP4m+RazEBS8C44/uBYPuhIUKSJnglScNOmXesMLNp4LiChfAo1koqdBl2nsOcorx3kOIQ1xq1rKJEubf/KkrRyHsVpW1a5L+QVkPbCInu6vYWvfUWRV6DooJ9RHVJmlGwGfoZKHQztACMSxqSggFxRNJpNWh7uqgBODpKNuTAQOFCEhJnOcLxUtWPcDRHiA9kO1TzWp5DNS0hxAeafMyp0Bkv/oNn2yU9N7NDeeb6C5skB2OX+BlEAAAAAElFTkSuQmCC"
                        ></img>{" "}
                      </Button>
                      <Button
                      className= "mg-l-10"
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        // onClick={() => CalculateToXlsFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACm0lEQVRoge3YPYsVVxgH8OdEjRHFRA2oiCEmGAUVBCXY2YmFWART2OU7iPkAfoFglwQLXSsRtPGFFEkaCWEjCIqiiIhRglhYKPiuvxR7dJf17s3dmXncG9l/81zOy//lzNyZMydiFsOF0q8TknRPRcSeUsrTrgg/6IpomtgVESfx0TtRU5HBWfE7FnXJ31c0gxN3a/0NC7vUmFI0gxPrcLv+PofFXer0FM3ixOe4UZvOY1mXWj1FszjxGa7X5gv4tEu9nqJZnFiBy7XrClZ2qfnOgtT25bhYu69iVbpoFieW4q865CbWpItmceIT/FmH3cKX6aJZnPgYf9Shf2NtumgWJxbi1zr8Ljb2Gz/QprGU0nfcdNBiYe6VUpZP1fl/CtLXx9ympE3RZFEGCT9T2/jOkRoEizEvU+M1UoJgLo5FxP2IuIMtGTrTMdTo8YsdderzWk9k+8i6tVbXeqvWdi+0AZAV5FqtX9T6JEnnDbKCjEbEwxh/T11K0nmDlCCllGcRcWRC0+kMnYHRZq+FzcbRd5/UhY/M98hXE37/iDmJWv3R8oocrtNf1rp/Jny0IsB83McrfIvHeIG9WT6yNo3fRcSSiBgtpRzH/IgYiYgjxk4W50TEtohYERGPIuJCRBwspTxIcdPkiuBDY5+osAtfY5/xk8WpcKZLH10E+b5Oe4Z7PQw/79EG/wxNEGzEg0kGr+IgdmOlsTOsn2rQiTgw40GwHb8Y+3O/XvURbO0zZyl24hus78JHYwIswNFJK/sUmxqLNvDRmgCH3rrT+aGxYEMfrQnwcFKIUSxoLNjQR2sC/DwhxFksaSzWwkdrAhRsxYbGIh34yCfoCIP4mD0OGjbMBhk2vDdBBvoeGYYn13/hvbkisxg2/Au4PRsocjRfJQAAAABJRU5ErkJggg=="
                        ></img>{" "}
                      </Button>
                      {/* <Button
                                            className=""

                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        onClick={() => ChecksReportToCsvFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACwklEQVRoge2Zy0tVURTGv6XRS7M3JtHDLnXLjIiERiXRqIhG/RXSpEEN8x/wv2jWpIgmFdag6yMMlCIrQvRmlIkg5MAe1K/BXRevF71ePfvoSc4Hl7VZe+31re889tl7XylFsmCVOgFi4n0k6bqZ/QyVsCZUomXiqqT7wOZVYcMRR07Hc6A+ZP6KpHHkBCbcPgPqQnIsShpHTiALjHs7BzSE5FmQNK6cwGFgxF2vgN0huRYkjSsncBD46O5BYE9IvgVJ48oJ7APeetcw0BSSc9WEuL8ReO3d74H9sZPGlRPYBQx4yCjQHDtpXDmBHUC/h+WBTOykceUEtgO9HvoJOBo7aVw5gTqg28MngNZK8VUtGs2sYtxyEOHCTJpZ42Kd/5OQinVsWGnSlWIlF6Ua8Wu1jA+OVEjSkApJGoLNWkCNpDOSGiS9MbMpwCRlJB2Q9EHSD0nNkmbNbNjHZSXVS8qb2VSoesqLq/YrfAp4xxzu+Jqpu8SXB855e7JkbHFj1R61jkhCvODPHvoY6ATOAl3uewrcAm4DG4FZ9+8FtgB/gF/A1rUWctPDXvjjVfTn3N9SFl/0twOnvf0yah0hXvZLbu+a2d8S/5jbLubvxfvctkg67u3eqEWEEFLcyeXL/J2SpiRdljQItLm/WPQJSVlv90QtIoSQ327nzYBmNiKpTdKACrPWQ38P+j3kmKQj3k7EHRl3my3vMLO8pPOShiQ1SbpgZl8ljaogJCNpzMy+RC0ihJCc2w5KjnKAWknyg+pv7p5x2yfpkAqPV+THaklUOWtto3BQADBNYb99DXhCYbs65H3DwCYfc4M5dISoI/IdMbMZSRclPZBUK6lV0k5J3yWdVGEyuCfpSsnfCD2Spv2XK88ZHJE/RKtYx7pZNKZCkoZUSNKQCkkaUiFJQyokaajqOCgJ662lsG7uSIqk4R/3lgp8i7UwQwAAAABJRU5ErkJggg=="
                        ></img>
                      </Button> */}
                      </div>
                                  <BootstrapTable
                                    // id="terminal"
                                    // ref={ref}
                                    bootstrap4
                                    keyField="id"
                                    data={products}
                                    columns={columns}
                                    // pagination={paginationFactory({ sizePerPage: 5 })}
                                  />
                                </div>

                                <div
                                  className="col-md-7"
                                  style={{ marginTop: 20, direction: "ltr" }}
                                >
                                  <Pagination
                                    count={Math.ceil(countPage)}
                                    page={page}
                                    onChange={handleChange}
                                    className={classes.root}
                                  />
                                </div>
                              </Card.Body>
                            </Card>
                          </div>

                         
                        </Col>
                      ) : null}
                    </Row>
                  </Card.Body>
                </CardWithActions>
              </Col>
            </Row>
          </div>
        </Form>
      </section>

      <Modal
        show={modal === 8}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card>
          <Card.Header>
            <Card.Title>جزییات</Card.Title>
          </Card.Header>
          <Card.Body>
            <Col
              lg={12}
              xl={12}
              style={{
                textAlign: "right",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <Row>
                <Form.Group as={Col} lg={12}></Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    value={AmountModal}
                    placeholder="مبلغ کل (ریال)"
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    value={MonthsModal}
                    placeholder="مدت تنفس (ماه)"
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    value={LoanNumberModal}
                    placeholder="تعداد اقساط"
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    value={MonthsesModal}
                    placeholder="بازه اقساط"
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    value={BenefitModal}
                    placeholder="نرخ سود (%)"
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control value={DateModal} placeholder="تاریخ سود" />
                </Form.Group>
              </Row>
            </Col>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={12} className="text-right">
                <Button
                  style={{
                    width: "100px",
                    backgroundColor: "#f44336",
                    margin: "0px 10px",
                  }}
                  variant="info"
                  onClick={closeModal}
                >
                  بستن
                </Button>
                <Button
                  style={{
                    width: "100px",
                    margin: "0px 10px",
                  }}
                  variant="primary"
                  onClick={closeModal}
                >
                  محاسبه
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Modal>
      {loading === true ? <Loading /> : null}
    </>
  );
}

export default LoanCalculate;
