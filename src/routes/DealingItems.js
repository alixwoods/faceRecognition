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
import { days, months, newYears } from "../components/date";
import PNotify from "../components/features/elements/p-notify";
import { createBrowserHistory } from "history";
import axios from "axios";
import Select from "react-select";
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
import { Routes } from "../api/api";

import Pagination from "@material-ui/lab/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import moment from "moment-jalaali";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker2";

import { RefreshToken } from "./ref";
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

function DealingItems(props) {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [tableRef, setTableRef] = useState(null);
  const [table, settable] = useState("");
  const [dueDayFrom, setDueDayFrom] = useState("");
  const [dueMonthFrom, setDueMonthFrom] = useState("");
  const [dueYearFrom, setDueYearFrom] = useState("");
  const [dueDayTo, setDueDayTo] = useState("");
  const [dueMonthTo, setDueMonthTo] = useState("");
  const [dueYearTo, setDueYearTo] = useState("");
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
  const [errorText, setErrorText] = useState("");
  const [states, setStates] = useState([]);
  const DealingItemStateDropDown = () => {
    // setloading(true);
    axios
      .get(Routes.DealingItemStateDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // setloading(false);
        setStates(res.data.value.response);

        
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            props.history.push(`/FinishToken`);
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              DealingItemStateDropDown();
            }
          }
        }
      });
  };

  const DealingItemsList = () => {
    setloading(true);
    axios
      .post(
        Routes.DealingItemsList,
        {
          name: NameSearch,
          contractEndDateFrom: "",
          contractDateFrom: dueDayFrom&&dueMonthFrom&&dueYearFrom
            ? `${dueYearFrom}/${dueMonthFrom}/${dueDayFrom}`
            : "",
          contractDateTo: dueDayTo&&dueMonthTo&&dueYearTo
          ? `${dueYearTo}/${dueMonthTo}/${dueDayTo}`
          : "",
          contractEndDateTo: "",
          contractNum: contractNum,
          nationalId: nationalId,
          registerNum: registerNum,
          registerPlace: registerPlace,
          phone: MobileSearch,
          activity: activity,
          fromPrice: fromPrice ? fromPrice : 0,
          toPrice: toPrice ? toPrice : 0,
          stateId: StateId,
          conditionId: "-1",
          divestingMethodId: "0",
          sellTypeId: "-1",
          divestingWayId: "0",
          buyer:buyerName,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            pageSize: 10,
            pageNumber: page,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          setCountPage(res.data.value.response.count / 10);
          settable(res.data.value.response.dealingItemsList);
          DealingItemStateDropDown();
        } else {
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
              DealingItemsList();
            }
          }
        }
      });
  };

  const Synchronization = () => {
    setloading(true);
    axios
      .get(Routes.Synchronization, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          DealingItemsList();
        } else {
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
              Synchronization();
            }
          }
        }
      });
  };

  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: <div style={{ marginTop: "10px" }}>{i + 1}</div>,
        fullName: <div style={{ marginTop: "10px" }}>{table[i].name}</div>,
        state: table[i].stateTitle,
        contractDate: table[i].contractDate,
        contractNum: table[i].contractNum,
        loans: (
          <img
            onClick={() => {
              props.history.push(`/Loans?${table[i].id}`);
            }}
            style={{ cursor: "pointer", width: "30px" }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABAklEQVRoge2WTQrCMBSEJ7XVE+hasbiqhxDxUF1Z72U9hYL4Ay7FM4jPbRc2aKMylPm2bcL7SDIMILhwvo+Ty9L+Ncg7HIar2nmjfw7ySyTChkTYkAgbEmGjNSJxyOJqZajWGV+V8BFSiVpzIiqNbEiEDaUWG0otNiTChlKLDaUWGxJhQ6nFhlKLDYmw0RqRoPj9FnWPeHwqBlFspQMyA7a+PShEXpEe837UwRpABmDfNbfw/U95tdJj3o/iXglnUwD7xNxsNyquvjV0Ik0kADKRphIAkUiIBEAiEioBkKSWS7obwDIDto+7mx/S4vbpHhQn4ioRe24gAZCIoOF1Esw8ATqReXsLxNntAAAAAElFTkSuQmCC"
          />
        ),
        Detail: (
          <img
            onClick={() => {
              props.history.push(`/DealDetail?${table[i].id}`);
            }}
            style={{ cursor: "pointer", width: "30px" }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEk0lEQVRoge2aS2xUVRjH/9+dNwqYoiSUkt7p0NaGmBiXtimJUZMaXBl24laJlFglgbgoh8Zoq9EGGw1bHV1J3Bh8BDXh4YrgBlE6nc5MM1BAUiqCpTN37vlcTO9w5z33wcxo+K3OOfec7/t/cx7z3QfwgPaC3DK0Iy06tByGQRgCeACgCIDNAD+05uofgK8DSBDwOzP9ElBWT13onlx2w7+jQNSkCPoVuRtMrwB4BoBi0b1OxD8BFM1IHE+FxapdLbYC6UqPhUL6xtcJeBPgLXadl0i5CsgPVzy3P728bfqu5dFWB/QuiF3E+BjgsNWxDZJg8P45deKElUENB6ImRTAAnmLCfuva7EDRO368ttgpVhrq3UingdTbW3T4vgXwpCNtlqHzPsaui2FxrW7Peh36FkQPmE8C6HFFm2VoHoTnY90iUbNXrYuRuNiseHCWiHvdFWeZhI9psNbMVD0uu9JjIY+Xf2iDIACgJ0d8Qk2KYLUOVQNZp288Cmd7IktEB0mhraTQViI+BCBr1xgDT/kUnq52veLSyh+x/I1dpwBAxIdmuyemzG39C+MHmWnSiV2AX4ipE9+VtpbNSFd6LETMR505AxTOfV7a5pXKZ07tAspMpSVWFkhIX78PLpxQUvGXzbbm1TxO7QIc8UPuLW0tCkRNiiBBGXPuDADLPWVtOV95mx2IDpTOitdcWUsAXcmdmGmif2EcICWab5B7mPmIG7YBdAZIvgTgS6OheGnls1i38DPTJEu+wpKvrG1yv1vGJSlFs1tYxzvSokPT8SfALqzjZkB6lvFoKiz+Akwzouly538nCABgT8CDYaNmWlrKYCvkOEJiyCiaNjsPuGU/ph6p+EfblzrMbvkAADAeN4qFGWGmdsipLMGEPqNcCISIN7nloC91mF3/9SvTYRTMx+/DTXDsNhuMgsWnHu2LOZA7LVNhn7+NgnmzL7VGiyNuGgXzZp9rjRb7ECNmlE1Li/5ohRhHEC4ZxXuBMM62RIwDdJJnjHIhkICyegogvTWSbJGTucxpo1II5EL35DIYP7dGky1+TESmbhmVov8RUlB2n92uMChqrhcFomeXvgKw2FRFtqCrGuNrc0tRIPHemQzAHzVXlHWI8X7pu5SydLsrPRZap2/4DQ6epFRL4w0cJpTxLNMTpYGU5VqXt03fZXCTXh1Yh5hGK73ZqvrL9S+IY8z86v2VZRX6JKaKfZWuVM1+MxJvAHT+/omyCNM5qS29Ve1y1UBSYbEqtcwIcC+faR00r3H2xfxhVJma9yPx3vdugGgEoHn3xTUKzRNyzyV73r1eq1fdG6tYt0j4GEME/OqeuAZhOqfJ7OCs+k6yXteG7hAvhsU1Xbv5dP5tbrOg6Ir31s56M1HobdV8X2p8BFBmAI5YF9cQcWIanQ2L760MsvXBgJoUQT/kXhAdANBpx0YFFonpgwxwzM4XEI4+4dg+Nxrw+DftlsDLxHjW+iNX0gE+SeAvdG35eK1Tqa4luwNLUZPikYAHw5AY4vxTy+0APQbw+jVXtwG+QUxzIFzSSZ6Rucxpcyr+gP8T/wI89o0spXLNXgAAAABJRU5ErkJggg=="
          />
        ),
        action: (
          <img
            onClick={() => {
              props.history.push(`/Action?${table[i].id}`);
            }}
            style={{ cursor: "pointer", width: "40px" }}
            src="data:image/png;base64,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"
          />
        ),
        failed: (
          <img
            onClick={() => {
              props.history.push(`/Action?${table[i].id}`);
            }}
            style={{ cursor: "pointer", width: "30px" }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACbklEQVRoge2az28SQRTHv28WjDY9E6yUYt2g/XGQG0lPZj3oH6F/hiZWZGqDf0j9FzSaNMRDjenJaNKCQYyALZKeG6NlmefBkhBl6TKw242Zz3Hn8Z333ZnHvEmWEBA3vsqMIjwDcBsACLwtlPuoulhqBjEfBSFqH8iUcLEL8JW/hg5gufnafOlw2nOKaQsCAPV4/dTEC1huCpabAuglgBSr2ONA5vQaWNmXF05meJOI7gF8WUvdclP9t3+tvj5vxWItzTzbYHoe/4En+yvyZFiA54p0Z/CUCA+0TTDtDG6hL3bpG4C3WlrAHIgfdmd5wyvAc0WyDdkex0Qts6FVb9lGkf1H0/daRs4NGxlRI5orESjeOQVS7OdBbFpC422R6fPfrIgxEjWMkahhjEQNY0QXZpVnphyAzsDjDpS6yazyurqhGyHGz89X5QdF5AA4AnCkiJza4uZHwPqlqxv+1hLitd2Uy/UFWbEEOZYgp74gK3ZTLhPxK11ZrV5LgNY+ZeQ7P7HXm4U1ZjF4D0kK5jdLLelU03IPAJZacrWnuAwgoZPPn5w0UOT/dzxG7CTodb/MO9lG0V+s+udJRxE5tbSsLLXkKgBU03LPbspbgrkMIKmTUvg1otSdfk30FJd7isv9mmGmu7qy4f/9Ei7ajULu9O0nACQEc9luFHJMvUu6ulO7WPmFSOwOudwnBcT7SXTNyR41jJGoYZpGXUzTeAamafQba5rGMTFNoy6maTwDc7JHDWMkahgjUWOUkXZoWfiGPL9h8TZC2Aokl0kYkZPngRg/pmJ3lgHGfQBDvzYIDzoEYSt+DHm+eRj88xvbrDG5jp2W8AAAAABJRU5ErkJggg=="
          />
        ),
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
      dataField: "fullName",
      text: "مورد معامله",
    },
    {
      dataField: "state",
      text: "وضعیت",
    },
    {
      dataField: "contractNum",
      text: "شماره قرارداد",
    },
    {
      dataField: "contractDate",
      text: "تاریخ قرارداد",
    },
    // {
    //   dataField: "loans",
    //   text: "اقساط",
    // },
    {
      dataField: "Detail",
      text: "جزییات",
    },
    // {
    //   dataField: "fetch",
    //   text: (
    //     <img
    //       style={{ width: "20px", height: "auto" }}
    //       src="data:image/png;base64,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"
    //     />
    //   ),
    // },
  ];

  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [loading, setloading] = useState(false);
  const [modal, setModal] = useState(-1);

  function closeModal() {
    setModal(-1);
  }
  const GetDealingItem = (nationalId) => { 
    setloading(true);
    axios
      .get(Routes.GetDealingItem, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          nationalId: nationalId,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setModal(9);
        } else {
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
              GetDealingItem();
            }
          }
        }
      });
  };
  const [buyrsNameModal, setbuyrsNameModal] = useState([]);
  const [activityModal, setactivityModal] = useState("");
  const [loanCountModal, setloanCountModal] = useState("");
  const [nationalIdModal, setnationalIdModal] = useState("");
  const [phoneModal, setphoneModal] = useState("");
  const [postalCodeModal, setpostalCodeModal] = useState("");
  const [priceModal, setpriceModal] = useState("");
  const [restPriceModal, setrestPriceModal] = useState("");
  const [registerDateModal, setregisterDateModal] = useState("");
  const [registerNumModal, setregisterNumModal] = useState("");
  const [registerPlaceModal, setregisterPlaceModal] = useState("");
  const [sharesCountModal, setsharesCountModal] = useState("");
  const [stateTitleModal, setstateTitleModal] = useState("");
  const [buyerName, setBuyerName] = useState("");

  const GetDealingFullDetails = (id) => {
    setloading(true);
    axios
      .get(Routes.GetDealingFullDetails, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          id: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setbuyrsNameModal(res.data.value.response.buyers);
          setactivityModal(res.data.value.response.activity);
          setloanCountModal(res.data.value.response.loanCount);
          setnationalIdModal(res.data.value.response.nationalId);
          setphoneModal(res.data.value.response.phone);
          setpostalCodeModal(res.data.value.response.postalCode);
          setpriceModal(res.data.value.response.price);
          setrestPriceModal(res.data.value.response.restPrice);
          setregisterDateModal(res.data.value.response.registerDate);
          setregisterNumModal(res.data.value.response.registerNum);
          setregisterPlaceModal(res.data.value.response.registerPlace);
          setsharesCountModal(res.data.value.response.sharesCount);
          setstateTitleModal(res.data.value.response.stateTitle);

          setModal(9);
        } else {
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
              GetDealingFullDetails(id);
            }
          }
        }
      });
  };

  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    DealingItemsList(page);
  }, [page]);
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

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [NameSearch, setNameSearch] = useState("");
  const [contractNum, setcontractNum] = useState("");
  const [nationalId, setnationalId] = useState("");
  const [registerNum, setregisterNum] = useState("");
  const [registerPlace, setregisterPlace] = useState("");
  const [MobileSearch, setMobileSearch] = useState("");
  const [activity, setactivity] = useState("");
  const [fromPrice, setfromPrice] = useState("");
  const [toPrice, settoPrice] = useState("");
  const [StateId, setStateId] = useState(0);

  return (
    <>
      <Row>
        <Breadcrumb col={10} current="موارد معامله" />
      </Row>
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
                          مورد معامله{" "}
                        </div>
                        <Form.Control
                          onChange={(e) => setNameSearch(e.target.value)}
                          value={NameSearch}
                          type="text"
                          maxLength={30}
                          placeholder=""
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          {" "}
                          از تاریخ{" "}
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
                              setDueDayFrom(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={dueDayFrom}
                          >
                            <option value="">روز</option>
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
                            value={dueMonthFrom}
                            onChange={(e) => {
                              setDueMonthFrom(e.target.value);
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
                            value={dueYearFrom}
                            onChange={(e) => {
                              setDueYearFrom(e.target.value);
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
                          تا تاریخ{" "}
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
                              setDueDayTo(e.target.value);
                            }}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={dueDayTo}
                          >
                            <option value="">روز</option>
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
                            value={dueMonthTo}
                            onChange={(e) => {
                              setDueMonthTo(e.target.value);
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
                            value={dueYearTo}
                            onChange={(e) => {
                              setDueYearTo(e.target.value);
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
                       شماره قرارداد
                        </div>
                        <Form.Control
                          onChange={(e) => setcontractNum(e.target.value)}
                          value={contractNum}
                          type="tel"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                  شناسه ملی
                        </div>
                        <Form.Control
                          onChange={(e) => setnationalId(e.target.value)}
                          value={nationalId}
                          type="tel"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                       شماره ثبت 
                        </div>
                        <Form.Control
                          onChange={(e) => setregisterNum(e.target.value)}
                          value={registerNum}
                          type="tel"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                        محل ثبت
                        </div>
                        <Form.Control
                          onChange={(e) => setregisterPlace(e.target.value)}
                          value={registerPlace}
                          type="text"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                        نام خریدار/نماینده
                        </div>
                        <Form.Control
                          onChange={(e) => setBuyerName(e.target.value)}
                          value={buyerName}
                          type="text"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                       شماره تماس
                        </div>
                        <Form.Control
                          onChange={(e) => setMobileSearch(e.target.value)}
                          value={MobileSearch}
                          type="tel"
                          placeholder=""
                          maxLength={11}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                 حوزه فعالیت
                        </div>
                        <Form.Control
                          onChange={(e) => setactivity(e.target.value)}
                          value={activity}
                          type="text"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          از مبلغ
                        </div>
                        <Form.Control
                          onChange={(e) => setfromPrice(e.target.value)}
                          value={fromPrice}
                          onKeyUp={(e) => thousnads(e.target)}
                          type="tel"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                      <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                  تا مبلغ
                        </div>
                        <Form.Control
                          onChange={(e) => settoPrice(e.target.value)}
                          value={toPrice}
                          onKeyUp={(e) => thousnads(e.target)}
                          type="tel"
                          placeholder=""
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={3}
                        className="align-items-center"
                        style={{
                          fontFamily: "DIROOZ-FD",
                          direction: "rtl",
                          textAlign: "right",
                        }}
                      >
                         <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                     وضعیت
                        </div>
                        <Select
                          style={{
                            fontFamily: "DIROOZ-FD",
                            direction: "rtl",
                            textAlign: "right",
                          }}
                          placeholder="انتخاب"
                          onChange={(e) => {
                            setStateId(e.value);
                          }}
                          options={states}
                        />
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
                          onClick={() => DealingItemsList()}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
                        >
                          جستجو
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
                  <Button
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#26e07f",
                      borderColor: "#26e07f",
                    }}
                    onClick={() => Synchronization()}
                  >
                    همگام‌سازی اطلاعات
                  </Button>
                  {/* <img
                    
                    style={{
                      width: "20px",
                      height: "auto",
                      marginBottom: "30px",
                      marginLeft: "1%",
                      cursor: "pointer",
                    }}
                    col={2}
                    src="data:image/png;base64,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"
                  /> */}
                  <div
                    // className="App"
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
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
          </div>
        </Form>
      </section>

      <Modal
        show={modal === 9}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
        size="lg"
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
                  <div>مورد معامله :</div>
                  <Form.Control value={activityModal} />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <div>شناسه ملی :</div>
                  <Form.Control value={nationalIdModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>شماره همراه :</div>
                  <Form.Control value={phoneModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>کد پستی :</div>
                  <Form.Control value={postalCodeModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>تاریخ ثبت :</div>
                  <Form.Control value={registerDateModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>شماره ثبت :</div>
                  <Form.Control value={registerNumModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>محل ثبت :</div>
                  <Form.Control value={registerPlaceModal} />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>مبلغ معامله (ریال):</div>
                  <Form.Control
                    value={priceModal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>مبلغ باقی مانده (ریال):</div>
                  <Form.Control
                    value={restPriceModal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>تعداد اقساط:</div>
                  <Form.Control
                    value={loanCountModal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>تعداد سهم :</div>
                  <Form.Control
                    value={sharesCountModal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Group>
                <Form.Group as={Col} lg={6}>
                  <div>وضعیت :</div>
                  <Form.Control value={stateTitleModal} />
                </Form.Group>
              </Row>
            </Col>

            <Form.Group as={Col} lg={12}>
              <div>خریداران :</div>
            </Form.Group>
            <table
              className="table table-hover table-outline mb-0 d-none d-sm-table"
              style={{
                fontSize: "12px",
                minWidth: "100%",
                overflowX: "scroll",
              }}
            >
              <thead className="thead-light">
                <tr>
                  <th className="text-center">ردیف</th>
                  <th className="text-center">نوع مشتری</th>
                  <th className="text-center">نام خریدار/نماینده</th>
                  <th className="text-center">کدملی / شناسه ملی</th>
                  <th className="text-center">تاریخ تولد / ثبت</th>
                </tr>
              </thead>
              <tbody>
                {buyrsNameModal
                  ? buyrsNameModal.map((a, index) => {
                      return (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            {a.type === true ? "حقیقی" : "حقوقی"}
                          </td>
                          <td className="text-center">{a.name}</td>{" "}
                          <td className="text-center">{a.nationalId}</td>{" "}
                          <td className="text-center">{a.birthDate}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
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

export default DealingItems;
