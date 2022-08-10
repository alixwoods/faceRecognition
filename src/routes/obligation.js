import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Table, Form, Modal, Button } from "react-bootstrap";
import Breadcrumb from "../components/common/breadcrumb";
import { Tabs, Tab } from "react-bootstrap";
import { days, months, newYears } from "../components/date";
import PNotify from "../components/features/elements/p-notify";
import { toast } from "react-toastify";
import { TbChecklist } from "react-icons/tb";
import axios from "axios";
import { Routes } from "../api/api";
import { createBrowserHistory } from "history";
import { RefreshToken } from "./ref";
import Loading from "../components/Loading/Example";

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
function Obligation() {
  const [yearEltezam, setYearEltezam] = useState("");
  const [year1, setYear1] = useState("");

  const [month1, setMonth1] = useState("");
  const [eltezamPerc, setEltezamPerc] = useState("");
  const [eltezamPerc1, setEltezamPerc1] = useState("");
  const [eltezamList, setEltezamList] = useState([]);
  const [monthlyList, setMonthlyList] = useState("");
  const [loading, setloading] = useState(false);
  const history = createBrowserHistory();
  const [modalP, setModalP] = useState(false);
  const [modalC, setModalC] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  function closeModalP() {
    setModalP(false);
  }
  function closeModalC() {
    setModalC(false);
  }
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

  //=============================================
  const addObligation = () => {
    setloading(true);
    axios
      .post(
        Routes.addObligation,
        {
          year: yearEltezam,
          value: eltezamPerc,
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
          ObligationList();
        } else {
          toast(
            <PNotify
              title="خطا"
              icon="fas fa-exclamation"
              text="خطا در انجام عملیات"
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
              addObligation();
            }
          }
        }
      });
  };
  //=============================================
  const ObligationList = () => {
    setloading(true);
    axios
      .get(Routes.ObligationList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setEltezamList(res.data.value.response);
        } else {
        }

        setloading(false);
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ObligationList();
            }
          }
        }
      });
  };
   //=============================================
   const ObligationListToXlsFile = () => {
    setloading(true);
    axios
      .get(Routes.ObligationListToXlsFile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) { let {
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
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ObligationListToXlsFile();
            }
          }
        }
      });
  };
  //=============================================
  const ObligationListToCsvFile = () => {
    setloading(true);
    axios
      .get(Routes.ObligationListToCsvFile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) { let {
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
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ObligationListToCsvFile();
            }
          }
        }
      });
  };
  //=============================================
  const DeleteObligation = () => {
    setloading(true);
    axios
      .get(Routes.DeleteObligation, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          obligationId:deleteId,
        },
      })
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
          ObligationList()
        } else {
          toast(
            <PNotify
              title="خطا"
              icon="fas fa-exclamation"
              text="خطا در انجام عملیات"
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
              DeleteObligation();
            }
          }
        }
      });
  };
  //=============================================
  const AddInflation = () => {
    setloading(true);
    axios
      .post(
        Routes.AddInflation,
        {
          month: `${year1}/${month1}`,
          value: eltezamPerc1,
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
          InflationList();
        } else {
          toast(
            <PNotify
              title="خطا"
              icon="fas fa-exclamation"
              text="خطا در انجام عملیات"
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
              addObligation();
            }
          }
        }
      });
  };
  //=============================================
  const InflationList = () => {
    setloading(true);
    axios
      .get(Routes.InflationList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setMonthlyList(res.data.value.response);
        } else {
        }

        setloading(false);
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              InflationList();
            }
          }
        }
      });
  };
//=============================================
const DeleteInflation = () => {
  setloading(true);
  axios
    .get(Routes.DeleteInflation, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        inflationId:deleteId,
      },
    })
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
        InflationList()
      } else {
        toast(
          <PNotify
            title="خطا"
            icon="fas fa-exclamation"
            text="خطا در انجام عملیات"
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
            DeleteInflation();
          }
        }
      }
    });
};  
  useEffect(() => {
    ObligationList();
    InflationList()
  }, []);
   //=============================================
   const InflationListToXlsFile = () => {
    setloading(true);
    axios
      .get(Routes.InflationListToXlsFile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) { let {
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
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              InflationListToXlsFile();
            }
          }
        }
      });
  };
    //=============================================
    const InflationListToCsvFile = () => {
      setloading(true);
      axios
        .get(Routes.InflationListToCsvFile, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.responseCode === 200) { let {
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
              window.location.reload()
            } else {
              let ref = await RefreshToken();
              if (ref.result) {
                InflationListToCsvFile();
              }
            }
          }
        });
    };
  //=============================================
  console.log(modalP,"modalPmodalPmodalPmodalP")
  console.log(deleteId,"deleteIddeleteIddeleteIddeleteId")

  return (
    <>
      <Breadcrumb current={`ثبت شاخص`} />

      <Row>
        <Col lg={12}>
          <div
            className="tabs"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <Tabs className="nav-justified">
              <Tab eventKey="نرخ وجه التزام" title="نرخ وجه التزام">
                <Row className=" mg-t-20">
                  <Form.Group as={Col} lg={12}></Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div
                      style={{ padding: "0px 3px" }}
                      className="col-12 grey-form-heading"
                    >
                      {" "}
                      تاریخ اعمال{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        height: 37,
                        // padding: "0px 10px",
                      }}
                    >
                      <CFormSelect
                        style={{ width: "100%", color: "black" }}
                        value={yearEltezam}
                        onChange={(e) => {
                          setYearEltezam(e.target.value);
                        }}
                      >
                        <option value="">سال</option>
                        {newYears
                          ? newYears.map((year) => {
                              return (
                                <option value={year.label}>{year.label}</option>
                              );
                            })
                          : null}
                      </CFormSelect>
                    </div>

                    {errors.date ? (
                      <span style={{ color: "red" }}>{errors.date}</span>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col} lg={4} className="txt-al-r">
                    <div
                      style={{ padding: "0px 3px" }}
                      className="col-12 grey-form-heading"
                    >
                      درصد تورم (%)
                    </div>
                    <Form.Control
                      onChange={(e) => setEltezamPerc(e.target.value)}
                      value={eltezamPerc}
                      type="text"
                      placeholder=""
                      maxLength={3}
                      disabled={!yearEltezam}
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4} className="txt-al-r ">
                    <div
                      style={{
                        padding: "0px 3px",
                        color: "rgba(0,0,0,0)",
                        marginBottom: "2px",
                      }}
                      className="col-12"
                    >
                      {" "}
                      -{" "}
                    </div>
                    <Button
                      style={{
                        width: "97%",
                        backgroundColor: "#4BB543",
                        fontFamily: "DIROOZ-FD",
                      }}
                      variant="primary"
                      onClick={() => addObligation()}
                    >
                      <TbChecklist
                        style={{ fontSize: "19px", margin: "0 2px" }}
                      />
                      ثبت
                    </Button>
                  </Form.Group>
                  <div className="txt-al-c f-s-14 mg-t-20 w-100 p-r-10 p-l-10">
                    وجوه التزام ثبت شده
                    <div className="col-12 txt-al-l">                    <Button
                      className= "mg-l-10"
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        onClick={() => ObligationListToXlsFile()}
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
                        onClick={() => ObligationListToCsvFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACwklEQVRoge2Zy0tVURTGv6XRS7M3JtHDLnXLjIiERiXRqIhG/RXSpEEN8x/wv2jWpIgmFdag6yMMlCIrQvRmlIkg5MAe1K/BXRevF71ePfvoSc4Hl7VZe+31re889tl7XylFsmCVOgFi4n0k6bqZ/QyVsCZUomXiqqT7wOZVYcMRR07Hc6A+ZP6KpHHkBCbcPgPqQnIsShpHTiALjHs7BzSE5FmQNK6cwGFgxF2vgN0huRYkjSsncBD46O5BYE9IvgVJ48oJ7APeetcw0BSSc9WEuL8ReO3d74H9sZPGlRPYBQx4yCjQHDtpXDmBHUC/h+WBTOykceUEtgO9HvoJOBo7aVw5gTqg28MngNZK8VUtGs2sYtxyEOHCTJpZ42Kd/5OQinVsWGnSlWIlF6Ua8Wu1jA+OVEjSkApJGoLNWkCNpDOSGiS9MbMpwCRlJB2Q9EHSD0nNkmbNbNjHZSXVS8qb2VSoesqLq/YrfAp4xxzu+Jqpu8SXB855e7JkbHFj1R61jkhCvODPHvoY6ATOAl3uewrcAm4DG4FZ9+8FtgB/gF/A1rUWctPDXvjjVfTn3N9SFl/0twOnvf0yah0hXvZLbu+a2d8S/5jbLubvxfvctkg67u3eqEWEEFLcyeXL/J2SpiRdljQItLm/WPQJSVlv90QtIoSQ327nzYBmNiKpTdKACrPWQ38P+j3kmKQj3k7EHRl3my3vMLO8pPOShiQ1SbpgZl8ljaogJCNpzMy+RC0ihJCc2w5KjnKAWknyg+pv7p5x2yfpkAqPV+THaklUOWtto3BQADBNYb99DXhCYbs65H3DwCYfc4M5dISoI/IdMbMZSRclPZBUK6lV0k5J3yWdVGEyuCfpSsnfCD2Spv2XK88ZHJE/RKtYx7pZNKZCkoZUSNKQCkkaUiFJQyokaajqOCgJ662lsG7uSIqk4R/3lgp8i7UwQwAAAABJRU5ErkJggg=="
                        ></img>
                      </Button></div>
                    <Table
                      style={{ marginTop: "20px", direction: "rtl" }}
                      className="buyers-table"
                      responsive=""
                      bordered
                    >
                      <thead>
                        <tr>
                          <th className="text-center">ردیف</th>
                          <th className="text-center">وجه التزام(%)</th>
                          <th className="text-center">سال</th>
                          <th className="text-center">حذف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eltezamList.length > 0 ? (
                          eltezamList.map((c, index) => {
                            return (
                              <>
                                <tr className="">
                                  <td className="txt-al-c">{index + 1}</td>
                                  <td className="txt-al-c">{c.value}</td>
                                  <td className="txt-al-c">{c.year}</td>
                                  <td className="txt-al-c">
                                    <img
                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII="
                                      onClick={() => {
                                        setDeleteId(c.id);
                                        setModalP(true);
                                      }}
                                      style={{width:"30px",cursor:"pointer"}}
                                    />{" "}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <tr>
                            <td className="text-center p-0" colSpan="12">
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
                              <p
                                style={{
                                  margin: "10px 0px",
                                }}
                              >
                                موردی یافت نشد
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </Tab>
              <Tab eventKey="شاخص تورم ماهانه" title="شاخص تورم ماهانه">
                <Row className=" mg-t-20">
                  <Form.Group as={Col} lg={12}></Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div
                      style={{ padding: "0px 3px" }}
                      className="col-12 grey-form-heading"
                    >
                      {" "}
                      تاریخ اعمال{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        height: 37,
                        // padding: "0px 10px",
                      }}
                    >
                      <CFormSelect
                        style={{ width: "50%", color: "black" }}
                        value={year1}
                        onChange={(e) => {
                          setYear1(e.target.value);
                        }}
                      >
                        <option value="">سال</option>
                        {newYears
                          ? newYears.map((year) => {
                              return (
                                <option value={year.label}>{year.label}</option>
                              );
                            })
                          : null}
                      </CFormSelect>
                      <CFormSelect
                        style={{ width: "50%", color: "black" }}
                        value={month1}
                        onChange={(e) => {
                          setMonth1(e.target.value);
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
                    </div>

                    {errors.date ? (
                      <span style={{ color: "red" }}>{errors.date}</span>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col} lg={4} className="txt-al-r">
                    <div
                      style={{ padding: "0px 3px" }}
                      className="col-12 grey-form-heading"
                    >
                      شاخص تورم (ریال)
                    </div>
                    <Form.Control
                      onChange={(e) => setEltezamPerc1(e.target.value)}
                      value={eltezamPerc1}
                      type="text"
                      placeholder=""
                      maxLength={3}
                      disabled={!month1 || !year1}
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4} className="txt-al-r ">
                    <div
                      style={{
                        padding: "0px 3px",
                        color: "rgba(0,0,0,0)",
                        marginBottom: "2px",
                      }}
                      className="col-12"
                    >
                      {" "}
                      -{" "}
                    </div>
                    <Button
                      style={{
                        width: "97%",
                        backgroundColor: "#4BB543",
                        fontFamily: "DIROOZ-FD",
                      }}
                      variant="primary"
                      onClick={()=>AddInflation()}
                    >
                      <TbChecklist
                        style={{ fontSize: "19px", margin: "0 2px" }}
                      />
                      ثبت
                    </Button>
                  </Form.Group>
                 
                  <div className="txt-al-c f-s-14 mg-t-10 w-100 p-r-10 p-l-10">
                  <div className="col-12 txt-al-l">                    <Button
                      className= "mg-l-10"
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        onClick={() => InflationListToXlsFile()}
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
                        onClick={() => InflationListToCsvFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACwklEQVRoge2Zy0tVURTGv6XRS7M3JtHDLnXLjIiERiXRqIhG/RXSpEEN8x/wv2jWpIgmFdag6yMMlCIrQvRmlIkg5MAe1K/BXRevF71ePfvoSc4Hl7VZe+31re889tl7XylFsmCVOgFi4n0k6bqZ/QyVsCZUomXiqqT7wOZVYcMRR07Hc6A+ZP6KpHHkBCbcPgPqQnIsShpHTiALjHs7BzSE5FmQNK6cwGFgxF2vgN0huRYkjSsncBD46O5BYE9IvgVJ48oJ7APeetcw0BSSc9WEuL8ReO3d74H9sZPGlRPYBQx4yCjQHDtpXDmBHUC/h+WBTOykceUEtgO9HvoJOBo7aVw5gTqg28MngNZK8VUtGs2sYtxyEOHCTJpZ42Kd/5OQinVsWGnSlWIlF6Ua8Wu1jA+OVEjSkApJGoLNWkCNpDOSGiS9MbMpwCRlJB2Q9EHSD0nNkmbNbNjHZSXVS8qb2VSoesqLq/YrfAp4xxzu+Jqpu8SXB855e7JkbHFj1R61jkhCvODPHvoY6ATOAl3uewrcAm4DG4FZ9+8FtgB/gF/A1rUWctPDXvjjVfTn3N9SFl/0twOnvf0yah0hXvZLbu+a2d8S/5jbLubvxfvctkg67u3eqEWEEFLcyeXL/J2SpiRdljQItLm/WPQJSVlv90QtIoSQ327nzYBmNiKpTdKACrPWQ38P+j3kmKQj3k7EHRl3my3vMLO8pPOShiQ1SbpgZl8ljaogJCNpzMy+RC0ihJCc2w5KjnKAWknyg+pv7p5x2yfpkAqPV+THaklUOWtto3BQADBNYb99DXhCYbs65H3DwCYfc4M5dISoI/IdMbMZSRclPZBUK6lV0k5J3yWdVGEyuCfpSsnfCD2Spv2XK88ZHJE/RKtYx7pZNKZCkoZUSNKQCkkaUiFJQyokaajqOCgJ662lsG7uSIqk4R/3lgp8i7UwQwAAAABJRU5ErkJggg=="
                        ></img>
                      </Button></div>
                    شاخص های ثبت شده
                    
                    <Table
                      style={{ marginTop: "20px", direction: "rtl" }}
                      className="buyers-table"
                      responsive=""
                      bordered
                    >
                       <thead>
                        <tr>
                          <th className="text-center">ردیف</th>
                          <th className="text-center">شاخص تورم(ریال)</th>
                          <th className="text-center">تاریخ</th>
                          <th className="text-center">حذف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyList.length > 0 ? (
                          monthlyList.map((c, index) => {
                            return (
                              <>
                                <tr className="">
                                  <td className="txt-al-c">{index + 1}</td>
                                  <td className="txt-al-c">{c.value}</td>
                                  <td className="txt-al-c">{c.month}</td>
                                  <td className="txt-al-c">
                                    <img
                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII="
                                      onClick={() => {
                                        setDeleteId(c.id);
                                        setModalC(true);
                                      }}
                                      style={{width:"30px",cursor:"pointer"}}
                                    />{" "}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <tr>
                            <td className="text-center p-0" colSpan="12">
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
                              <p
                                style={{
                                  margin: "10px 0px",
                                }}
                              >
                                موردی یافت نشد
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
      <Modal
        show={modalP}
        onHide={closeModalP}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card.Header>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAEEElEQVRYhcWXbWiVZRjHf9d9trlmI8UyfNl2Tns5q6lRKIVRJEkWIydJUn0o6pswAj/4lpvc5JRaCH4poSj6Ek3CmlYoFCVBRIRW2ujseLad1dR8Ia0kx3bO/e/D2Ji6l3PU1v/b8zzX/b9+983F/VwX/M+yfILj6aaYzC1HLo5xq0mFwk4LThqhy/r7v+isbf37hgIs7N00c0BFjcKtBt0NdgnUi3EG7LyJ2aB5wuaBsmYcCkHvHY+6PZgP1wwQ7fHFhUajoc1AANowtZee/f3rw4vfGrwyvrZv8yxlpz2OWCVYBTpmss2dMX8wb4CqPj/fZWgHag12ZQdpTVX7vybbzcj63uY6R2Q7UgPYOwOiMR3z/TkB1PzavIQQ2Qf8EVymIVXe0pVr4qu8evzTGO9i+j6T6V/ZXfnan1fGuNEPlb/5KoI7CPopDLL0epIDJGO+zVn2QWTVBZHiNvRUZFyAeGJDqcvqY4P0xSJbnc+RT6RExbbDgWy9wUM1vXe1jgug4pKdhs1SJLPy5Fz/z2TGtWm/tCbtE7lApKLbfpD0ImhdVbd/9CqAeHdTHPSCEdYny7afyMVUFuaB4rnEAiRjr+zB3H7n9DryIxt3AHKRHcDPnRXug1wNr0WB7Bawupo0a0YAFvZumgn2hKTWXC6O61GqYlsHaB+m50cABiiuB4Iy7rP/MvmITO1gy+KJDaUATlK9jEM3quonVaE7ABRoWskjMFQDi5x0bEqSA8m5/pyhEzgWDQPMF3ZqqgAAhJ1CKhsGKDHjzJQCSKeBm4cBLhBC6VQCmGMGRv8QgOxUMDdnKgEUbI7Jzg4BGH2GYlOVvK7DF5kxH0gAOBG+Alsx1p9qQgUGgIF8AbIlYRnoJhNfAjiT+wR0W21v3X15GWXOHzRnD+QNYK7B4Egi5tMALhnzCbCOgNbma5avoj1+hsEaYXuH3zkAMzzwbFW6+Z5czSIFMx9T0Df5ABTBJpAy2UtvXAbQWe73IjvsiOzMuxZy1J1dTdUYL5mpZXRrNvRfNuRcdi1w/1hdy1jKpwbu6Np4SzYS2Q8cLbjodo/+dllTWt2z9Rkz3gfXmIz6N3Mxn0xzT/qS6YN8ZGJBhIElv0R3XHbtX90Vp/3LEFrA7UpWdKzHPsxea/LK1JaygoKCdkF5wFakov7IlTFjzgXD7bTQd8jWHY/5H/PKLO+q0zxnxquIM2aZhs5oS89YoeNORlVpf68z7UYsNmiT2e5kece3E51ItMfPmGahXnIbMWpBbxeW2MaO2f7ieGsmng2FVfdufRLMGywAzoF9LkgZ4bTBBeFul6nMgtVhPAwSot0Fa05U+uSE/pMCjFK8uykenFvpzJZLFgfNAk0HdwHRJ+OoiU8z4dKBsSag8fQv602oJfbgKhgAAAAASUVORK5CYII=" />
        </Card.Header>
        <Card.Body>
          <>
            <div
              style={{
                width: "100%",
                minHeight: 40,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              آیا از حذف این مورد اطمینان دارید؟
            </div>
          </>
        </Card.Body>

        <Card.Footer>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
            }}
            color="success"
            className="px-4"
            onClick={() => {
              DeleteObligation(deleteId);
              closeModalP();
            }}
          >
            تایید
          </CButton>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "white	",
              margin: "0px 10px",
              border: "solid black 1px",
            }}
            color="black"
            className="px-4"
            onClick={() => closeModalP()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>
      <Modal
        show={modalC}
        onHide={closeModalC}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card.Header>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAEEElEQVRYhcWXbWiVZRjHf9d9trlmI8UyfNl2Tns5q6lRKIVRJEkWIydJUn0o6pswAj/4lpvc5JRaCH4poSj6Ek3CmlYoFCVBRIRW2ujseLad1dR8Ia0kx3bO/e/D2Ji6l3PU1v/b8zzX/b9+983F/VwX/M+yfILj6aaYzC1HLo5xq0mFwk4LThqhy/r7v+isbf37hgIs7N00c0BFjcKtBt0NdgnUi3EG7LyJ2aB5wuaBsmYcCkHvHY+6PZgP1wwQ7fHFhUajoc1AANowtZee/f3rw4vfGrwyvrZv8yxlpz2OWCVYBTpmss2dMX8wb4CqPj/fZWgHag12ZQdpTVX7vybbzcj63uY6R2Q7UgPYOwOiMR3z/TkB1PzavIQQ2Qf8EVymIVXe0pVr4qu8evzTGO9i+j6T6V/ZXfnan1fGuNEPlb/5KoI7CPopDLL0epIDJGO+zVn2QWTVBZHiNvRUZFyAeGJDqcvqY4P0xSJbnc+RT6RExbbDgWy9wUM1vXe1jgug4pKdhs1SJLPy5Fz/z2TGtWm/tCbtE7lApKLbfpD0ImhdVbd/9CqAeHdTHPSCEdYny7afyMVUFuaB4rnEAiRjr+zB3H7n9DryIxt3AHKRHcDPnRXug1wNr0WB7Bawupo0a0YAFvZumgn2hKTWXC6O61GqYlsHaB+m50cABiiuB4Iy7rP/MvmITO1gy+KJDaUATlK9jEM3quonVaE7ABRoWskjMFQDi5x0bEqSA8m5/pyhEzgWDQPMF3ZqqgAAhJ1CKhsGKDHjzJQCSKeBm4cBLhBC6VQCmGMGRv8QgOxUMDdnKgEUbI7Jzg4BGH2GYlOVvK7DF5kxH0gAOBG+Alsx1p9qQgUGgIF8AbIlYRnoJhNfAjiT+wR0W21v3X15GWXOHzRnD+QNYK7B4Egi5tMALhnzCbCOgNbma5avoj1+hsEaYXuH3zkAMzzwbFW6+Z5czSIFMx9T0Df5ABTBJpAy2UtvXAbQWe73IjvsiOzMuxZy1J1dTdUYL5mpZXRrNvRfNuRcdi1w/1hdy1jKpwbu6Np4SzYS2Q8cLbjodo/+dllTWt2z9Rkz3gfXmIz6N3Mxn0xzT/qS6YN8ZGJBhIElv0R3XHbtX90Vp/3LEFrA7UpWdKzHPsxea/LK1JaygoKCdkF5wFakov7IlTFjzgXD7bTQd8jWHY/5H/PKLO+q0zxnxquIM2aZhs5oS89YoeNORlVpf68z7UYsNmiT2e5kece3E51ItMfPmGahXnIbMWpBbxeW2MaO2f7ieGsmng2FVfdufRLMGywAzoF9LkgZ4bTBBeFul6nMgtVhPAwSot0Fa05U+uSE/pMCjFK8uykenFvpzJZLFgfNAk0HdwHRJ+OoiU8z4dKBsSag8fQv602oJfbgKhgAAAAASUVORK5CYII=" />
        </Card.Header>
        <Card.Body>
          <>
            <div
              style={{
                width: "100%",
                minHeight: 40,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              آیا از حذف این مورد اطمینان دارید؟
            </div>
          </>
        </Card.Body>

        <Card.Footer>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
            }}
            color="success"
            className="px-4"
            onClick={() => {
              DeleteInflation();
              closeModalC();
            }}
          >
            تایید
          </CButton>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "white	",
              margin: "0px 10px",
              border: "solid black 1px",
            }}
            color="black"
            className="px-4"
            onClick={() => closeModalC()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>
      {loading === true ? <Loading /> : null}

    </>
  );
}

export default Obligation;
