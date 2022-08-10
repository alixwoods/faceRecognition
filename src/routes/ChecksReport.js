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
import { RefreshToken } from "./ref";
// import "./myStyles.css";
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

function ChecksReport(props) {
  const classes = useStyles();

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

  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");

  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    ReportCheckFun();
    BankDropDown();
    ChecksStateDropDown();
  }, [page]);
  const [banks, setBanks] = useState([]);
  const [BankId, setBankId] = useState("");
  const [CheckValues, setCheckValues] = useState([]);
  const [CheckId, setCheckId] = useState("");

  const [modal, setModal] = useState(-1);

  function closeModal() {
    setModal(-1);
  }
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        ownerName: table[i].ownerName,
        amount: table[i].amount
          .toString()
          .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ","),
        checkNumber: table[i].checkNumber,
        sayyadNumber: table[i].sayyadNumber,
        dueDate: table[i].dueDate,
        effectiveDate: table[i].effectiveDate,
        bankName: table[i].bankName,
        stateTitle: table[i].stateTitle,
        dealingItemName:table[i].dealingItemName,
      });
    }
    return items;
  };
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChangeContractF = (event) =>
    setfromPrice(addCommas(removeNonNumeric(event.target.value)));

  const handleChangeContractT = (event) =>
    setToPrice(addCommas(removeNonNumeric(event.target.value)));
  const products = productsGenerator(table);
  const columns = [
    {
      dataField: "id",
      text: "ردیف",
    },
    {
      dataField: "ownerName",
      text: "صاحب چک",
    },
    {
      dataField: "dealingItemName",
      text: "مورد معامله",
    },
    {
      dataField: "amount",
      text: "مبلغ (ریال)",
    },
    {
      dataField: "checkNumber",
      text: "شماره چک",
    },

    {
      dataField: "sayyadNumber",
      text: "شناسه صیاد",
    },
    {
      dataField: "dueDate",
      text: "تاریخ سررسید",
    },
    {
      dataField: "effectiveDate",
      text: "تاریخ موثر",
    },
    {
      dataField: "bankName",
      text: "عهده",
    },

    {
      dataField: "stateTitle",
      text: "وضعیت",
    },
  ];

  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [loading, setloading] = useState(false);
  const [types, settypes] = useState([
    {
      label: "حقیقی",
      value: false,
    },
    {
      label: "حقوقی",
      value: true,
    },
  ]);
  const [BuyerName, setBuyerName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [Mobile, setMobile] = useState("");
  const [registerNum, setRegisterNum] = useState("");
  const [registerPlace, setregisterPlace] = useState("");
  const [typeBuyer, settypeBuyer] = useState("");
  const [contractNum, setContractNum] = useState("");
  const [typeModal, settypeModal] = useState("");
  const [nameModal, setnameModal] = useState("");
  const [nationalIdModal, setnationalIdModal] = useState("");
  const [birthDateModal, setbirthDateModal] = useState("");
  const [mobileModal, setmobileModal] = useState("");
  const [addressModal, setaddressModal] = useState("");
  const [registerPlaceModal, setregisterPlaceModal] = useState("");
  const [registerNumModal, setregisterNumModal] = useState("");
  const [postalCodeModal, setpostalCodeModal] = useState("");
  const [dealName, setDealName] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toDay, setToDay] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [dealingItemPhone, setDealingItemPhone] = useState("");
  const [dealingItem, setDealingItem] = useState("");
const[ownerName,setOwnerName]=useState("")
  const [activity, setActivity] = useState("");
  const [fromPrice, setfromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [divestigMethods, setDivestigMethods] = useState([]);
  const [divestigMethod, setDivestigMethod] = useState("");
  const [divestigWays, setDivestigWays] = useState([]);
  const [divestigWay, setDivestigWay] = useState("");
  const [dealState, setDealState] = useState("");
  const [conditions, setConditions] = useState("");
  const [condition, setCondition] = useState("");
  const [CheckNum, setCheckNum] = useState("");
  const [SayadNum, setSayadNum] = useState("");
  const [fromDayEffective, setFromDayEffective] = useState("");
  const [fromMonthEffective, setFromMonthEffective] = useState("");
  const [fromYearEffective, setFromYearEffective] = useState("");
  const [toDayEffective, setToDayEffective] = useState("");
  const [toMonthEffective, setToMonthEffective] = useState("");
  const [toYearEffective, setToYearEffective] = useState("");

  //-------------------------------------------------------------
  const ReportCheckFun = () => {
    setloading(true);
    axios
      .post(
        Routes.ChecksReport,
        {
          amountFrom: fromPrice ? fromPrice.toString().replaceAll(",", "") : 0,
          amountTo: toPrice ? toPrice.toString().replaceAll(",", "") : 0,
          dueDateFrom:
            fromYear && fromMonth && fromDay
              ? `${fromYear}/${fromMonth}/${fromDay}`
              : "",
          dueDateTo:
            toYear && toMonth && toDay ? `${toYear}/${toMonth}/${toDay}` : "",
          effectiveDateFrom:
            fromYearEffective && fromMonthEffective && fromDayEffective
              ? `${fromYearEffective}/${fromMonthEffective}/${fromDayEffective}`
              : "",
          effectiveDateTo:
            toYearEffective && toMonthEffective && toDayEffective
              ? `${toYearEffective}/${toMonthEffective}/${toDayEffective}`
              : "",
          checkNumber: CheckNum,
          sayyadNumber: SayadNum,
          bankId: BankId ? BankId : 0,
          ownerId: 0,
          stateId: CheckId ? CheckId : 0,
          ownerName:ownerName,
          dealingItem:dealingItem,

        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            pageNumber: page,
            pageSize: 10,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          settable(res.data.value.response.checksList);
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
              ReportCheckFun();
            }
          }
        }
      });
  };

  const ChecksReportToXlsFile = () => {
    setloading(true);
    axios
      .post(
        Routes.ChecksReportToXlsFile,
        {
          amountFrom: fromPrice ? fromPrice.toString().replaceAll(",", "") : 0,
          amountTo: toPrice ? toPrice.toString().replaceAll(",", "") : 0,
          dueDateFrom:
            fromYear && fromMonth && fromDay
              ? `${fromYear}/${fromMonth}/${fromDay}`
              : "",
          dueDateTo:
            toYear && toMonth && toDay ? `${toYear}/${toMonth}/${toDay}` : "",
          effectiveDateFrom:
            fromYearEffective && fromMonthEffective && fromDayEffective
              ? `${fromYearEffective}/${fromMonthEffective}/${fromDayEffective}`
              : "",
          effectiveDateTo:
            toYearEffective && toMonthEffective && toDayEffective
              ? `${toYearEffective}/${toMonthEffective}/${toDayEffective}`
              : "",
          checkNumber: CheckNum,
          sayyadNumber: SayadNum,
          bankId: BankId ? BankId : 0,
          ownerId: 0,
          stateId: CheckId ? CheckId : 0,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          let {
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
              ChecksReportToXlsFile();
            }
          }
        }
      });
  };

  const ChecksReportToCsvFile = () => {
    setloading(true);
    axios
      .post(
        Routes.ChecksReportToCsvFile,
        {
          amountFrom: fromPrice ? fromPrice.toString().replaceAll(",", "") : 0,
          amountTo: toPrice ? toPrice.toString().replaceAll(",", "") : 0,
          dueDateFrom:
            fromYear && fromMonth && fromDay
              ? `${fromYear}/${fromMonth}/${fromDay}`
              : "",
          dueDateTo:
            toYear && toMonth && toDay ? `${toYear}/${toMonth}/${toDay}` : "",
          effectiveDateFrom:
            fromYearEffective && fromMonthEffective && fromDayEffective
              ? `${fromYearEffective}/${fromMonthEffective}/${fromDayEffective}`
              : "",
          effectiveDateTo:
            toYearEffective && toMonthEffective && toDayEffective
              ? `${toYearEffective}/${toMonthEffective}/${toDayEffective}`
              : "",
          checkNumber: CheckNum,
          sayyadNumber: SayadNum,
          bankId: BankId ? BankId : 0,
          ownerId: 0,
          stateId: CheckId ? CheckId : 0,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          let {
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
              ChecksReportToCsvFile();
            }
          }
        }
      });
  };

  //================================================================================
  const BankDropDown = () => {
    axios
      .get(Routes.BankDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setBanks(res.data.value.response);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
      })

      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              BankDropDown();
            }
          }
        }
      });
  };

  //================================================================================
  const ChecksStateDropDown = () => {
    axios
      .get(Routes.ChecksStateDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setCheckValues(res.data.value.response);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
      })

      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ChecksStateDropDown();
            }
          }
        }
      });
  };

  //=======================================================

  return (
    <>
      <Breadcrumb current="چک‌ها" />
      <section className="media-gallery">
        <Form action="#" method="get" onSubmit={searchMedia}>
          <div
            className="inner-body mg-main ml-0"
            style={{ marginTop: "-160px" }}
          >
            <div style={{ padding: "0px 5px" }}>
              <Accordion
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  backgroundColor: "#fff",
                  margin: "20px 0px",
                  fontFamily: "DIROOZ-FD",
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
                    جستجو ...
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{ fontFamily: "DIROOZ-FD", color: "black" }}
                  >
                    <Row>
                      <Form.Group as={Col} lg={12}></Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          {" "}
                          تاریخ سررسید از{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 37,
                            // padding: "0px 10px",
                          }}
                                                    className="selects-font"

                        >
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            onChange={(e) => {
                              setFromDay(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={fromDay}
                          >
                            <option value="">روز</option>
                            {days
                              ? days.map((day) => {
                                  return (
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={fromMonth}
                            onChange={(e) => {
                              setFromMonth(e.target.value);
                            }}
                          >
                            <option value="">ماه</option>
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
                            value={fromYear}
                            onChange={(e) => {
                              setFromYear(e.target.value);
                            }}
                          >
                            <option value="">سال</option>
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
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          {" "}
                          تاریخ سررسید تا{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            // padding: "0px 10px",
                            justifyContent: "space-between",
                            height: 37,
                          }}
                          className="selects-font"

                        >
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            onChange={(e) => {
                              setToDay(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={toDay}
                          >
                            <option value="">روز</option>
                            {days
                              ? days.map((day) => {
                                  return (
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={toMonth}
                            onChange={(e) => {
                              setToMonth(e.target.value);
                            }}
                          >
                            <option value="">ماه</option>
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
                            value={toYear}
                            onChange={(e) => {
                              setToYear(e.target.value);
                            }}
                          >
                            <option value="">سال</option>
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
                      {/* <Form.Group as={Col} lg={3}>
                        <DatePicker
                          placeholder="تاریخ قرارداد تا"
                          className={classes.calendarContainer}
                          timePicker={false}
                          isGregorian={false}
                          onChange={(value) => setToDate(dateModifier(value))}
                          inputJalaaliFormat="jYYYY/jMM/jDD"
                          //  value={value}
                        />

                      </Form.Group> */}
                       <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                     نام خریدار / نماینده
                        </div>
                        <Form.Control
                          onChange={(e) => setOwnerName(e.target.value)}
                          value={ownerName}
                          type="text"
                          maxLength={30}
                          // placeholder="نام خریدار"
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                         مورد معامله
                        </div>
                        <Form.Control
                          onChange={(e) => setDealingItem(e.target.value)}
                          value={dealingItem}
                          type="text"
                          maxLength={30}
                          // placeholder="نام خریدار"
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          شماره چک
                        </div>
                        <Form.Control
                          onChange={(e) => setCheckNum(e.target.value)}
                          value={CheckNum}
                          type="text"
                          maxLength={30}
                          // placeholder="نام خریدار"
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          شناسه صیاد{" "}
                        </div>
                        <Form.Control
                          onChange={(e) => setSayadNum(e.target.value)}
                          value={SayadNum}
                          type="text"
                          maxLength={30}
                          // placeholder="شناسه ملی"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ قرارداد از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeContractF}
                          value={fromPrice}
                          type="text"
                          // placeholder="مبلغ قرارداد از (ریال)"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ قرارداد تا (ریال)
                        </div>
                        <Form.Control
                          onChange={handleChangeContractT}
                          value={toPrice}
                          type="text"
                          // placeholder="مبلغ قرارداد تا (ریال)"
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          {" "}
                          تاریخ موثر از{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 37,
                            // padding: "0px 10px",
                          }}
                          className="selects-font"

                        >
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            onChange={(e) => {
                              setFromDayEffective(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={fromDayEffective}
                          >
                            <option value="">روز</option>
                            {days
                              ? days.map((day) => {
                                  return (
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={fromMonthEffective}
                            onChange={(e) => {
                              setFromMonthEffective(e.target.value);
                            }}
                          >
                            <option value="">ماه</option>
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
                            value={fromYearEffective}
                            onChange={(e) => {
                              setFromYearEffective(e.target.value);
                            }}
                          >
                            <option value="">سال</option>
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
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          {" "}
                          تاریخ موٍثر تا{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            // padding: "0px 10px",
                            justifyContent: "space-between",
                            height: 37,
                          }}
                          className="selects-font"

                        >
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            onChange={(e) => {
                              setToDayEffective(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={toDayEffective}
                          >
                            <option value="">روز</option>
                            {days
                              ? days.map((day) => {
                                  return (
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={toMonthEffective}
                            onChange={(e) => {
                              setToMonthEffective(e.target.value);
                            }}
                          >
                            <option value="">ماه</option>
                            {months
                              ? months.map((month) => {
                                  return (
                                    <option value={month.value}>
                                      {month.value}
                                    </option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                          <CFormSelect
                            style={{ width: "33%", color: "black" }}
                            value={toYearEffective}
                            onChange={(e) => {
                              setToYearEffective(e.target.value);
                            }}
                          >
                            <option value="">سال</option>
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
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          عهده
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 40,
                          }}
                        >
                          {" "}
                          <CFormSelect
                            style={{
                              color: "black",
                              width: "100%",
                            }}
                            value={BankId}
                            onChange={(e) => setBankId(e.target.value)}
                            className=""
                            id="cellSeven"
                          >
                            <option>انتخاب</option>

                            {banks
                              ? banks.map((ck) => {
                                  return (
                                    <>
                                      <option value={ck.value}>
                                        {ck.label}
                                      </option>
                                    </>
                                  );
                                })
                              : null}
                          </CFormSelect>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          وضعیت
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
                            style={{ width: "100%", color: "black" }}
                            value={CheckId}
                            onChange={(e) => {
                              setCheckId(e.target.value);
                            }}
                          >
                            <option value=""> انتخاب کنید</option>
                            {CheckValues
                              ? CheckValues.map((e) => {
                                  return (
                                    <option value={e.value}>{e.label}</option>
                                  );
                                })
                              : null}
                          </CFormSelect>
                        </div>
                      </Form.Group>
                      <Col
                        lg={7}
                        xl={12}
                        style={{ textAlign: "right", marginTop: "10px" }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#4BB543	",
                            width: "100px",
                            fontFamily: "DIROOZ-FD",
                          }}
                          onClick={() => {
                            ReportCheckFun();
                            setPage(1);
                          }}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
                        >
                          جستجو
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABVElEQVQ4jc3TPWhUQRTF8TOJUYJtCssU9kEhjY2gldhosLKM21jYhy2ChZ2lraY0iJDaRjYQLMRO/GwEC3FLIZJiifwsnMWHvt23gQieZmDm3P/cM9xJ/rWwhE28xBBfMMAdLHbVlz9ga0m2kgyTbCd5n+RUkgtJriUZJblRSnk1S2drOEQfJxr7N3GAR3iC71iZJeY39FvO5nAdn/ACO3iD+WnATXxodtbiOVPf8z726/P8pTHgapLtUsrhJGApZYgrSSRZrjU7k4DLSd5NjPAb+rp2+zbJxTbPXF1/JFnoAja0kKQ1zRj4Mcm5IwDP15p21aH9itNdJJzFCJemmRbxGVsoU3wnsYdB18XBah3ax1ia0NmeX9roBNailTq0+3iKu7iHZzXmABv1R/Vmhc7Xb/gQu3iOB7jc8PSOBJ3x4vUKvf3fQ8fx148Tegu7xwZs6icIuFi5QSXEDwAAAABJRU5ErkJggg=="
                            style={{ marginRight: "2px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="mg-files">
              <Card className="card-modern">
                <Card.Body style={{ direction: "rtl" }}>
                  {table.length > 0 ? (
                    <>
                      {" "}
                      <div
                        // className="App"
                        style={{
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        <div className="col-12 txt-al-l">
                          {" "}
                          <Button
                            className="mg-l-10"
                            style={{
                              marginBottom: "10px",
                              backgroundColor: "#26e07f",
                              borderColor: "#26e07f",
                            }}
                            onClick={() => ChecksReportToXlsFile()}
                          >
                            <img
                              style={{
                                width: "30px",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVElEQVRoge2aP2gUQRTGv5c/mBPEqIgiqE0UolGiYqOCKGIrKGihloYU0drOTqxtrNIJgoXYiIqFCCo2wWsUFEUxCBqI/4hGTbyfxW6SdTK7t3u3e3ccfrBwN+/te983M7szOzOmAgF0SOqTNChpR3gNSnptZnvzzGV5BQK6JW2WtCu8tkjaKWmlN7FZbrklqauWm4BeLdTuXG33e+Ih6ZWkp5Hrdq1kk1BVCLBOQe1u1UJt92txa85Kei5pTNKz8PdjM5t04tXP2oN5IUCnpI0O4d2S1njum5L0IkJ8TNKYmU0XwjIFuoCzkk5J2iap5PGZkFTWv93jlZlVGsYyBQz4Lak7/P9GC2TLkp6a2fu8kgFLJP3MK56kcUlDZnbHWOi0K8zsS45JFiF8s/3OOey4mW0QIXIOHos880VjdeQRsBXwX0iroW2E1DRFyQPuAz8396r2Ioibo7V/iwCrJB10in+Y2a0Y/z4Fk8coHpjZhM8/rmZrnhXHvdeBTqDMYuyOifPI8XsWDoCp8tXNPSkwsA+oOARvePyOegQfqJq8UUJC+3WHYAUYiNg7w9qP4mqq5A0Wsh6YiiMKnHFsXwm+YVpLSOhzwSE7C2wCeoB3ju1cmuQuqtl9PGsRUgLeODEvA8NOWRlIHJuaKiT0O+bE/Ag8ifyvAHtSxEmVLw1qEhL63k2orNHMyetEPUIGgBmPiE/A6szJ60Q0VtYpyqykP57yHknL6iVWFzI8Ix3Aw4SulWq9quldCxhxiN8Lu1QUR9Imd1HN7uOZWQjBoPjNiXkCuOKUvQWWtrKQm068MkFXWwd8d2wX0whJ8kmLTELCmndxOGK/5Nh+Af0tJQRYDrx3iN53fHqBScfnAeD9rmiWkFGHYAXY5fE772m1ky0hBNjP4m+RazEBS8C44/uBYPuhIUKSJnglScNOmXesMLNp4LiChfAo1koqdBl2nsOcorx3kOIQ1xq1rKJEubf/KkrRyHsVpW1a5L+QVkPbCInu6vYWvfUWRV6DooJ9RHVJmlGwGfoZKHQztACMSxqSggFxRNJpNWh7uqgBODpKNuTAQOFCEhJnOcLxUtWPcDRHiA9kO1TzWp5DNS0hxAeafMyp0Bkv/oNn2yU9N7NDeeb6C5skB2OX+BlEAAAAAElFTkSuQmCC"
                            ></img>{" "}
                          </Button>
                          <Button
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
                          </Button>
                        </div>
                        <div className="scrolls-horizontal">

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
                    </>
                  ) : (
                    <>
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          style={{
                            display: "unset",
                            marginTop: "20px",
                          }}
                          src={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABdUlEQVRoge2WQUoDQRBF/w8SL5AI5gpeYjxE0I3xEAFFBBUFVzlFXGkuEQ/hEZJFJhdwwJQLnY10hZl0jymGequBrm7+n+qqaqAlMMUhp/Pz5w1kTKBbZ58ABSCT9+ztNlZDJ/YAANjFBAAQ6BIcp9BwoC0MP4bdVd55IuQC4HEoZp69shQUoeGw/MjmZxIKEGBJkZf+kdzNTmZFKEY1kq/4SOIq0e2LgsAA5HW+pgC4CcXoV4sYNSVsZ0QutaUtNRK+TvtF15Sk2C2g1kiIsrj/IkARUfCf2vla8YdIlBGZ/MyEmruAAoJJCgW1MqLxO9Cih1oMrakRN2INN2INN2KN1hiJHoh1nhHb0J4/VfGMlMT+yVS0JiNuxBretazhXcsabsQa3rWs4V3LGm7EGm7EGm7EGm7EGrUme6p3VRO0JiOqEQGW/ymkIgttQTVCYtqMlt0hqGpSa6Tf29zn6w5EMCIwaEZaZRYEp73+18OedTiV+QZAdFvzhr4+4wAAAABJRU5ErkJggg=="
                          }
                        />
                      </div>
                      <div className="txt-al-c">
                        <p
                          style={{
                            margin: "10px unset",
                          }}
                        >
                          موردی یافت نشد
                        </p>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </Form>
      </section>
      <Modal
        show={modal === 9}
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
                  <div style={{ marginBottom: "5px" }}>نوع :</div>

                  <Form.Control value={typeModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>
                    نام و نام خانوادگی :
                  </div>
                  <Form.Control value={nameModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>کد ملی :</div>
                  <Form.Control value={nationalIdModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>تاریخ تولد :</div>
                  <Form.Control value={birthDateModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>شماره همراه :</div>
                  <Form.Control value={mobileModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>کد پستی :</div>
                  <Form.Control value={postalCodeModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>آدرس :</div>
                  <Form.Control value={addressModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>شماره ثبت :</div>
                  <Form.Control value={registerNumModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div style={{ marginBottom: "5px" }}>محل ثبت :</div>
                  <Form.Control value={registerPlaceModal} />
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
                    backgroundColor: "#f44336	",
                    margin: "0px 10px",
                  }}
                  variant="info"
                  onClick={closeModal}
                >
                  بستن
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

export default ChecksReport;
