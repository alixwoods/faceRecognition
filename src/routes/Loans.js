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
import { days, months, newYears } from "../components/date";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
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

function Loans(props) {
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

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    loansStateDrop();
    LoansReport(page);
  }, [page]);

  var parts = window.location.href.split("?");
  var lastSegment = parts.pop() || parts.pop();
  //=======================================================

  const loansStateDrop = () => {
    // setloading(true);
    axios
      .get(Routes.loansStateDrop, {
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
              loansStateDrop();
            }
          }
        }
      });
  };
  //=======================================================

  const LoansReport = () => {
    setloading(true);
    axios
      .post(
        Routes.LoansReport,
        {
          baseAmountFrom: baseAmountFrom
            ? baseAmountFrom.toString().replaceAll(",", "")
            : 0,
          baseAmountTo: baseAmountTo
            ? baseAmountTo.toString().replaceAll(",", "")
            : 0,
          benefitAmountFrom: benefitAmountFrom
            ? benefitAmountFrom.toString().replaceAll(",", "")
            : 0,
          benefitAmountTo: benefitAmountTo
            ? benefitAmountTo.toString().replaceAll(",", "")
            : 0,
          finesAmountFrom: finesAmountFrom
            ? finesAmountFrom.toString().replaceAll(",", "")
            : 0,
          finesAmountTo: finesAmountTo
            ? finesAmountTo.toString().replaceAll(",", "")
            : 0,
          rewardAmountFrom: rewardAmountFrom
            ? rewardAmountFrom.toString().replaceAll(",", "")
            : 0,
          rewardAmountTo: rewardAmountTo
            ? rewardAmountTo.toString().replaceAll(",", "")
            : 0,
          paidAmountFrom: paidAmountFrom
            ? paidAmountFrom.toString().replaceAll(",", "")
            : 0,
          paidAmountTo: paidAmountTo
            ? paidAmountTo.toString().replaceAll(",", "")
            : 0,
          remainingAmountFrom: remainingAmountFrom
            ? remainingAmountFrom.toString().replaceAll(",", "")
            : 0,
          remainingAmountTo: remainingAmountTo
            ? remainingAmountTo.toString().replaceAll(",", "")
            : 0,
          dueDateFrom:
            dueDayFrom && dueMonthFrom && dueYearFrom
              ? `${dueYearFrom}/${dueMonthFrom}/${dueDayFrom}`
              : "",
          dueDateTo:
            dueDayTo && dueMonthTo && dueYearTo
              ? `${dueYearTo}/${dueMonthTo}/${dueDayTo}`
              : "",
          stateId: LoanState,
          dealingItem: dealingItem,
          contractNumber: contractNumber,
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
          settable(res.data.value.response.loansList);
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
              LoansReport();
            }
          }
        }
      });
  };
  //=======================================================

  const LoansReportToXlsFile = () => {
    setloading(true);
    axios
      .post(
        Routes.LoansReportToXlsFile,
        {
          baseAmountFrom: baseAmountFrom
            ? baseAmountFrom.toString().replaceAll(",", "")
            : 0,
          baseAmountTo: baseAmountTo
            ? baseAmountTo.toString().replaceAll(",", "")
            : 0,
          benefitAmountFrom: benefitAmountFrom
            ? benefitAmountFrom.toString().replaceAll(",", "")
            : 0,
          benefitAmountTo: benefitAmountTo
            ? benefitAmountTo.toString().replaceAll(",", "")
            : 0,
          finesAmountFrom: finesAmountFrom
            ? finesAmountFrom.toString().replaceAll(",", "")
            : 0,
          finesAmountTo: finesAmountTo
            ? finesAmountTo.toString().replaceAll(",", "")
            : 0,
          rewardAmountFrom: rewardAmountFrom
            ? rewardAmountFrom.toString().replaceAll(",", "")
            : 0,
          rewardAmountTo: rewardAmountTo
            ? rewardAmountTo.toString().replaceAll(",", "")
            : 0,
          paidAmountFrom: paidAmountFrom
            ? paidAmountFrom.toString().replaceAll(",", "")
            : 0,
          paidAmountTo: paidAmountTo
            ? paidAmountTo.toString().replaceAll(",", "")
            : 0,
          remainingAmountFrom: remainingAmountFrom
            ? remainingAmountFrom.toString().replaceAll(",", "")
            : 0,
          remainingAmountTo: remainingAmountTo
            ? remainingAmountTo.toString().replaceAll(",", "")
            : 0,
          dueDateFrom:
            dueDayFrom && dueMonthFrom && dueYearFrom
              ? `${dueYearFrom}/${dueMonthFrom}/${dueDayFrom}`
              : "",
          dueDateTo:
            dueDayTo && dueMonthTo && dueYearTo
              ? `${dueYearTo}/${dueMonthTo}/${dueDayTo}`
              : "",
          stateId: LoanState,
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
              LoansReportToXlsFile();
            }
          }
        }
      });
  };
  //===============================================================================
  const LoansReportToCsvFile = () => {
    setloading(true);
    axios
      .post(
        Routes.LoansReportToCsvFile,
        {
          baseAmountFrom: baseAmountFrom
            ? baseAmountFrom.toString().replaceAll(",", "")
            : 0,
          baseAmountTo: baseAmountTo
            ? baseAmountTo.toString().replaceAll(",", "")
            : 0,
          benefitAmountFrom: benefitAmountFrom
            ? benefitAmountFrom.toString().replaceAll(",", "")
            : 0,
          benefitAmountTo: benefitAmountTo
            ? benefitAmountTo.toString().replaceAll(",", "")
            : 0,
          finesAmountFrom: finesAmountFrom
            ? finesAmountFrom.toString().replaceAll(",", "")
            : 0,
          finesAmountTo: finesAmountTo
            ? finesAmountTo.toString().replaceAll(",", "")
            : 0,
          rewardAmountFrom: rewardAmountFrom
            ? rewardAmountFrom.toString().replaceAll(",", "")
            : 0,
          rewardAmountTo: rewardAmountTo
            ? rewardAmountTo.toString().replaceAll(",", "")
            : 0,
          paidAmountFrom: paidAmountFrom
            ? paidAmountFrom.toString().replaceAll(",", "")
            : 0,
          paidAmountTo: paidAmountTo
            ? paidAmountTo.toString().replaceAll(",", "")
            : 0,
          remainingAmountFrom: remainingAmountFrom
            ? remainingAmountFrom.toString().replaceAll(",", "")
            : 0,
          remainingAmountTo: remainingAmountTo
            ? remainingAmountTo.toString().replaceAll(",", "")
            : 0,
          dueDateFrom:
            dueDayFrom && dueMonthFrom && dueYearFrom
              ? `${dueYearFrom}/${dueMonthFrom}/${dueDayFrom}`
              : "",
          dueDateTo:
            dueDayTo && dueMonthTo && dueYearTo
              ? `${dueYearTo}/${dueMonthTo}/${dueDayTo}`
              : "",
          stateId: LoanState,
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
              LoansReportToCsvFile();
            }
          }
        }
      });
  };
  //======================================================
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        baseAmount: table[i].baseAmount,
        benefitAmount: table[i].benefitAmount,
        dealingItemTitle: table[i].dealingItemTitle,
        dueDate: table[i].dueDate,
        finesAmount: table[i].finesAmount,
        paidAmount: table[i].paidAmount,
        remainingAmount: table[i].remainingAmount,
        rewardAmount: table[i].rewardAmount,
        stateTitle: table[i].stateTitle,
        contractNumber: table[i].contractNumber,
        detail: (
          <img
            onClick={() => {
              props.history.push(`/DealDetail?${table[i].id}`);
            }}
            style={{ cursor: "pointer", width: "40px" }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEk0lEQVRoge2aS2xUVRjH/9+dNwqYoiSUkt7p0NaGmBiXtimJUZMaXBl24laJlFglgbgoh8Zoq9EGGw1bHV1J3Bh8BDXh4YrgBlE6nc5MM1BAUiqCpTN37vlcTO9w5z33wcxo+K3OOfec7/t/cx7z3QfwgPaC3DK0Iy06tByGQRgCeACgCIDNAD+05uofgK8DSBDwOzP9ElBWT13onlx2w7+jQNSkCPoVuRtMrwB4BoBi0b1OxD8BFM1IHE+FxapdLbYC6UqPhUL6xtcJeBPgLXadl0i5CsgPVzy3P728bfqu5dFWB/QuiF3E+BjgsNWxDZJg8P45deKElUENB6ImRTAAnmLCfuva7EDRO368ttgpVhrq3UingdTbW3T4vgXwpCNtlqHzPsaui2FxrW7Peh36FkQPmE8C6HFFm2VoHoTnY90iUbNXrYuRuNiseHCWiHvdFWeZhI9psNbMVD0uu9JjIY+Xf2iDIACgJ0d8Qk2KYLUOVQNZp288Cmd7IktEB0mhraTQViI+BCBr1xgDT/kUnq52veLSyh+x/I1dpwBAxIdmuyemzG39C+MHmWnSiV2AX4ipE9+VtpbNSFd6LETMR505AxTOfV7a5pXKZ07tAspMpSVWFkhIX78PLpxQUvGXzbbm1TxO7QIc8UPuLW0tCkRNiiBBGXPuDADLPWVtOV95mx2IDpTOitdcWUsAXcmdmGmif2EcICWab5B7mPmIG7YBdAZIvgTgS6OheGnls1i38DPTJEu+wpKvrG1yv1vGJSlFs1tYxzvSokPT8SfALqzjZkB6lvFoKiz+Akwzouly538nCABgT8CDYaNmWlrKYCvkOEJiyCiaNjsPuGU/ph6p+EfblzrMbvkAADAeN4qFGWGmdsipLMGEPqNcCISIN7nloC91mF3/9SvTYRTMx+/DTXDsNhuMgsWnHu2LOZA7LVNhn7+NgnmzL7VGiyNuGgXzZp9rjRb7ECNmlE1Li/5ohRhHEC4ZxXuBMM62RIwDdJJnjHIhkICyegogvTWSbJGTucxpo1II5EL35DIYP7dGky1+TESmbhmVov8RUlB2n92uMChqrhcFomeXvgKw2FRFtqCrGuNrc0tRIPHemQzAHzVXlHWI8X7pu5SydLsrPRZap2/4DQ6epFRL4w0cJpTxLNMTpYGU5VqXt03fZXCTXh1Yh5hGK73ZqvrL9S+IY8z86v2VZRX6JKaKfZWuVM1+MxJvAHT+/omyCNM5qS29Ve1y1UBSYbEqtcwIcC+faR00r3H2xfxhVJma9yPx3vdugGgEoHn3xTUKzRNyzyV73r1eq1fdG6tYt0j4GEME/OqeuAZhOqfJ7OCs+k6yXteG7hAvhsU1Xbv5dP5tbrOg6Ir31s56M1HobdV8X2p8BFBmAI5YF9cQcWIanQ2L760MsvXBgJoUQT/kXhAdANBpx0YFFonpgwxwzM4XEI4+4dg+Nxrw+DftlsDLxHjW+iNX0gE+SeAvdG35eK1Tqa4luwNLUZPikYAHw5AY4vxTy+0APQbw+jVXtwG+QUxzIFzSSZ6Rucxpcyr+gP8T/wI89o0spXLNXgAAAABJRU5ErkJggg=="
          />
        ),
      });
    }
    return items;
  };

  const products = productsGenerator(table);
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const columns = [
    {
      dataField: "id",
      text: "ردیف",
    },
    {
      dataField: "baseAmount",
      text: "اصل بدهی (ریال)",
    },
    {
      dataField: "benefitAmount",
      text: "سود (ریال)",
    },
    {
      dataField: "dealingItemTitle",
      text: "مورد معامله",
    },
    {
      dataField: "contractNumber",
      text: "شماره قرارداد",
    },
    {
      dataField: "dueDate",
      text: "تاریخ سررسید",
    },
    {
      dataField: "finesAmount",
      text: "مبلغ جریمه (ریال)",
    },
    {
      dataField: "paidAmount",
      text: "مبلغ پرداخت شده",
    },
    {
      dataField: "rewardAmount",
      text: "مبلغ جایزه",
    },
    {
      dataField: "remainingAmount",
      text: "بدهی باقی مانده",
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

  const [modal, setModal] = useState(-1);
  function closeModal() {
    setModal(-1);
  }

  const [IdPic, setIdPic] = useState("");
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
  const [dueDayFrom, setDueDayFrom] = useState("");
  const [dueMonthFrom, setDueMonthFrom] = useState("");
  const [dueYearFrom, setDueYearFrom] = useState("");
  const [dueDayTo, setDueDayTo] = useState("");
  const [dueMonthTo, setDueMonthTo] = useState("");
  const [dueYearTo, setDueYearTo] = useState("");
  const [states, setStates] = useState([]);
  const [baseAmountFrom, setBaseAmountFrom] = useState("");
  const [baseAmountTo, setBaseAmountTo] = useState("");
  const [benefitAmountFrom, setBenefitAmountFrom] = useState("");
  const [benefitAmountTo, setBenefitAmountTo] = useState("");
  const [finesAmountFrom, setFinesAmountFrom] = useState("");
  const [finesAmountTo, setFinesAmountTo] = useState("");
  const [rewardAmountFrom, setRewardAmountFrom] = useState("");
  const [rewardAmountTo, setRewardAmountTo] = useState("");
  const [paidAmountFrom, setPaidAmountFrom] = useState("");
  const [paidAmountTo, setPaidAmountTo] = useState("");
  const [remainingAmountFrom, setRemainingAmountFrom] = useState("");
  const [remainingAmountTo, setRemainingAmountTo] = useState("");
  const [dealingItem, setDealingItem] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [LoanState, setLoanState] = useState(0);

  useEffect(() => {
    if (selectedFile) {
      let newFile = { document: selectedFile, fileName: nameFile };
      setAllFiles([...allFiles, newFile]);
      setNameFile("");
    }
  }, [selectedFile]);

  const [idDoc, setidDoc] = useState("");
  const AddLoanDocument = () => {
    setloading(true);
    axios
      .post(
        Routes.AddLoanDocument,
        {
          itemId: idDoc,
          tableName: "",
          docs: allFiles,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        setloading(false);
        setAllFiles([]);
        if (res.data.responseCode === 200) {
          LoansReport();
          toast(
            <PNotify
              // title="Regular Notice"
              icon="fas fa-check"
              text="فایل با موفقیت ثبت شد ."
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          closeModal();
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
              AddLoanDocument();
            }
          }
        }
      });
  };
  const [subDocs, setSubDocs] = useState([]);
  const GetLoanDocuments = (id) => {
    setloading(true);
    axios
      .get(Routes.GetLoanDocuments, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setSubDocs(res.data.value.response);
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
              GetLoanDocuments(id);
            }
          }
        }
      });
  };

  function CheckDoc(doc, id) {
    if (doc != null) {
      GetLoanDocuments(id);
    }
  }

  const DeleteDocument = (id) => {
    setloading(true);
    axios
      .post(
        Routes.DeleteDocument,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            documentId: id,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          toast(
            <PNotify
              // title="Regular Notice"
              icon="fas fa-check"
              text="فایل با موفقیت حذف شد ."
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          closeModal();
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
              DeleteDocument(id);
            }
          }
        }
      });
  };
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChangeTotalDF = (event) =>
    setBaseAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeTotalDT = (event) =>
    setBaseAmountTo(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeProfitF = (event) =>
    setBenefitAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeProfitT = (event) =>
    setBenefitAmountTo(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeFineF = (event) =>
    setFinesAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeFineT = (event) =>
    setFinesAmountTo(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeRewardF = (event) =>
    setRewardAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeRewardT = (event) =>
    setRewardAmountTo(addCommas(removeNonNumeric(event.target.value)));
  const handleChangePaidF = (event) =>
    setPaidAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangePaidT = (event) =>
    setPaidAmountTo(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeRemainingF = (event) =>
    setRemainingAmountFrom(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeRemainingT = (event) =>
    setRemainingAmountTo(addCommas(removeNonNumeric(event.target.value)));
  return (
    <>
      <Breadcrumb current="اقساط" />
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
                          تاریخ قرارداد از{" "}
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
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
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
                          className="col-12 grey-form-heading "
                        >
                          {" "}
                          تاریخ قرارداد تا{" "}
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
                                    <option value={day.value}>
                                      {day.label}
                                    </option>
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
                          وضعیت
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            height: 37,
                          }}
                        >
                          <CFormSelect
                            style={{ width: "100%", color: "black" }}
                            value={LoanState}
                            onChange={(e) => {
                              setLoanState(e.target.value);
                            }}
                          >
                            <option value="">انتخاب کنید</option>
                            {states
                              ? states.map((e) => {
                                  return (
                                    <option value={e.value}>{e.label}</option>
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
                          مبلغ کل بدهی از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeTotalDF}
                          value={baseAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          شماره قرارداد{" "}
                        </div>
                        <Form.Control
                          onChange={(e) => setContractNumber(e.target.value)}
                          value={contractNumber}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مورد معامله{" "}
                        </div>
                        <Form.Control
                          onChange={(e) => setDealingItem(e.target.value)}
                          value={dealingItem}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ کل بدهی تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeTotalDT}
                          value={baseAmountTo}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ سود از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeProfitF}
                          value={benefitAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ سود تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeProfitT}
                          value={benefitAmountTo}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ جریمه از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeFineF}
                          value={finesAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ جریمه تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeFineT}
                          value={finesAmountTo}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ جایزه از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeRewardF}
                          value={rewardAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ جایزه تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeRewardT}
                          value={rewardAmountTo}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ پرداخت شده از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangePaidF}
                          value={paidAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          مبلغ پرداخت شده تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangePaidT}
                          value={paidAmountTo}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          باقی مانده بدهی از (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeRemainingF}
                          value={remainingAmountFrom}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          باقی مانده بدهی تا (ریال){" "}
                        </div>
                        <Form.Control
                          onChange={handleChangeRemainingT}
                          value={remainingAmountTo}
                          type="text"
                          maxLength={20}
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
                          onClick={() => {
                            LoansReport();
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
                        onClick={() => LoansReportToXlsFile()}
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
                        onClick={() => LoansReportToCsvFile()}
                      >
                        <img
                          style={{
                            width: "30px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACwklEQVRoge2Zy0tVURTGv6XRS7M3JtHDLnXLjIiERiXRqIhG/RXSpEEN8x/wv2jWpIgmFdag6yMMlCIrQvRmlIkg5MAe1K/BXRevF71ePfvoSc4Hl7VZe+31re889tl7XylFsmCVOgFi4n0k6bqZ/QyVsCZUomXiqqT7wOZVYcMRR07Hc6A+ZP6KpHHkBCbcPgPqQnIsShpHTiALjHs7BzSE5FmQNK6cwGFgxF2vgN0huRYkjSsncBD46O5BYE9IvgVJ48oJ7APeetcw0BSSc9WEuL8ReO3d74H9sZPGlRPYBQx4yCjQHDtpXDmBHUC/h+WBTOykceUEtgO9HvoJOBo7aVw5gTqg28MngNZK8VUtGs2sYtxyEOHCTJpZ42Kd/5OQinVsWGnSlWIlF6Ua8Wu1jA+OVEjSkApJGoLNWkCNpDOSGiS9MbMpwCRlJB2Q9EHSD0nNkmbNbNjHZSXVS8qb2VSoesqLq/YrfAp4xxzu+Jqpu8SXB855e7JkbHFj1R61jkhCvODPHvoY6ATOAl3uewrcAm4DG4FZ9+8FtgB/gF/A1rUWctPDXvjjVfTn3N9SFl/0twOnvf0yah0hXvZLbu+a2d8S/5jbLubvxfvctkg67u3eqEWEEFLcyeXL/J2SpiRdljQItLm/WPQJSVlv90QtIoSQ327nzYBmNiKpTdKACrPWQ38P+j3kmKQj3k7EHRl3my3vMLO8pPOShiQ1SbpgZl8ljaogJCNpzMy+RC0ihJCc2w5KjnKAWknyg+pv7p5x2yfpkAqPV+THaklUOWtto3BQADBNYb99DXhCYbs65H3DwCYfc4M5dISoI/IdMbMZSRclPZBUK6lV0k5J3yWdVGEyuCfpSsnfCD2Spv2XK88ZHJE/RKtYx7pZNKZCkoZUSNKQCkkaUiFJQyokaajqOCgJ662lsG7uSIqk4R/3lgp8i7UwQwAAAABJRU5ErkJggg=="
                        ></img>
                      </Button>{" "}
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
                </Card.Body>
              </Card>
            </div>
          </div>
        </Form>
      </section>

      <Modal
        show={modal === 12}
        onHide={closeModal}
        centered={true}
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
        size="lg"
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
            <div style={{ margin: "10px 0px" }}>
              {subDocs
                ? subDocs.map((a) => {
                    return (
                      <>
                        <div style={{ position: "relative", width: "49%" }}>
                          {" "}
                          <label className="form-control">
                            {a.title}
                            <div>
                              <a
                                href={a.source}
                                target="_blank"
                                download
                                style={{
                                  position: "absolute",
                                  left: "50px",
                                  top: "5px",
                                }}
                              >
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WvU7CUBiG3/fUW4CYCMhihQQ3XYxOHbkP7kJ7lJuQC1EXjYNxUidJQBablglvgIXzOQiJlgptaUiIfcbv5P2enJPzB2watuc+2Z77mDa/tYL7eIUs1CrhXJwEhgt73nmTUB1AdhYFB9ULAoDtubLEMQSkNahe3v4szs2Y4NUyaUJKoOqEi1FLXcpQ+o1IOY54LeTiXPyPxaQ5oeIRgFHE8EjRHII8zV4MjN8r+sVSdELykaXo9HfbryTGmYuNqJu6rxu9iu5O5QAAS9HpVXS37uuGGLmO22/ukVh86fNTWROnX26//cp86BooDwC2/0rOHpUZCTeXFMzEuq8FZwdJpFGk+PpIwUzU3b6vmwAwXd5i0i5p/1xFMfKcMgtgE87xOsTDzC1kEEMsrUzlZECDVmb9cpLyBYwpWufAPJV4AAAAAElFTkSuQmCC" />
                              </a>

                              <a
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  left: "20px",
                                  top: "5px",
                                }}
                                onClick={
                                  () => {
                                    setModal(9);
                                    setIdPic(a.id);
                                  }
                                  // DeleteDocument(a.id)
                                }
                              >
                                <img
                                  style={{ width: "30px" }}
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACXUlEQVRoge2Yv2tTURTHP/fd+F9UyNwOjk62FZwcLRXUkGIVR8HB1hiDQlptcXWppkjrj4AVVwdbiNVRxziIQwZXBbuJufc6RJMXY9N38076WnifKdx3cs73y/1xLhdSUlIONUoymRvnDo7be1RcVtvckKopZiCS+E5VMRORDLirJ0+DWwFGJIpG4CvWXVEP3r7eKzCIlm9fxQOMoNRKlMCIBvZVfAvF0ShhUQ0cWLw2sTuBG5aQMOpddF2HfgZSA0mTGkia1EDSiBpw2VGRGB/EDJh8ieajj9hT53eNsRNTNB9+wFxelCpLRiKJyZewM6XW7/lVAILN510xdmIKU3wCOoM9dx0AXSnGrh17Blx2DJsrhDJqzFwFOzndHrKT023x7bGz13DZsbjl48+AatTRCznMracdgTqDKa5D5gj8+om5udYlHmvQy5dQjXrc8nKXOTt+ptsEgLWAg0CHxgx6aZZgq7q7qCQuc8H2K/RCDkwzNBh4i/euK5aJkAlrej86Ky4ehtHIVJ/Z7/dtQEQNtI/K8LL5iwow86t9+8QgiBkIn/OdQdu9nAItbkLEwP/FG/TSRXT5wj8bW9aESCPrEW+a6MU8wVa1tbHvzvSamKuINLLYBlSjjn4cepD706SC2kanSG2j54jVz+6JNDKRJRRU77fuNX3O+XCf0OtlgrWyRGnZZxWXHUU1PvXPESHGpxOn70JJkxpIGl8DO0NR0c0Pn2A/A45Nr/jBeOMT7DsDBeCb5398+I6msHdYBy8D6j2faXIMxwtkl9MO8BLNcVXji2DelJSUg85vwU3YNL7U328AAAAASUVORK5CYII="
                                />{" "}
                              </a>
                            </div>
                          </label>
                        </div>
                      </>
                    );
                  })
                : null}
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
            onClick={() => AddLoanDocument()}
          >
            تایید
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={modal === 9}
        onHide={closeModal}
        centered={true}
        className="modal-block-warning"
      >
        <Card>
          <Card.Header>
            <Card.Title>پیام</Card.Title>
          </Card.Header>
          <Card.Body style={{ textAlign: "right", direction: "rtl" }}>
            <div className="modal-wrapper">
              <div className="modal-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="modal-text">
                {/* <h4>Warning</h4> */}
                <p>آیا از حذف فایل اطمینان دارید ؟</p>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={12} className="text-right">
                <Button
                  style={{ width: "100px", margin: "0px 10px" }}
                  variant="warning"
                  onClick={() => setModal(12)}
                >
                  انصراف
                </Button>
                <Button
                  style={{ width: "100px", margin: "0px 10px" }}
                  variant="danger"
                  onClick={() => DeleteDocument(IdPic)}
                >
                  حذف
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

export default Loans;
