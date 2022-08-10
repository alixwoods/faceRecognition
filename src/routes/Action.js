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
import Breadcrumb from "../components/common/breadcrumb";

import PNotify from "../components/features/elements/p-notify";
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
import { createBrowserHistory } from "history"; 
import { Routes } from "../api/api";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";

import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
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

function Action(props) {
  const classes = useStyles();

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
        amount: table[i].amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
      text: "تاریخ سر سر رسید",
    },
    {
      dataField: "amount",
      text: "مبلغ (ریال)",
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

  const [SerialNum, setSerialNum] = useState("");
  const [IssueNum, setIssueNum] = useState("");
  const [Bank, setBank] = useState("");
  const [TypeAction, setTypeAction] = useState("");
  const [SayadNum, setSayadNum] = useState("");
  const [types, setType] = useState([
    {
      label: "تهاتر",
      value: "1",
    },
    {
      label: "واریز نقدی",
      value: "2",
    },
    {
      label: "چک",
      value: "3",
    },
  ]);
  const history = createBrowserHistory();
  const[errorText,setErrorText]=useState("")
  const [allFiles, setAllFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [nameFile, setNameFile] = useState("");

  const changeHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const readerr = new FileReader();
      readerr.readAsDataURL(event.target.files[0]);
      let size = event.target.files[0].size;
      if (parseFloat(size / (1024 * 1024)).toFixed(2) > 1) {
        setErrors({
          ...errors,
          size: "حجم فایل، باید کمتر از یک مگابایت باشد",
        });
      } else {
        let file = event.target.files[0];
        remoteCallback(escape(file.name), file, readerr);
      }
    }
  };

  function remoteCallback(url, blob, readerr) {
    getBLOBFileHeader(url, blob, headerCallback, readerr);
  }
  function getBLOBFileHeader(url, blob, callback, readerr) {
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
      var arr = new Uint8Array(e.target.result).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += pad(arr[i].toString(16), 2);
      }
      callback(url, header, readerr);
    };
    fileReader.readAsArrayBuffer(blob);
  }

  function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
  }
  function headerCallback(url, headerString, readerr) {
    printHeaderInfo(url, headerString, readerr);
  }

  function printHeaderInfo(url, headerString, readerr) {
    if (
      mimeType(headerString) === "image/png" ||
      mimeType(headerString) === "jpg" ||
      mimeType(headerString) === "image/jpeg" ||
      mimeType(headerString) === "pdf" ||
      mimeType(headerString) === "tif" ||
      mimeType(headerString) === "image/bmp" ||
      mimeType(headerString) === "bmp" ||
      mimeType(headerString) === "image/gif" ||
      mimeType(headerString) === "gif" ||
      mimeType(headerString) === "image/tif" ||
      mimeType(headerString) === "tif" ||
      mimeType(headerString) === "image/tiff" ||
      mimeType(headerString) === "tiff"
    ) {
      setErrors({ ...errors, size: "" });
      setSelectedFile(readerr.result);
    } else {
      setErrors({
        ...errors,
        size:
          "نوع فایل انتخابی اشتباه است ، فایل باید از نوع pdf - jpg - png - jepg - bmp - tif - gif باشد",
      });
    }
  }

  function mimeType(headerString) {
    switch (headerString.toLowerCase()) {
      case "89504e47":
        return "image/png";
      case "474946383761":
        return "gif";
      case "474946383961":
        return "gif";
      case "474946383761":
        return "image/gif";
      case "474946383961":
        return "image/gif";
      case "4d4d002a":
        return "image/tiff";
      case "4d4d002a":
        return "image/tif";
      case "4d4d002a":
        return "tiff";
      case "4d4d002a":
        return "tif";
      case "49492a00":
        return "image/tiff";
      case "49492a00":
        return "image/tif";
      case "49492a00":
        return "tiff";
      case "49492a00":
        return "tif";
      case "424d8a7b":
        return "image/bmp";
      case "424d66b4":
        return "bmp";
      case "47494638":
        return "image/gif";
      case "ffd8ffe0":
        return "jpg";
      case "ffd8ffe1":
        return "jpg";
      case "ffd8ffdb":
        return "jpg";
      case "ffd8ffe2":
        return "image/jpeg";
      case "25504446":
        return "pdf";
      case "7b5c7274": //6631
        return "rtf";
      case "504b0304":
        return "zip archive (Office)";
      case "504b0506":
        return "zip archive empty";
      case "504b0708":
        return "zip archive spanned";
      case "49492a00":
        return "TIF (little endian format)";
      case "4d4d002a":
        return "TIF (big endian format)";
      case "d0cf11e0": //a1b11ae1
        return "Old Office Format";
      default:
        return "Unsupported";
    }
  }

  useEffect(() => {
    if (selectedFile) {
      let newFile = { document: selectedFile, fileName: nameFile };
      setAllFiles([...allFiles, newFile]);
      setNameFile("");
    }
  }, [selectedFile]);

  const [bankes, setBankes] = useState([]);
  useEffect(() => {
    BankDropDown();
  }, []);
  const BankDropDown = () => {
    setloading(true)
    axios
      .get(Routes.BankDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if(res.data.responseCode===200){
        setBankes(res.data.value.response);}
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
              BankDropDown();
            }
          }
          setloading(false)
        }
      });
  };

  return (
    <>
      <Breadcrumb current="عملیات مالی" />
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
                    <Card.Title>{`معامله : ${"نیشکر هفت نپه"}`}</Card.Title>
                  </Card.Header>

                  <Card.Body
                    style={{ direction: "rtl", padding: "20px 100px" }}
                  >
                    <Row>
                      <Form.Group as={Col} lg={12}></Form.Group>

                      <Form.Group
                        as={Col}
                        lg={12}
                        className="align-items-center"
                        style={{
                          fontFamily: "DIROOZ-FD",
                          direction: "rtl",
                          textAlign: "right",
                        }}
                      >
                        <Select
                          style={{
                            fontFamily: "DIROOZ-FD",
                            direction: "rtl",
                            textAlign: "right",
                          }}
                          placeholder={"نوع"}
                          onChange={(e) => {
                            setTypeAction(e.value);
                          }}
                          options={types}
                        />
                      </Form.Group>

                      {TypeAction === "1" ? (
                        <>
                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              مبلغ (ریال) :
                            </div>

                            <Form.Control
                              onKeyUp={(e) => thousnads(e.target)}
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                              type="text"
                              maxLength={15}
                              // placeholder="مبلغ کل (ریال)"
                            />
                          </Form.Group>

                          <div
                            style={{
                              width: "33.6%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginTop: 20,
                              padding: "0px 15px",
                            }}
                          >
                            <span
                              style={{
                                color: errors.selectedFile ? "red" : "#3c4b64",
                              }}
                            >
                              {" "}
                              بارگزاری مدارک :
                            </span>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                minHeight: 40,
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  border: "1px solid #ced4da",
                                  width: "90%",
                                  padding: 5,
                                  boxSizing: "border-box",
                                  display: "flex",
                                  direction: "rtl",
                                  justifyContent:
                                    allFiles.length > 0
                                      ? "flex-start"
                                      : "flex-end",
                                  flexWrap: "wrap",
                                  borderRadius: "0.25rem",

                                  textAlign: "right",
                                }}
                              >
                                {allFiles.length > 0 ? (
                                  <span
                                    style={{
                                      paddingRight: 10,
                                      wordBreak: "break-all",
                                      direction: "rtl",
                                    }}
                                  >
                                    {/* {file.fileName}{" "}
                          {index + 1 !== allFiles.length ? "_" : null}{" "} */}
                                    فایل انتخاب شده است
                                  </span>
                                ) : (
                                  <span>
                                    jpg - jpeg - png - pdf - gif - bmp - tif
                                  </span>
                                )}
                              </div>

                              <label
                                //for="Upload"
                                style={{
                                  padding: 5,
                                  backgroundColor: "#e8e8e8",
                                  margin: 0,
                                  border: "1px solid gray",
                                  width: 40,
                                  marginRight: 3,
                                  textAlign: "center",
                                  cursor: "pointer",
                                  borderRadius: 4,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  setModal(12);
                                  setErrors({ ...errors, selectedFile: "" });
                                }}
                              >
                                <AttachFileIcon style={{ fontSize: 25 }} />
                              </label>
                            </div>
                            {errors.selectedFile ? (
                              <span style={{ color: "red" }}>
                                {errors.selectedFile}
                              </span>
                            ) : null}
                          </div>
                        </>
                      ) : null}

                      {TypeAction === "2" ? (
                        <>
                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              مبلغ (ریال) :
                            </div>

                            <Form.Control
                              onKeyUp={(e) => thousnads(e.target)}
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                              type="text"
                              maxLength={15}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              شماره سریال :
                            </div>

                            <Form.Control
                              onChange={(e) => setSerialNum(e.target.value)}
                              value={SerialNum}
                              type="text"
                              maxLength={20}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              شماره پیگیری :
                            </div>

                            <Form.Control
                              onChange={(e) => setIssueNum(e.target.value)}
                              value={IssueNum}
                              type="text"
                              maxLength={15}
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            lg={4}
                            className="align-items-center"
                            style={{
                              fontFamily: "DIROOZ-FD",
                              direction: "rtl",
                              textAlign: "right",
                            }}
                          >
                            <div style={{ marginBottom: "5px" }}>عهده :</div>
                            <Select
                              style={{
                                fontFamily: "DIROOZ-FD",
                                direction: "rtl",
                                textAlign: "right",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                setBank(e.value);
                              }}
                              options={bankes}
                            />
                          </Form.Group>

                          <div
                            style={{
                              width: "33.6%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginTop: 20,
                              padding: "0px 15px",
                            }}
                          >
                            <span
                              style={{
                                color: errors.selectedFile ? "red" : "#3c4b64",
                              }}
                            >
                              {" "}
                              بارگزاری مدارک :
                            </span>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                minHeight: 40,
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  border: "1px solid #ced4da",
                                  width: "90%",
                                  padding: 5,
                                  boxSizing: "border-box",
                                  display: "flex",
                                  direction: "rtl",
                                  justifyContent:
                                    allFiles.length > 0
                                      ? "flex-start"
                                      : "flex-end",
                                  flexWrap: "wrap",
                                  borderRadius: "0.25rem",

                                  textAlign: "right",
                                }}
                              >
                                {allFiles.length > 0 ? (
                                  <span
                                    style={{
                                      paddingRight: 10,
                                      wordBreak: "break-all",
                                      direction: "rtl",
                                    }}
                                  >
                                    {/* {file.fileName}{" "}
                          {index + 1 !== allFiles.length ? "_" : null}{" "} */}
                                    فایل انتخاب شده است
                                  </span>
                                ) : (
                                  <span>
                                    jpg - jpeg - png - pdf - gif - bmp - tif
                                  </span>
                                )}
                              </div>

                              <label
                                //for="Upload"
                                style={{
                                  padding: 5,
                                  backgroundColor: "#e8e8e8",
                                  margin: 0,
                                  border: "1px solid gray",
                                  width: 40,
                                  marginRight: 3,
                                  textAlign: "center",
                                  cursor: "pointer",
                                  borderRadius: 4,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  setModal(12);
                                  setErrors({ ...errors, selectedFile: "" });
                                }}
                              >
                                <AttachFileIcon style={{ fontSize: 25 }} />
                              </label>
                            </div>
                            {errors.selectedFile ? (
                              <span style={{ color: "red" }}>
                                {errors.selectedFile}
                              </span>
                            ) : null}
                          </div>
                        </>
                      ) : null}

                      {TypeAction === "3" ? (
                        <>
                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              مبلغ (ریال) :
                            </div>

                            <Form.Control
                              onKeyUp={(e) => thousnads(e.target)}
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                              type="text"
                              maxLength={15}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              شناسه صیاد :
                            </div>

                            <Form.Control
                              onChange={(e) => setSayadNum(e.target.value)}
                              value={SayadNum}
                              type="text"
                              maxLength={20}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            lg={4}
                            style={{ textAlign: "right" }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              شماره سریال :
                            </div>

                            <Form.Control
                              onChange={(e) => setSerialNum(e.target.value)}
                              value={SerialNum}
                              type="text"
                              maxLength={15}
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            lg={4}
                            className="align-items-center"
                            style={{
                              fontFamily: "DIROOZ-FD",
                              direction: "rtl",
                              textAlign: "right",
                            }}
                          >
                            <div style={{ marginBottom: "5px" }}>عهده :</div>
                            <Select
                              style={{
                                fontFamily: "DIROOZ-FD",
                                direction: "rtl",
                                textAlign: "right",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                setBank(e.value);
                              }}
                              options={bankes}
                            />
                          </Form.Group>

                          <div
                            style={{
                              width: "33.6%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginTop: 20,
                              padding: "0px 15px",
                            }}
                          >
                            <span
                              style={{
                                color: errors.selectedFile ? "red" : "#3c4b64",
                              }}
                            >
                              {" "}
                              بارگزاری مدارک :
                            </span>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                minHeight: 40,
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  border: "1px solid #ced4da",
                                  width: "90%",
                                  padding: 5,
                                  boxSizing: "border-box",
                                  display: "flex",
                                  direction: "rtl",
                                  justifyContent:
                                    allFiles.length > 0
                                      ? "flex-start"
                                      : "flex-end",
                                  flexWrap: "wrap",
                                  borderRadius: "0.25rem",

                                  textAlign: "right",
                                }}
                              >
                                {allFiles.length > 0 ? (
                                  <span
                                    style={{
                                      paddingRight: 10,
                                      wordBreak: "break-all",
                                      direction: "rtl",
                                    }}
                                  >
                                    {/* {file.fileName}{" "}
                          {index + 1 !== allFiles.length ? "_" : null}{" "} */}
                                    فایل انتخاب شده است
                                  </span>
                                ) : (
                                  <span>
                                    jpg - jpeg - png - pdf - gif - bmp - tif
                                  </span>
                                )}
                              </div>

                              <label
                                //for="Upload"
                                style={{
                                  padding: 5,
                                  backgroundColor: "#e8e8e8",
                                  margin: 0,
                                  border: "1px solid gray",
                                  width: 40,
                                  marginRight: 3,
                                  textAlign: "center",
                                  cursor: "pointer",
                                  borderRadius: 4,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  setModal(12);
                                  setErrors({ ...errors, selectedFile: "" });
                                }}
                              >
                                <AttachFileIcon style={{ fontSize: 25 }} />
                              </label>
                            </div>
                            {errors.selectedFile ? (
                              <span style={{ color: "red" }}>
                                {errors.selectedFile}
                              </span>
                            ) : null}
                          </div>
                        </>
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
        show={modal === 12}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card.Header></Card.Header>
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
              <input
                style={{ height: 45, width: "49%" }}
                placeholder="عنوان فایل"
                value={nameFile}
                onChange={(e) => setNameFile(e.target.value)}
              />
              <label
                for="Upload"
                style={{
                  padding: 5,
                  backgroundColor: "rgb(75, 181, 67)",
                  color: "#fff",
                  margin: 0,
                  border: "1px solid gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "49%",
                  marginTop: 0,
                  height: 45,
                  textAlign: "center",
                  cursor: !nameFile ? "not-allowed" : "pointer",
                  borderRadius: 4,
                  opacity: !nameFile ? 0.6 : 1,
                }}
                onClick={() => setErrors({ ...errors, size: "" })}
              >
                انتخاب فایل
              </label>
              <input
                id="Upload"
                type="file"
                name="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                style={{ display: "none" }}
                onChange={changeHandler}
                disabled={!nameFile}
                multiple
              />
            </div>
            {errors.size ? (
              <p style={{ color: "red" }}> {errors.size}</p>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {allFiles.length > 0 &&
                allFiles.map((file, index) => {
                  return (
                    <div
                      style={{
                        width: "23.5%",
                        // height: 45,
                        minHeight: 100,
                        border: "1px solid gray",
                        borderRadius: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxSizing: "border-box",
                        padding: 5,
                        margin: `10px ${
                          index !== 0 && index !== 4 && index !== 8 ? "2%" : 0
                        } 0 0`,
                      }}
                    >
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "red",
                          borderRadius: 5,
                          color: "#fff",
                          alignSelf: "flex-end",
                          padding: 0,
                        }}
                        onClick={() =>
                          setAllFiles(
                            allFiles.filter((files, id) => {
                              return id !== index;
                            })
                          )
                        }
                      >
                        <CloseIcon style={{ fontSize: 20 }} />
                      </button>
                      <div style={{ margin: "auto" }}>
                        <span
                          style={{
                            fontSize: 16,
                            wordBreak: "break-word",
                          }}
                        >
                          {file.fileName}
                        </span>
                      </div>
                    </div>
                  );
                })}
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
            // onClick={() => setModal(10)}
          >
            تایید
          </CButton>
        </Card.Footer>
      </Modal>

      {loading === true ? <Loading /> : null}
    </>
  );
}

export default Action;
