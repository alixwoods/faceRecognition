import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  Col,
  Table,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
// import "./myStyles.css";
import { toast } from "react-toastify";
import { days, months, newYears, years } from "../components/date";
import pNotify from "../components/features/elements/p-notify";
import Loading from "../components/Loading/Example";
import Select from "react-select";

import Breadcrumb from "../components/common/breadcrumb";
import { Routes } from "../api/api";
import axios from "axios";
import { TiInputChecked } from "react-icons/ti";
import { TbChecklist } from "react-icons/tb";
import { withCardActions, withMaxLength } from "../components/hoc/index";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";

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
import PNotify from "../components/features/elements/p-notify";
import { createBrowserHistory } from "history";
import { RefreshToken } from "./ref";
const MaxLengthInput = withMaxLength(Form.Control);

const CardWithActions = withCardActions(Card);
const obligationTypes = [
  { value: "true", label: "دستی" },
  { value: "false", label: "پیشفرض" },
]
var jsonObj = {};
jsonObj.checks = [];
function Postponement(props) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
  const [benefitAmount, setBenefitAmount] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [newCheckSerial, setNewCheckSerial] = useState("");
  const [newCheckSayad, setNewCheckSayad] = useState("");
  const [newCheckOwner, setNewCheckOwner] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [newCheckAmount, setNewCheckAmount] = useState("");
  const [effectiveDay, setEffectiveDay] = useState("");
  const [effectiveMonth, setEffectiveMonth] = useState("");
  const [effectiveYear, setEffectiveYear] = useState("");
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const [errorTextC, setErrorTextC] = useState("");

  const [modal, setModal] = useState(-1);
  const [newCheckBank, setNewCheckBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [obligationAmount, setObligationAmount] = useState("");
  const [defaultObligation, setDefaultObligation] = useState("");
  const [calculatedObligation, setCalculatedObligation] = useState("");
  const [viewEltezam, setViewEltezam] = useState(false);
  const [viewStep2, setViewStep2] = useState(false);
  const [viewStep3, setViewStep3] = useState(false);
  const [validAmount, setVlaidAmount] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [loading, setloading] = useState(false);
  const [BuyersList, setBuyersList] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [submitDesc, setSubmitDesc] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  var parts = window.location.href.split("?");
  const[obligationType,setObligationType]=useState(false);
  var lastSegment = parts.pop() || parts.pop();
  jsonObj.loanId = lastSegment;
  jsonObj.dueDate = year + "/" + month + "/" + day;
const[rangeDays,setRangeDays]=useState("")
  var myRowsCount = 0;
  var el = document.getElementById("newBank");
  var owner = el ? el.options[el.selectedIndex].innerHTML : null;

  var dl = document.getElementById("cellSeven");
  var bankk = dl ? dl.options[dl.selectedIndex].innerHTML : null;

  function ClearAllRows() {
    var table = document.getElementById("checksTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
    }
  }
  function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
  }
  function remoteCallback(url, blob, readerr) {
    getBLOBFileHeader(url, blob, headerCallback, readerr);
  }
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
  function closeModal() {
    setModal(-1);
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
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const Obligations =[  { value: "true", label: "پیش فرض" },
  { value: "false", label: "دستی" },]
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
  function addToTable() {
    var table = document.getElementById("checksTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    // cell1.innerHTML = document.getElementById('cellOne').value;
    cell1.innerHTML = document.getElementById("cellTwo").value;
    cell2.innerHTML = year.label + "/" + month.value + "/" + day.value;
    cell3.innerHTML = effectiveYear + "/" + effectiveMonth + "/" + effectiveDay;
    cell4.innerHTML = numberWithCommas(
      document.getElementById("cellFive").value
    );
    cell5.innerHTML = `<span id=\"ownerL\">${owner}<span>`;
    cell6.innerHTML = `<span id=\'bankL\'>${bankk}</span>`;
    cell7.innerHTML = `${'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII=" onclick="deleteRow(this)" id = "deleteIcon" style="width:25px;cursor:pointer"/>'}`;
    document.getElementById("deleteIcon").addEventListener(
      "click",
      function() {
        deleteRow(this, "row" + jsonObj.checks.length);
      },
      false
    );
    extractTable();
    jsonObj.checks.push({
      row: "row" + jsonObj.checks.length,
      dueDate: year.label + "/" + month.value + "/" + day.value,
      effectiveDate: effectiveYear + "/" + effectiveMonth + "/" + effectiveDay,
      ownerId: newCheckOwner,
      checkNumber: newCheckSerial,
      amount: newCheckAmount.toString().replaceAll(",", ""),
      bankId: newCheckBank,
      sayyadNumber: newCheckSayad,
    });
  }
  function clearForm() {
    setNewCheckSayad("");
    setNewCheckAmount("");
    setNewCheckOwner("");
    setEffectiveDay("");
    setEffectiveMonth("");
    setEffectiveYear("");
    setNewCheckBank("");
    setNewCheckSerial("");
  }

  function deleteRow(btn, value) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    myRowsCount--;
    extractTable();
    const index = jsonObj.checks.findIndex((x) => x.row === value);
    if (index !== undefined) jsonObj.checks.splice(index, 1);
  }
  useEffect(() => {
if(!viewEltezam){
  setObligationType(false)
  setDefaultObligation("")
  setObligationAmount("")
}
  }, [viewEltezam]);


  useEffect(() => {
    ChecksList();
    BankDropDown();
    GetBuyersByLoanId();
  }, []);
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
console.log(year,month,day)
  const ObligationByDate = () => {
    setloading(true);
    axios
      .get(Routes.ObligationByDate, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          dt:`${year.value}/${month.value}/${day.value}`
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {

          setViewEltezam(true)
          setDefaultObligation(res.data.value.response);   
        document.getElementById("obligationViewer").value = res.data.value.response
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
              ObligationByDate();
            }
          }
        }
      });
  };

  
  //================================================================================
  const GetBuyersByLoanId = () => {
    setloading(true);

    axios
      .post(
        Routes.GetBuyersByLoanId,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            loanId: lastSegment,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          setBuyersList(res.data.value.response);
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
              GetBuyersByLoanId();
            }
          }
        }
      });
  };
  //================================================================================
  const CalculateMoratorium = () => {
    setloading(true);
    axios
      .post(
        Routes.CalculateMoratorium,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            loanId: lastSegment.toString(),
            newDate: `${year.label}/${month.value}/${day.value}`,
            obligationValue: obligationType?obligationAmount:defaultObligation,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          setViewStep2(true);
          setTimeout(() => {
            document
              .getElementById("step2")
              .scrollIntoView({ behavior: "smooth" });
          }, 100);
          setBaseAmount(res.data.value.response.baseAmount);
          setTotalDebt(res.data.value.response.totalAmount);
          setBenefitAmount(res.data.value.response.benefitAmount);
        setEffectiveDay(day.value);
        setEffectiveMonth(month.value);
        setEffectiveYear(year.label)
        setCalculatedObligation(res.data.value.response.obligationValue)
        setRangeDays(res.data.value.response.totalDays)
        } else {
          setErrorTextC(res.data.message);
          setTimeout(() => {
            setErrorTextC("");
          }, 5000);
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
              CalculateMoratorium();
            }
          }
        }
      });
  };

  //================================================================================
  const ChecksList = () => {
    setloading(true);
    axios
      .get(Routes.ChecksList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: lastSegment,
          pageSize: 200,
          pageNumber: 1,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setCheckList(res.data.value.response.checksList);
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
              ChecksList();
            }
          }
        }
      });
  };
  //================================================================================
  const SubmitMoratorium = () => {
    setloading(true);
    axios
      .post(
        Routes.SubmitMoratorium,
        {
          loanId: lastSegment.toString(),
          description: submitDesc,
          dueDate: `${year.label}/${month.value}/${day.value}`,
          checks: jsonObj.checks,

        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          toast(
            <PNotify
              title=""
              icon="fas fa-exclamation"
              text="عملیات استمهال با موفقیت انجام شد"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          history.goBack();

          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
              SubmitMoratorium();
            }
          }
        }
      });
  };
  //================================================================================
  const AddLoanDocuments = () => {
    setloading(true);
    axios
      .post(
        Routes.AddLoanDocuments,
        {
          itemId: lastSegment,
          docs: allFiles,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
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
              AddLoanDocuments();
            }
          }
        }
      });
  };
  //================================================================================
  const handleObligationChange=() =>{
if (!obligationType){
  document.getElementById("obligationViewer").disabled = false;
  document.getElementById("obligationViewer").value = obligationAmount
  setObligationType(!obligationType)
}else{
  document.getElementById("obligationViewer").disabled = true;
  document.getElementById("obligationViewer").value = defaultObligation
  setObligationType(!obligationType)
}
setViewStep2(false)
  }
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChangeAmount = (event) =>
    setNewCheckAmount(addCommas(removeNonNumeric(event.target.value)));
  function extractTable() {
    var myT = document.getElementById("checksTable");
    var data;
    if (myT) {
      data = [...myT.rows].map((r) => [...r.cells].map((c) => c.innerText));
    }
    data.splice(0, 1);
    getTotal(data);
  }
  var total = 0;
  function getTotal(data) {
    for (let i = 0; i < data.length; i++) {
      total += parseFloat(data[i][3].replaceAll(",", ""));
    }
  }
  function validateDuplicate() {
    // let data = extractTable()
    let validSerial = false;
    let validSerial1 = false;
    let validSerial2 = false;
    let validSayad = false;
    let validSayad1 = false;
    let validSayad2 = false;
    let validAmount = false;

    //--------------serialCheck----------
    if (checkList.length > 0) {
      for (let x of checkList) {
        if (parseInt(x.checkNumber) === parseInt(newCheckSerial)) {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="شماره سریال چک قبلا ثبت شده است"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
          validSerial1 = false;
          break;
        } else {
          validSerial1 = true;
        }
      }
    } else {
      validSerial1 = true;
    }
    if (jsonObj.checks.length > 0) {
      for (let x of jsonObj.checks) {
        if (parseInt(x.checkNumber) === parseInt(newCheckSerial)) {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="شماره سریال چک قبلا ثبت شده است"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
          validSerial2 = false;
          break;
        } else {
          validSerial2 = true;
        }
      }
    } else {
      validSerial2 = true;
    }

    if (validSerial1 && validSerial2) {
      validSerial = true;
    } else {
      validSerial = false;
    }
    //--------------sayadCheck----------
    if (checkList.length > 0) {
      for (let x of checkList) {
        if (parseInt(x.sayyadNumber) === parseInt(newCheckSayad)) {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="شناسه صیاد چک قبلا ثبت شده است"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
          validSayad1 = false;
          break;
        } else {
          validSayad1 = true;
        }
      }
    } else {
      validSayad1 = true;
    }
    if (jsonObj.checks.length > 0) {
      for (let x of jsonObj.checks) {
        if (parseInt(x.sayyadNumber) === parseInt(newCheckSayad)) {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="شناسه صیاد چک قبلا ثبت شده است"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
          validSayad2 = false;
          break;
        } else {
          validSayad2 = true;
        }
      }
    } else {
      validSayad2 = true;
    }

    if (validSayad1 && validSayad2) {
      validSayad = true;
    } else {
      validSayad = false;
    }
    //-------------amountCheck--------------
    let total1 = 0;
    let total2 = 0;
    if (jsonObj.checks.length > 0) {
      for (let x of jsonObj.checks) {
        total2 += parseFloat(x.amount);
      }
    } else {
      total2 = 0;
    }
    let theWhole =
      parseFloat(newCheckAmount.toString().replaceAll(",", "")) +
      total1 +
      total2;
    if (theWhole > parseFloat(totalDebt.toString().replaceAll(",", ""))) {
      toast(
        <PNotify
          title="خطا!"
          icon="fas fa-exclamation"
          text="مبلغ وارد شده معتبر نمیباشد "
        />,
        {
          containerId: "bottom-bar",
          className: "notification-warning",
        }
      );
      validAmount = false;
    } else {
      validAmount = true;
    }
    //-------------------------------------
    if (validAmount && validSayad && validSerial) {
      addToTable();
      clearForm();
    }
  }

  function validateChecksAmount() {
    if (total === parseInt(totalDebt.toString().replaceAll(",", ""))) {
      setVlaidAmount(true);
      SubmitMoratorium();
    } else {
      toast(
        <PNotify
          title="خطا!"
          icon="fas fa-exclamation"
          text="مجموع مبلغ لیست چک با کل بدهی برابر نیست"
        />,
        {
          containerId: "bottom-bar",
          className: "notification-warning",
        }
      );
      setVlaidAmount(false);
    }
  }

  var myTBody = document.getElementById("checksTable")
    ? document.getElementById("checksTable").getElementsByTagName("tbody")
        .innerHTML
    : null;

  useEffect(() => {
    if (selectedFile) {
      let newFile = { document: selectedFile, fileName: nameFile };
      setAllFiles([...allFiles, newFile]);
      setNameFile("");
    }
  }, [selectedFile]);
console.log(obligationType)
const[addTextError,setAddTextError]=useState("")

function AddCheckValidation (){
  if(   newCheckSayad &&
    newCheckAmount &&
    newCheckOwner &&
    effectiveDay &&
    effectiveMonth &&
    effectiveYear &&
    newCheckBank &&
    newCheckSerial){
      validateDuplicate();
    }else{
      if (!newCheckBank){
        setAddTextError(" عهده انتخاب نشده است")
    }
    if (!effectiveYear){
      setAddTextError(" سال تاریخ موثر وارد نشده است")
    }
    if (!effectiveMonth){
      setAddTextError(" ماه تاریخ موثر وارد نشده است")
    } 
    if (!effectiveDay){
      setAddTextError(" روز تاریخ موثر وارد نشده است")
    } 
    if (!newCheckOwner){
      setAddTextError(" طرف چک وارد نشده است")
    }   
    if (!newCheckAmount){
      setAddTextError(" مبلغ وارد نشده است")
    } 
    if (!newCheckSayad){
      setAddTextError(" شناسه صیاد وارد نشده است")
      
    }
      if (!newCheckSerial){
        setAddTextError(" شماره سریال وارد نشده است")
      }
      setTimeout(() => {
        setAddTextError("")
      }, 3000);
    } 
}
  return (
    <>
      <Breadcrumb current={`استمهال قسط `} />
      <Card style={{ direction: "rtl" }}>
        <Card.Body>
          <div className="txt-al-c f-s-14 mg-t-10">
            مشخصات چک های واگذار شده
            <div className="scrolls-horizontal">

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
                  <th className="text-center">مبلغ(ریال)</th>
                  <th className="text-center">طرف چک</th>
                  <th className="text-center">عهده</th>
                  <th className="text-center">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {checkList ? (
                  checkList.length > 0 ? (
                    checkList.map((c, index) => {
                      return (
                        <>
                          <tr className="deleted-color">
                            <td className="txt-al-c">{index + 1}</td>
                            <td className="txt-al-c">{c.sayyadNumber}</td>
                            <td className="txt-al-c">{c.dueDate}</td>
                            <td className="txt-al-c">{c.effectiveDate}</td>
                            <td className="txt-al-c">
                              {c.amount.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </td>
                            <td className="txt-al-c">{c.ownerName}</td>
                            <td className="txt-al-c">{c.bankName}</td>
                            <td className="txt-al-c">{c.stateTitle}</td>
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
                  )
                ) : null}
              </tbody>
            </Table>
            </div>
          </div>
          <form id="addCheckForm">
            <Row>
              <Form.Group as={Col} lg={12}>
                {" "}
                <div style={{ textAlign: "right" }}> تاریخ سررسید جدید </div>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={2}
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
                  placeholder="روز"
                  onChange={(e) => {
                    setDay(e);setViewEltezam(false)
                  }}
                  options={days}
                  value={day}
                  disabled={!year || !month}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={2}
                className="align-items-center"
                style={{
                  fontFamily: "DIROOZ-FD",
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                {" "}
                <Select
                  style={{
                    fontFamily: "DIROOZ-FD",
                    direction: "rtl",
                    textAlign: "right",
                  }}
                  value={month}
                  placeholder="ماه"
                  onChange={(e) => {
                    setMonth(e);setViewEltezam(false)
                  }}
                  disabled={!year}
                  options={months}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={2}
                className="align-items-center"
                style={{
                  fontFamily: "DIROOZ-FD",
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                {" "}
                <Select
                  style={{
                    fontFamily: "DIROOZ-FD",
                    direction: "rtl",
                    textAlign: "right",
                  }}
                  placeholder="سال"
                  value={year}
                  options={newYears}
                  onChange={(e) => {
                    setYear(e);setViewEltezam(false)
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} lg={2}>
                <Button
                  style={{
                    width: "200px",
                    backgroundColor: "#4BB543",
                    fontFamily: "DIROOZ-FD",
                  }}
                  onClick={() => {
                    ObligationByDate()
                  }}
                  className="margin-auto"
                  variant="primary"
                  disabled={day && month && year ? false : true}
                  id="step2"
                >
تایید                </Button>
              </Form.Group>
           {viewEltezam?<> <Form.Group as={Col} lg={12}>
                {" "}
                <div style={{ textAlign: "right" }}>  نرخ وجه التزام (%) </div>
              </Form.Group>
              <Form.Group as={Col} lg={3} className="">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        height: "47px",
                      }}
                    >
                      <CFormSelect
                        style={{
                          color: "black",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                        value={obligationType}
                        onChange={handleObligationChange}
                        className=""
                        id="newBank"
                      >
                        {/* <option>انتخاب</option> */}

                        {obligationTypes
                          ? obligationTypes.map((ck) => {
                              return (
                                <>
                                  <option value={ck.value}>{ck.label}</option>
                                </>
                              );
                            })
                          : null}
                      </CFormSelect>
                      </div>
                      </Form.Group>
              <Form.Group as={Col} lg={3} className="" >
                      <Form.Control
                      disabled={obligationType?false:true}
                        onChange={(e)=>{setObligationAmount(e.target.value);setViewStep2(false)}}
                        id="obligationViewer"
                      />
                    </Form.Group>
              <Form.Group as={Col} lg={2}>
                <Button
                  style={{
                    width: "200px",
                    backgroundColor: "#4BB543",
                    fontFamily: "DIROOZ-FD",
                  }}
                  onClick={() => {
                    CalculateMoratorium();
                    setTimeout(() => {
                      document
                        .getElementById("step2")
                        .scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="margin-auto"
                  variant="primary"
                  disabled={day && month && year ? false : true}
                  id="step2"
                >
                  محاسبه
                </Button>
              </Form.Group></>  :null}
              {errorTextC ? (
                <div className="error-text col-12 txt-al-r">{errorTextC}</div>
              ) : null}
            </Row>
          </form>
          {viewStep2 && viewEltezam? (
            <>
              <Form.Group as={Col} lg={12}></Form.Group>

              <Form.Group style={{ margin: "60px 0px" }}>
                <Row>
                {/* <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
وجه التزام                    <Form.Group as={Col} lg={12} className="p-0">
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
                        onChange={(e) => {
                          setObligationType(e.target.value);
                        }}
                        onFocus={() => setErrors({ ...errors, date: "" })}
                        value={obligationType}
                        id=""
                      >
                        <option value="1">پیش فرض</option>
             
                        <option value="2">دستی</option>

                      </CFormSelect>
                      </div>
                    </Form.Group>
                    </div>*/}
                    <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
وجه التزام
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={calculatedObligation}
                        // disabled={obligationType== 1 ? true:false}
                        id=""
                        // onChange={(e)=>setObligationAmount(e.target.value)}
                        maxLength={3}
                      />
                    </Form.Group>
                    </div> 
                    <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
بازه (روز)
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={rangeDays}
                      />
                    </Form.Group>
                    </div> 
                  <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                    سررسید جدید{" "}
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={year.label + "/" + month.value + "/" + day.value}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                    اصل بدهی(ریال){" "}
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={baseAmount
                          .toString()
                          .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                    سود (ریال){" "}
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={benefitAmount
                          .toString()
                          .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                    کل مبلغ بدهی(ریال){" "}
                    <Form.Group as={Col} lg={12} className="p-0">
                      <Form.Control
                        value={totalDebt
                          .toString()
                          .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        id="step3"
                      />
                    </Form.Group>
                  </div>
                 
                  <div className="col-6 txt-al-r mg-t-20 grey-form-heading">

                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                    }}
                    onClick={() => {
                      setViewStep3(true);
                      setTimeout(() => {
                        document
                          .getElementById("step3")
                          .scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="mg-t-10 mg-r-10"
                    variant="primary"
                  >
                    <TiInputChecked
                      style={{ fontSize: "19px", margin: "0 2px" }}
                    />
                    تایید
                  </Button>
                  </div>
                </Row>
              </Form.Group>
            </>
          ) : null}

          {viewStep3&&viewStep2&&viewEltezam ? (
            <>
              <Form.Group as={Col} lg={12}></Form.Group>
              <div className="row">
                <Col lg={6}>
                  <MaxLengthInput
                    as="textarea"
                    placeholder="توضیحات"
                    rows={3}
                    maxLength={300}
                    onChange={(e) => setSubmitDesc(e.target.value)}
                  />
                </Col>{" "}
                <Form.Group
                  as={Col}
                  lg={6}
                  className="align-items-center"
                  style={{
                    fontFamily: "DIROOZ-FD",
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      // marginTop: 20,
                      // padding: "0px 15px",
                    }}
                  >
                    <span
                      style={{
                        color: errors.selectedFile ? "red" : "unset",
                      }}
                      className={
                        errors.selectedFile ? "" : "#grey-form-heading"
                      }
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
                          border: "1px solid #e7e7e7",
                          width: "95%",
                          padding: 5,
                          boxSizing: "border-box",
                          display: "flex",
                          direction: "rtl",
                          justifyContent:
                            allFiles.length > 0 ? "flex-start" : "flex-end",
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
                          <span>jpg - jpeg - png - pdf - gif - bmp - tif</span>
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
                          setErrors({
                            ...errors,
                            selectedFile: "",
                          });
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
                </Form.Group>{" "}
              </div>
              <Form.Group as={Col} lg={12}></Form.Group>
              <div className="col-12 row txt-al-c mg-b-20">
                <strong className="margin-auto">ثبت چک های جدید</strong>
              </div>

              <Row>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  شماره سریال{" "}
                  <Form.Group as={Col} lg={12} className="p-0">
                    <Form.Control
                      type="number"
                      maxLength={15}
                      style={{ marginBottom: "10px" }}
                      onChange={(e) => setNewCheckSerial(e.target.value)}
                      value={newCheckSerial}
                    />
                  </Form.Group>
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  شناسه صیاد{" "}
                  <Form.Group as={Col} lg={12} className="p-0">
                    <Form.Control
                      type="number"
                      maxLength={15}
                      style={{ marginBottom: "10px" }}
                      onChange={(e) => setNewCheckSayad(e.target.value)}
                      value={newCheckSayad}
                      id="cellTwo"
                    />
                  </Form.Group>
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  مبلغ(ریال){" "}
                  <Form.Group as={Col} lg={12} className="p-0">
                    <Form.Control
                      type="text"
                      maxLength={22}
                      style={{ marginBottom: "10px" }}
                      onChange={handleChangeAmount}
                      value={newCheckAmount}
                      id="cellFive"
                    />
                  </Form.Group>
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  طرف چک
                  <Form.Group as={Col} lg={12} className="p-0">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        height: "47px",
                      }}
                    >
                      <CFormSelect
                        style={{
                          color: "black",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                        value={newCheckOwner}
                        onChange={(e) => setNewCheckOwner(e.target.value)}
                        className=""
                        id="newBank"
                      >
                        <option>انتخاب</option>

                        {BuyersList
                          ? BuyersList.map((ck) => {
                              return (
                                <>
                                  <option value={ck.id}>{ck.name}</option>
                                </>
                              );
                            })
                          : null}
                      </CFormSelect>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  تاریخ سررسید{" "}
                  <Form.Group as={Col} lg={12} className="p-0">
                    <Form.Control
                      type="text"
                      style={{ marginBottom: "10px" }}
                      value={year.label + "/" + month.value + "/" + day.value}
                    />
                  </Form.Group>
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  تاریخ موثر{" "}
                  <Form.Group
                    as={Col}
                    lg={12}
                    style={{ textAlign: "right", padding: "0" }}
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
                        onChange={(e) => {
                          setEffectiveDay(e.target.value);
                        }}
                        onFocus={() => setErrors({ ...errors, date: "" })}
                        value={effectiveDay}
                        id="effeDay"
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
                        value={effectiveMonth}
                        onChange={(e) => {
                          setEffectiveMonth(e.target.value);
                        }}
                        id="effeMonth"
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
                        value={effectiveYear}
                        onChange={(e) => {
                          setEffectiveYear(e.target.value);
                        }}
                        id="effeYear"
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
                </div>
                <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
                  عهده
                  <Form.Group as={Col} lg={12} className="p-0">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        height: "47px",
                      }}
                    >
                      <CFormSelect
                        style={{
                          color: "black",
                          width: "100%",
                        }}
                        value={newCheckBank}
                        onChange={(e) => setNewCheckBank(e.target.value)}
                        className=""
                        id="cellSeven"
                      >
                        <option>انتخاب</option>

                        {banks
                          ? banks.map((ck) => {
                              return (
                                <>
                                  <option value={ck.value}>{ck.label}</option>
                                </>
                              );
                            })
                          : null}
                      </CFormSelect>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-3" style={{ position: "relative" }}>
                  <Button
                    style={{
                      width: "97%",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      position: "absolute",
                      bottom: "12%",
                      right: 0,
                    }}
                    //   onClick={() => {

                    //   }}
                    className=""
                    variant="primary"
                    // disabled={
                    //   newCheckSayad &&
                    //   newCheckAmount &&
                    //   newCheckOwner &&
                    //   effectiveDay &&
                    //   effectiveMonth &&
                    //   effectiveYear &&
                    //   newCheckBank &&
                    //   newCheckSerial
                    //     ? false
                    //     : true
                    // }
                    onClick={() => {
                      AddCheckValidation()                
                    }}
                  >
                    <TbChecklist
                      style={{ fontSize: "19px", margin: "0 2px" }}
                    />
                    ثبت چک
                  </Button>
                </div>
                <div className="col-3" style={{ position: "relative" }}>
                  <Button
                    style={{
                      width: "97%",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      position: "absolute",
                      bottom: "12%",
                      right: 0,
                    }}
                    onClick={() => {
                      extractTable();
                      validateChecksAmount();
                    }}
                    className="margin-auto"
                    variant="primary"
                    // disabled={!validAmount}
                  >
                    <TiInputChecked
                      style={{ fontSize: "19px", margin: "0 2px" }}
                    />
                    تایید نهایی عملیات{" "}
                  </Button>
                </div>
                <div className="error-text">{addTextError}</div>
              </Row>

              <div style={{ minHeight: "300px" }}>
                {" "}
                <Table
                  style={{ marginTop: "50px", direction: "rtl" }}
                  className="buyers-table"
                  responsive=""
                  bordered
                  id="checksTable"
                >
                  <thead>
                    <tr>
                      <th className="text-center">شناسه صیاد</th>
                      <th className="text-center">تاریخ سررسید </th>
                      <th className="text-center">تاریخ موثر </th>
                      <th className="text-center">مبلغ(ریال)</th>
                      <th className="text-center">طرف چک</th>
                      <th className="text-center">عهده</th>
                      <th className="text-center">حذف</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
              </div>
            </>
          ) : null}
        </Card.Body>
      </Card>{" "}
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
            onClick={() => {
              closeModal();
            }}
          >
            تایید
          </CButton>
        </Card.Footer>
      </Modal>
      {loading === true ? <Loading /> : null}
    </>
  );
}

export default Postponement;
