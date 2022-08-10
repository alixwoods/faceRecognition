import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Table, Form, Modal, Button } from "react-bootstrap";

import { Tabs, Tab } from "react-bootstrap";
import {
  Tabs as ReactTabs,
  TabList as ReactTabList,
  Tab as ReactTab,
  TabPanel as ReactTabPanel,
} from "react-tabs";
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
import Loading from "../components/Loading/Example";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { TiInputChecked } from "react-icons/ti";
import GetAppIcon from "@material-ui/icons/GetApp";
import CIcon from "@coreui/icons-react";

import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import moment from "moment-jalaali";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker2";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { TbChecklist } from "react-icons/tb";

import CloseIcon from "@material-ui/icons/Close";
import { withCardActions, withMaxLength } from "../components/hoc/index";
import { set } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel, { formLabelClasses } from "@mui/material/FormLabel";
// import "./myStyles.css";
import { RefreshToken } from "./ref";

const CardWithActions = withCardActions(Card);
const MaxLengthInput = withMaxLength(Form.Control);

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
var jsonObj = {};
function detailTest(props) {
  const classes = useStyles();
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

  const downloadDoc = (id, title) => {
    let url = id;
    var a = window.document.createElement("a");
    a.href = url;
    a.download = title;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
  };
  const [modalDoc, setmodalDoc] = useState(false);
  function closeModalDoc() {
    setmodalDoc(false);
  }
  const [modal, setModal] = useState(-1);
  function closeModalA() {
    setModalA(false);
  }
  function closeModal() {
    setModal(-1);
  }
  function closeModalP() {
    setModalP(false);
  }
  function closeModalE() {
    setModalE(false);
  }
  function closeModalC() {
    setModalC(false);
  }
  function closeModalG() {
    setModalG(false);
  }
  function closeModalF() {
    setModalF(false);
  }
  const [loading, setloading] = useState(false);
  const [activity, setactivity] = useState("");
  const [loanCount, setloanCount] = useState("");
  const [nationalId, setnationalId] = useState("");
  const [phone, setphone] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [price, setprice] = useState("");
  const [restPrice, setrestPrice] = useState("");
  const [registerDate, setregisterDate] = useState("");
  const [registerNum, setregisterNum] = useState("");
  const [registerPlace, setregisterPlace] = useState("");
  const [sharesCount, setsharesCount] = useState("");
  const [stateTitle, setstateTitle] = useState("");

  const [buyers, setbuyers] = useState([]);
  const [currDealStateTitle, setCurrDealStateTitle] = useState("");
  const [contractProperty, setContractProperty] = useState("");
  const [dealNewState, setDealNewState] = useState("");
  const [dealStatesDrop, setDealStatesDrop] = useState([]);
  const [balanceDes, setBalanceDes] = useState("انجام معامله نیشکر هفت تپه");
  const [balancedate, setBalancedate] = useState("1401/01/01");
  const [balanceDebtor, setBalanceDebtor] = useState("100,000,000,000");
  const [balanceCreditor, setBalanceCreditor] = useState("0");
  const [balanceRemain, setBalanceRemain] = useState("-100,000,000,000");
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [newCheckSerial, setNewCheckSerial] = useState("");
  const [newCheckSayad, setNewCheckSayad] = useState("");
  const [newCheckOwner, setNewCheckOwner] = useState("");
  const [newCheckDate, setNewCheckDate] = useState("");
  const [newCheckAmount, setNewCheckAmount] = useState("");
  const [effectiveDay, setEffectiveDay] = useState("");
  const [effectiveMonth, setEffectiveMonth] = useState("");
  const [effectiveYear, setEffectiveYear] = useState("");
  const [BuyersList, setBuyersList] = useState("");
  const [newCheckBank, setNewCheckBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [totalDebt, setTotalDebt] = useState("");
  const [validAmount, setVlaidAmount] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [edditingRow, setEdditingRow] = useState("");
  const [View, setView] = useState(true);
  const [loanFullDetails, setLoanFullDetails] = useState("");
  const [loanTotal, setLoanTotal] = useState("");
  const [submitedTotal, setSubmitedTotal] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");
  const [editingEffectiveDay, setEditingEffectiveDay] = useState("11");
  const [editingEffectiveMonth, setEditingEffectiveMonth] = useState("11");
  const [editingEffectiveYear, setEditingEffectiveYear] = useState("1402");
  const [changingCheck, setChangingCheck] = useState("");
  const [obligationType, setObligationType] = useState(false);
  const [editingOwnerId, setEditingOwnerId] = useState("2");
  const [editingId, setEditingId] = useState("2");
  const [editingCheckNumber, setEditingCheckNumber] = useState("133456");
  const [editingBankId, setEditingBankId] = useState("5");
  const [editingSayyadNumber, setEditingSayyadNumber] = useState("1234556");
  const [editingAmount, setEditingAmount] = useState("2321");
  const [deleteCheckId, setDeleteCheckId] = useState("");
  const [loanHistoryDetail, setLoanHistoryDetail] = useState("");
  const [loanDoc, setLoanDoc] = useState("");
  const [loanDocId, setLoanDocId] = useState("");
  const [IdPic, setIdPic] = useState("");
  const [ModalDelete, setModalDelete] = useState(false);
  const [modalP, setModalP] = useState(false);
  const [modalE, setModalE] = useState(false);
  const [modalF, setModalF] = useState(false);

  const [modalC, setModalC] = useState(false);
  const [modalG, setModalG] = useState(false);

  const [dueDateD, setDueDateD] = useState("");
  const [dueDateM, setDueDateM] = useState("");
  const [dueDateY, setDueDateY] = useState("");

  useEffect(() => {
    if (modal === -1) {
      setDeleteCheckId("");
      setEditingAmount("");
      setEditingBankId("");
      setEditingCheckNumber("");
      setEditingDueDate("");
      setEditingEffectiveDay("");
      setEditingEffectiveMonth("");
      setEditingEffectiveYear("");
      setEditingId("");
      setEditingOwnerId("");
      setEditingSayyadNumber("");
      setNewCheckAmount("");
      setNewCheckBank("");
      setNewCheckDate("");
      setNewCheckOwner("");
      setNewCheckSayad("");
      setNewCheckSerial("");
    }
    setView(true);
  }, [modal]);
  //===============================================================
  const DealingItemStateDrop = () => {
    setloading(true);
    axios
      .get(Routes.DealingItemStateDrop, {
        headers: {},
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setDealStatesDrop(res.data.value.response);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
      })
      .catch(async (err) => {
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              DealingItemStateDrop();
            }
          }
        }
      });
  };
  //===========================================================================
  const GetBuyersByLoanId = (id) => {
    setloading(true);

    axios
      .post(
        Routes.GetBuyersByLoanId,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            loanId: id,
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetBuyersByLoanId(id);
            }
          }
        }
      });
  };
  //-----------------------------------------------------------------------
  const DeleteCheck = (id) => {
    setloading(true);

    axios
      .post(
        Routes.DeleteCheck,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Id: id,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          toast(
            <PNotify
              title=""
              icon="fas fa-exclamation"
              text="عملیات با موفقیت انجام شد!"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          ChecksList(loanFullDetails.id);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
        setloading(false);
      })

      .catch(async (err) => {
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              DeleteCheck(id);
            }
          }
        }
      });
  };
  //------------------------------------------------------------------------
  const ObligationByDate = () => {
    setloading(true);
    axios
      .get(Routes.ObligationByDate, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          dt:
            dayAction.length>1 && monthAction.length>1 && yearAction.length>1
              ? `${yearAction}/${monthAction}/${dayAction}`
              : "",
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setDefaultObligation(res.data.value.response);
          document.getElementById("obligationViewer").value =
            res.data.value.response;
            setObligationType(false)
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
              ObligationByDate();
            }
          }
        }
      });
  };  
  //------------------------------------------------------------------------
  const GetCheck = (id) => {
    setloading(true);
    axios
      .get(Routes.GetCheck, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          checkId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setEditingAmount(res.data.value.response.amount);
          setEditingBankId();
          setEditingBankId(res.data.value.response.bankId);
          setEditingCheckNumber(res.data.value.response.checkNumber);
          setEditingDueDate(res.data.value.response.dueDate);
          setEditingEffectiveDay(
            res.data.value.response.effectiveDate.split("/")[2]
          );
          setEditingEffectiveMonth(
            res.data.value.response.effectiveDate.split("/")[1]
          );
          setEditingEffectiveYear(
            res.data.value.response.effectiveDate.split("/")[0]
          );
          setEditingId(res.data.value.response.id);
          setEditingOwnerId(res.data.value.response.ownerId);
          setEditingSayyadNumber(res.data.value.response.sayyadNumber);
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در دریافت اطلاعات چک"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetCheck(id);
            }
          }
        }
      });
  };
  //------------------------------------------------------------------------
  const LoanHistory = (id) => {
    setloading(true);
    axios
      .get(Routes.LoanHistory, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoanHistoryDetail(res.data.value.response);
          setModal(6);
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در دریافت اطلاعات چک"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              LoanHistory(id);
            }
          }
        }
      });
  };
  //------------------------------------------------------------------------
  const [DeleteId, setDeleteId] = useState("");
  const LoanDocument = (id) => {
    setloading(true);
    axios
      .get(Routes.GetLoanDocument, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoanDoc(res.data.value.response);
          setmodalDoc(true);
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در دریافت اطلاعات چک"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              LoanDocument();
            }
          }
        }
      });
  };
  //------------------------------------------------------------------------

  function numberWithCommas2(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
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
  const GetCheckC = (id) => {
    setloading(true);
    axios
      .get(Routes.GetCheck, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          checkId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setChangingCheck(res.data.value.response);
          setModalC(true);
          clearForm();
          jsonObj = [];
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در دریافت اطلاعات چک"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetCheckC(id);
            }
          }
        }
      });
  };

  //------------------------------------------------------------------------
  const ChecksList = (id) => {
    setloading(true);
    axios
      .get(Routes.ChecksList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: id,
          pageSize: 200,
          pageNumber: 1,
          stateId: 1,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setCheckList(res.data.value.response.checksList);
          getSubmitedChecksTotal(res.data.value.response.checksList);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
        setloading(false);
      })

      .catch(async (err) => {
        setloading(false);
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
  // ---------------------------------------------------------------------------
  const GetLoanById = (id) => {
    setloading(true);
    axios
      .get(Routes.GetLoanById, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoanFullDetails(res.data.value.response);
          setLoanTotal(
            res.data.value.response.baseAmount +
              res.data.value.response.benefitAmount
          );
          setDueDateD(res.data.value.response.dueDate.toString().split("/")[2]);
          setDueDateM(res.data.value.response.dueDate.toString().split("/")[1]);
          setDueDateY(res.data.value.response.dueDate.toString().split("/")[0]);
          setEffectiveDay(
            res.data.value.response.dueDate.toString().split("/")[2]
          );
          setEffectiveMonth(
            res.data.value.response.dueDate.toString().split("/")[1]
          );
          setEffectiveYear(
            res.data.value.response.dueDate.toString().split("/")[0]
          );
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
        setloading(false);
      })

      .catch(async (err) => {
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetLoanById(id);
            }
          }
        }
      });
  };
  //============================================================================
  useEffect(() => {
    GetDealingFullDetails();
  }, []);


  const [thisDeal, setThisDeal] = useState("");
  var parts = window.location.href.split("?");
  var dealId = parts ? parts[1] : null;
  const GetDealingFullDetails = () => {
    setloading(true);
    axios
      .get(Routes.GetDealingFullDetails, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          id: dealId,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setThisDeal(res.data.value.response);
          LoansList();
          DealingItemStateDrop();
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
        setloading(false);
        BankDropDown();
      })
      .catch(async (err) => {
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetDealingFullDetails();
            }
          }
        }
      });
  };

  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");
  const [table, settable] = useState("");
  const [selectedBaseAmount, setSelectedBaseAmount] = useState("");
  const [selectedBenefitAmount, setSelectedBenefitAmount] = useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    LoansList();
  }, [page]);
  const [finantialDetails, setFinantialDetails] = useState("");
  const LoansList = () => {
    setloading(true);
    axios
      .get(Routes.LoansList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          DealingItemId: dealId,
          pageSize: 10,
          pageNumber: page,
          // pageNumber:2
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setCountPage(res.data.value.response.count / 10);
          settable(res.data.value.response.loansList);
          setFinantialDetails(res.data.value.response.financeDetails);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }

        setloading(false);
      })
      .catch(async (err) => {
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              LoansList();
            }
          }
        }
      });
  };

  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState("");
  const [SerialNum, setSerialNum] = useState("");
  const [Bank, setBank] = useState("");
  const [SayadNum, setSayadNum] = useState("");
  const [Desc, setDesc] = useState("");
  const [IssueNum, setIssueNum] = useState("");
  const [AmountNum, setAmountNum] = useState("");
  const [AmountCalculate, setAmountCalculate] = useState("");
  const [BankCalculate, setBankCalculate] = useState("");
  const [obligationAmount, setObligationAmount] = useState("");
  const [defaultObligation, setDefaultObligation] = useState("");

  const [AccordianOne, setAccordianOne] = useState(false);
  const [TypeAction, setTypeAction] = useState("");
  const [changeCheckDes, setChangeCheckDes] = useState("");
  const [Indicator, setIndicator] = useState("");
  const [Indicator2, setIndicator2] = useState("");

  const [Inflation, setInflation] = useState("");
  const [Inflation2, setInflation2] = useState("");
  const [modalA, setModalA] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [changeStateDes, setChangeStateDes] = useState("");

  const [types, setType] = useState([
    {
      label: "تهاتر",
      value: "1",
    },
    {
      label: "واریز نقدی",
      value: "2",
    },
    // {
    //   label: "چک",
    //   value: "3",
    // },
    {
      label: "حکم قضایی",
      value: "4",
    },
    {
      label: "بخشودگی جرایم",
      value: "5",
    },
    {
      label: "پاداش خوش حسابی",
      value: "6",
    },
  ]);

  const [DateText, setDateText] = useState("تاریخ");
  useEffect(() => {
    TextChange();
  }, [TypeAction]);
  function TextChange() {
    if (TypeAction == 1) {
      setDateText("تاریخ تهاتر");
    } else if (TypeAction == 2) {
      setDateText("تاریخ پرداخت");
    } else if (TypeAction == 4) {
      setDateText("تاریخ اعمال");
    } else if (TypeAction == 5) {
      setDateText("تاریخ اعمال");
    } else if (TypeAction == 6) {
      setDateText("تاریخ اعمال");
    }
  }
  const [TypeState, setTypeState] = useState("");
  const [TypeStates, setTypeStates] = useState([
    {
      label: "بدهکار",
      value: "1",
    },
    {
      label: "بستانکار",
      value: "2",
    },
  ]);

  const [Inflations, setInflations] = useState([
    {
      label: "بانک مرکزی",
      value: "1",
    },
    {
      label: "دستی",
      value: "2",
    },
  ]);

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
  //---------------------------------------------------
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
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
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
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
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
    if (checkList.length > 0) {
      for (let x of checkList) {
        total1 += parseFloat(x.amount);
      }
    } else {
      total1 = 0;
    }
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
        total2 += parseFloat(x.amount.toString().replaceAll(",", ""));
      }
    } else {
      total2 = 0;
    }
    let theWhole =
      parseFloat(newCheckAmount.toString().replaceAll(",", "")) +
      total1 +
      total2;
    if (theWhole > loanTotal) {
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
  //-------------------------------------------------

  //-----------------------------------------------
  function validateDuplicateC() {
    // let data = extractTable()
    let validSerial = false;
    let validSerial1 = false;
    let validSerial2 = false;
    let validSayad = false;
    let validSayad1 = false;
    let validSayad2 = false;
    let validAmount = false;

    //--------------serialCheck----------
    if (changingCheck) {
      if (parseInt(changingCheck.checkNumber) === parseInt(newCheckSerial)) {
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
      } else {
        validSerial1 = true;
      }
    } else {
      validSerial1 = false;
    }
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
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
    if (changingCheck) {
      if (parseInt(changingCheck.sayyadNumber) === parseInt(newCheckSayad)) {
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
      } else {
        validSayad1 = true;
      }
    } else {
      validSayad1 = false;
    }
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
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
    let total2 = 0;
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
        total2 += parseInt(x.amount.toString().replaceAll(",", ""));
      }
    } else {
      total2 = 0;
    }

    if (
      total2 + parseInt(newCheckAmount.toString().replaceAll(",", "")) >
      changingCheck.amount
    ) {
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
      addToTableC();
      clearForm();
    }
  }
  //-----------------------------------------------
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
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  const [banksDrop, setBanksDrop] = useState([]);

  //--------------------------------------------------------------------
  const BankDropDown = () => {
    axios
      .get(Routes.BankDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setBanksDrop(res.data.value.response);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
      })
      .catch(async (err) => {
        setloading(false);
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
  //---------------------------------------------------
  const AddCheck = () => {
    setloading(true);
    axios
      .post(Routes.AddCheck, jsonObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          loanId: loanFullDetails.id,
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
          setModalA(false);
          ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
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
        setloading(false);

        if (err.response.status === 500) {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطای ناشناخته رخ داده است"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        } else if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              AddCheck();
            }
          }
        } else {
          toast(<PNotify title="خطا!" icon="fas fa-exclamation" text="" />, {
            containerId: "bottom-bar",
            className: "notification-warning",
          });
        }
      });
  };
  //---------------------------------------------------
  //---------------------------------------------------
  const EditCheck = () => {
    setloading(true);
    axios
      .post(
        Routes.EditCheck,
        {
          effectiveDate: `${editingEffectiveYear}/${editingEffectiveMonth}/${editingEffectiveDay}`,
          dueDate: editingDueDate,
          ownerId: editingOwnerId,
          id: editingId,
          checkNumber: editingCheckNumber,
          bankId: editingBankId,
          sayyadNumber: editingSayyadNumber,
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
              text="عملیات با موفقیت انجام شد"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          closeModalE();
          ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              EditCheck();
            }
          }
        }
      });
  };
  //---------------------------------------------------
  function decodeUTF16LE(binaryStr) {
    var cp = [];
    for (var i = 0; i < binaryStr.length; i += 2) {
      cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
    }

    return String.fromCharCode.apply(String, cp);
  }

  const ChangeCheck = () => {
    setloading(true);
    axios
      .post(
        Routes.ChangeCheck,

        { description: changeCheckDes, checks: jsonObj },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            currentCheckId: changingCheck.id,
          },
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
          closeModalC();
          closeModalF();
          setChangeCheckDes("");
          ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ChangeCheck();
            }
          }
        }
      });
  };
  //---------------------------------------------------
  function validateChecksAmount() {
    let totalS = 0;
    let totalJ = 0;
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
        totalJ += parseFloat(x.amount.toString().replaceAll(",", ""));
      }
    } else {
      totalJ = 0;
    }
    if (checkList.length > 0) {
      for (let x of checkList) {
        totalS += parseFloat(x.amount.toString().replaceAll(",", ""));
      }
    } else {
      totalS = 0;
    }
    if (
      totalS + totalJ ===
      parseFloat(loanTotal.toString().replaceAll(",", ""))
    ) {
      AddCheck();
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
    }
  }
  function validateChecksAmountC() {
    let totalS = 0;
    let totalJ = 0;
    if (jsonObj.length > 0) {
      for (let x of jsonObj) {
        totalJ += parseFloat(x.amount.toString().replaceAll(",", ""));
      }
    } else {
      totalJ = 0;
    }

    if (totalJ === parseFloat(changingCheck.amount)) {
      setModalF(true);
      clearForm();
    } else {
      toast(
        <PNotify
          title="خطا!"
          icon="fas fa-exclamation"
          text="مجموع مبلغ لیست چک ها با مبلغ چک قبلی برابر نیست"
        />,
        {
          containerId: "bottom-bar",
          className: "notification-warning",
        }
      );
    }
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
    setDay("");
    setMonth("");
    setYear("");
  }

  function extractTable() {
    var myT = document.getElementById("checksTable");
    var data;
    if (myT) {
      data = [...myT.rows].map((r) => [...r.cells].map((c) => c.innerText));
    }
    data.splice(0, 1);
    getTotal(data);
    return data;
  }
  var total = 0;
  function getTotal(data) {
    for (let i = 0; i < data.length; i++) {
      total += parseFloat(data[i][3].replaceAll(",", ""));
    }
  }
  function editRow(btn, value) {
    setEdditingRow(btn);
    var row = btn.parentNode.parentNode;
    setEditMode(true);
    setNewCheckSerial(row.cells[3].innerHTML);
    setNewCheckSayad(row.cells[0].innerHTML);
    setNewCheckAmount(row.cells[4].innerHTML.replaceAll(",", ""));
    setDay(row.cells[1].innerHTML.split("/")[2]);
    setMonth(row.cells[1].innerHTML.split("/")[1]);
    setYear(row.cells[1].innerHTML.split("/")[0]);
    setEffectiveDay(row.cells[2].innerHTML.split("/")[2]);
    setEffectiveMonth(row.cells[2].innerHTML.split("/")[1]);
    setEffectiveYear(row.cells[2].innerHTML.split("/")[0]);
    setNewCheckBank(row.cells[6].id);
    setNewCheckOwner(row.cells[5].id);
  }

  function deleteRow(btn, value) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    myRowsCount--;
    extractTable();
    const p = jsonObj.findIndex(
      (x) => x.sayyadNumber === row.cells[0].innerHTML
    );
    if (p !== undefined) jsonObj.splice(p, 1);
  }
  function deleteRowE(btn, value) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    myRowsCount--;
    extractTable();
    const p = jsonObj.findIndex(
      (x) => x.sayyadNumber === row.cells[0].innerHTML
    );
    if (p !== undefined) jsonObj.splice(p, 1);
  }
  var myRowsCount = 0;
  var el = document.getElementById("newBank");
  var owner = el ? el.options[el.selectedIndex].innerHTML : null;
  var owner1 = el ? el.options[el.selectedIndex].value : null;

  var dl = document.getElementById("cellSeven");
  var bankk = dl ? dl.options[dl.selectedIndex].innerHTML : null;
  var bankk1 = dl ? dl.options[dl.selectedIndex].value : null;

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
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);

    // cell1.innerHTML = document.getElementById('cellOne').value;
    cell1.innerHTML = document.getElementById("cellTwo").value;
    cell2.innerHTML = loanFullDetails ? loanFullDetails.dueDate : null;
    cell3.innerHTML = effectiveYear + "/" + effectiveMonth + "/" + effectiveDay;
    cell4.innerHTML = newCheckSerial;
    cell5.innerHTML = numberWithCommas(
      document.getElementById("cellFive").value
    );
    cell6.innerHTML = `<span>${owner}</span>`;
    cell6.id = owner1;
    cell7.innerHTML = `<span >${bankk}</span>`;
    cell7.id = bankk1;
    cell8.innerHTML = `${'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII=" onclick="deleteRow(this)" id = "deleteIcon" style="width:25px;cursor:pointer"/>'}`;
    cell9.innerHTML = `${'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFAElEQVR4nO3dT2gcZRjH8d8zuxsVcVu7TfWQNo1WCrag4CW5CpKAHkyxYAVBPHkJwu7aVhDUk/820WIvnkS9lOZg0YtF8BovBQX/IE3ZrERcNZPgHKxss/N4yK5O4v55Z+Z9Z2Znnu8pbN59Z9lP3pm8u0sCSJIkSZIkSZIkSZKUnCjuB5D0qs3mnfx34QUATwE4CSAH4AYTfW7dar1XO3bv7zqPJyADeqm+9bBL7hUAk32GOGy5zy4dGf9M1zEFpE/VNXuGgS8AFIcMdcH8/OLUwY90HFdAeuQDo5s2FAHZUwCMblpQBMRTCIxuoVEEpJMGjG6hUAQEWjG6BUbJPIgBjG6BUDINYhCjW5st95SffYpl6IFIO+XItT6prjYPqd4h0yC1o6UVAuYAOAYPU+T82IuqgzMNAkSFwk+ojsw8CBAJyv2qAwWkU+1oaQXkPgpgy8D0LdWBAuJpcXL8GgGPQ/9K+VF1YOpBzq7bE37Gmzh9EWNZdWyqQcp1e7q9je+rdfs1P/fTjFJv5//6QHVwakHKdXuaCFcBFJnwakwoDrvW/LuHD99UvUMqd+qVxh+PgK0vAdztvZ2Z31qaOnhex1wKOcyYXZoqfe3nTqkDGfYERoQSCANIGYjqE2cYJTAGkCIQvz/FhlBCYQApuahX1+wZsPUVfJzniehcub7xpp/jLE6OXwO5j6H35jE0BpCCFRL2JXRNK0ULBjDiILrezwiJktOFAYwwiHefoWM+Yrxemyr52qtU1+wZoPM6mKZGEsTUO31BVoruRg7E9NuucaOMFEgE74EDiBdlZECiwugWF8pIgESN0S0OlMSDxIXRLWqURIPEjdHJyeVx4u2J0noUB0vsSydJwWDGbFQYQEJXSJIwdO3AVUscSJYxgISBZB0DSBCIYOyUCBDB+K/YQQRjd7GCCMb/iw1EMHoXC4hg9C9yEMEYXKQggjG8yEAEQ61IQARDPeMgguEvoyCC4T9jIIIRLCMgghE87SCCES6tIIIRPm0ggqGnnI5Jzq7bE65LFwHKA9iPeF4jcwiYWxxhDMDAE3fuxua+do5fYaCqe+4BOQTM6fwUelwZ+Uk+zZybbNi/MmjcxPx7Sg0GYOhzWctEbQA/mJh7T6nCAAx+UM4FbZqau5PDjNk0YQAGQYiM/lGwkf9tql/GQNjFn4amdgiYSyMGYBDEMvN3p1J5mvJmboVY2kFSe5ryZu7T70wbGmdL9WnKm7mLuoVvNU2Vul9tBxUI5OV1pzRsTO3Ige8AuhJkfk+ZwgAC7NQXrvNtY4XNn5jxtMoppNKwHyTgpOtSyYK73wX2EeEugG5nohIxTgB8rMddM4cBBACp1DeeBNGn0HWRZaZKY+sCwAueWzOJAQQ4ZRHRM50vi0S4Wq7b06EeARFzu33Rc0tmMQCfK2Thul0cK6AJ4A7PzeFXCjNVGptbACjLGIDPFVLI8ynsxgB0rBQiBmg17Zs+lfydsiw60+c7oVF4m+ezsM8YlvIpq7raPMT5wi8A8gOGZWI3bTLlFcKFwhkMxgB0XegznDoI47TiUEEJkTIIAQ/5mLdIhEsqO3ppd34u6j8rjLlJwDKY51u3Dhx/Y6JoB31gWW3YNeHfmPkdIvqwx7dcBlaI6ONWiy+9/0DJ5DuFqc/XxrBc33iOiKrY+e/J34D48na7ffnCfff8ZubhSZIkSZIkSZIkSZIkxdk/tOLwTIMTlO8AAAAASUVORK5CYII=" onclick="editRow(this)" id = "editIcon" style="width:25px;cursor:pointer"/>'}`;

    document.getElementById("deleteIcon").addEventListener(
      "click",
      function() {
        deleteRow(this);
      },
      false
    );
    document.getElementById("editIcon").addEventListener(
      "click",
      function() {
        editRow(this, "row" + jsonObj.length);
      },
      false
    );

    extractTable();
    jsonObj.push({
      row: "row" + jsonObj.length,
      // dueDate: year + "/" + month + "/" + day,
      effectiveDate: effectiveYear + "/" + effectiveMonth + "/" + effectiveDay,
      ownerId: newCheckOwner,
      checkNumber: newCheckSerial,
      amount: newCheckAmount.replaceAll(",", ""),
      bankId: newCheckBank,
      sayyadNumber: newCheckSayad,
    });
  }
  //--------------------------------------------
  function addToTableC() {
    var table = document.getElementById("checksTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);

    // cell1.innerHTML = document.getElementById('cellOne').value;
    cell1.innerHTML = document.getElementById("cellTwo").value;
    cell2.innerHTML = loanFullDetails ? loanFullDetails.dueDate : null;
    cell3.innerHTML = changingCheck.effectiveDate;
    cell4.innerHTML = newCheckSerial;
    cell5.innerHTML = numberWithCommas(
      document.getElementById("cellFive").value
    );
    cell6.innerHTML = `<span>${owner}</span>`;
    cell6.id = owner1;
    cell7.innerHTML = `<span >${bankk}</span>`;
    cell7.id = bankk1;
    cell8.innerHTML = `${'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII=" onclick="deleteRow(this)" id = "deleteIcon" style="width:25px;cursor:pointer"/>'}`;
    cell9.innerHTML = `${'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFAElEQVR4nO3dT2gcZRjH8d8zuxsVcVu7TfWQNo1WCrag4CW5CpKAHkyxYAVBPHkJwu7aVhDUk/820WIvnkS9lOZg0YtF8BovBQX/IE3ZrERcNZPgHKxss/N4yK5O4v55Z+Z9Z2Znnu8pbN59Z9lP3pm8u0sCSJIkSZIkSZIkSZKUnCjuB5D0qs3mnfx34QUATwE4CSAH4AYTfW7dar1XO3bv7zqPJyADeqm+9bBL7hUAk32GOGy5zy4dGf9M1zEFpE/VNXuGgS8AFIcMdcH8/OLUwY90HFdAeuQDo5s2FAHZUwCMblpQBMRTCIxuoVEEpJMGjG6hUAQEWjG6BUbJPIgBjG6BUDINYhCjW5st95SffYpl6IFIO+XItT6prjYPqd4h0yC1o6UVAuYAOAYPU+T82IuqgzMNAkSFwk+ojsw8CBAJyv2qAwWkU+1oaQXkPgpgy8D0LdWBAuJpcXL8GgGPQ/9K+VF1YOpBzq7bE37Gmzh9EWNZdWyqQcp1e7q9je+rdfs1P/fTjFJv5//6QHVwakHKdXuaCFcBFJnwakwoDrvW/LuHD99UvUMqd+qVxh+PgK0vAdztvZ2Z31qaOnhex1wKOcyYXZoqfe3nTqkDGfYERoQSCANIGYjqE2cYJTAGkCIQvz/FhlBCYQApuahX1+wZsPUVfJzniehcub7xpp/jLE6OXwO5j6H35jE0BpCCFRL2JXRNK0ULBjDiILrezwiJktOFAYwwiHefoWM+Yrxemyr52qtU1+wZoPM6mKZGEsTUO31BVoruRg7E9NuucaOMFEgE74EDiBdlZECiwugWF8pIgESN0S0OlMSDxIXRLWqURIPEjdHJyeVx4u2J0noUB0vsSydJwWDGbFQYQEJXSJIwdO3AVUscSJYxgISBZB0DSBCIYOyUCBDB+K/YQQRjd7GCCMb/iw1EMHoXC4hg9C9yEMEYXKQggjG8yEAEQ61IQARDPeMgguEvoyCC4T9jIIIRLCMgghE87SCCES6tIIIRPm0ggqGnnI5Jzq7bE65LFwHKA9iPeF4jcwiYWxxhDMDAE3fuxua+do5fYaCqe+4BOQTM6fwUelwZ+Uk+zZybbNi/MmjcxPx7Sg0GYOhzWctEbQA/mJh7T6nCAAx+UM4FbZqau5PDjNk0YQAGQYiM/lGwkf9tql/GQNjFn4amdgiYSyMGYBDEMvN3p1J5mvJmboVY2kFSe5ryZu7T70wbGmdL9WnKm7mLuoVvNU2Vul9tBxUI5OV1pzRsTO3Ige8AuhJkfk+ZwgAC7NQXrvNtY4XNn5jxtMoppNKwHyTgpOtSyYK73wX2EeEugG5nohIxTgB8rMddM4cBBACp1DeeBNGn0HWRZaZKY+sCwAueWzOJAQQ4ZRHRM50vi0S4Wq7b06EeARFzu33Rc0tmMQCfK2Thul0cK6AJ4A7PzeFXCjNVGptbACjLGIDPFVLI8ynsxgB0rBQiBmg17Zs+lfydsiw60+c7oVF4m+ezsM8YlvIpq7raPMT5wi8A8gOGZWI3bTLlFcKFwhkMxgB0XegznDoI47TiUEEJkTIIAQ/5mLdIhEsqO3ppd34u6j8rjLlJwDKY51u3Dhx/Y6JoB31gWW3YNeHfmPkdIvqwx7dcBlaI6ONWiy+9/0DJ5DuFqc/XxrBc33iOiKrY+e/J34D48na7ffnCfff8ZubhSZIkSZIkSZIkSZIkxdk/tOLwTIMTlO8AAAAASUVORK5CYII=" onclick="editRow(this)" id = "editIcon" style="width:25px;cursor:pointer"/>'}`;

    document.getElementById("deleteIcon").addEventListener(
      "click",
      function() {
        deleteRow(this);
      },
      false
    );
    document.getElementById("editIcon").addEventListener(
      "click",
      function() {
        editRow(this, "row" + jsonObj.length);
      },
      false
    );

    extractTable();
    jsonObj.push({
      row: "row" + jsonObj.length,
      // dueDate: year + "/" + month + "/" + day,
      effectiveDate: effectiveYear + "/" + effectiveMonth + "/" + effectiveDay,
      ownerId: newCheckOwner,
      checkNumber: newCheckSerial,
      amount: newCheckAmount,
      bankId: newCheckBank,
      sayyadNumber: newCheckSayad,
    });
  }
  //--------------------------------------------
  function getSubmitedChecksTotal(checks) {
    var t = 0;
    if (checks) {
      for (let key of checks) {
        t += parseFloat(key.amount.toString().replaceAll(",", ""));
      }
    }
    setSubmitedTotal(t);
  }

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [dayAction, setDayAction] = useState("");
  const [monthAction, setMonthAction] = useState("");
  const [yearAction, setYearAction] = useState("");

  const [value, setValue] = React.useState("1");

  const handleRadio = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if(dayAction.length>1&&monthAction.length>1&&yearAction.length>1){    ObligationByDate();
    }
  }, [ dayAction ]);
  useEffect(() => {
    if(dayAction.length>1&&monthAction.length>1&&yearAction.length>1){    ObligationByDate();
    }

  }, [ monthAction]);
  useEffect(() => {
    if(dayAction.length>1&&monthAction.length>1&&yearAction.length>1){    ObligationByDate();
    }

  }, [yearAction, ]);
  useEffect(() => {
   ObligationByDate();
  }, [  ]);
  //=======================================================
  const [balanceList, SetBalanceList] = useState("");
  const GetAccountBalance = () => {
    setloading(true);

    axios
      .post(
        Routes.GetAccountBalance,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            dealingItemId: dealId,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          SetBalanceList(res.data.value.response);
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در دریافت اطلاعات تراز مالی"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetAccountBalance();
            }
          }
        }
      });
  };
  //=======================================================
  const ChangeDealingItemState = () => {
    setloading(true);

    axios
      .post(
        Routes.ChangeDealingItemState,
        {
          dealingItemId: dealId,
          stateId: dealNewState,
          stateComment: changeStateDes,
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
              text="عملیات با موفقیت انجام شد"
            />,
            {
              containerId: "bottom-bar",
              className: "notification-success",
            }
          );
          GetDealingFullDetails();
          setChangeStateDes("");
        } else {
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="خطا در ثبت تغییر وضعیت"
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ChangeDealingItemState();
            }
          }
        }
      });
  };
  //=======================================================

  const JudicialVerdict = () => {
    setloading(true);
    axios
      .post(
        Routes.AddJudicialVerdict,
        {
          dealingItemId: dealId ? dealId : 0,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          verdictDate: year + "/" + month + "/" + day,
          verdictNumber: SerialNum,
          baseAmount: amount ? amount.replaceAll(",", "") : 0,
          basePercentage: Indicator ? Indicator : 0,
          baseAmountObligation: Inflation == "1" ? true : false,
          fineAmount: amount2 ? amount2.replaceAll(",", "") : 0,
          finePercentage: Indicator2 ? Indicator2 : 0,
          fineAmountObligation: Inflation2 == "1" ? true : false,
          isDebtor: TypeState == "1" ? true : false,
          description: Desc,
          docs: allFiles,
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
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              JudicialVerdict();
            }
          }
        }
        if (err.response.status === 400) {
          setloading(false);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text="لطفا ورودی ها را بررسی کنید."
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      });
  };
  /////////////////////////////////////////////////////////////
  const [CalculateTable, setCalculateTable] = useState([]);

  const CalculateDeposit = () => {
    setloading(true);
    axios
      .post(
        Routes.CalculateCashDeposit,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountCalculate.replaceAll(",", ""),
          obligationValue:obligationType?obligationAmount:defaultObligation
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setloading(false);

        setCalculateDisable(true);
        if (res.data.responseCode === 200) {
          setCalculateTable(res.data.value.response);

          // setModalA(false);
          // ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              CalculateDeposit();
            }
          }
        }
      });
  };

  const [TextAreaCalculate, setTextAreaCalculate] = useState("");
  const [calculateDisable, setCalculateDisable] = useState(false);
  const finalCalculate = () => {
    setloading(true);
    axios
      .post(
        Routes.AddCashDeposit,
        {
          dealingItemId: dealId,
          paymentDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountCalculate.replaceAll(",", ""),
          paymentID: AmountNum,
          bankId: BankCalculate,
          trackingNumber: IssueNum,
          description: TextAreaCalculate,
          docs: allFiles,
          obligationValue:obligationType?obligationAmount:defaultObligation

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
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              finalCalculate();
            }
          }
        }
      });
  };

  ////////////////////////////////////////////////////////

  const [Offset, setOffset] = useState([]);
  const [TextAreaOffset, setTextAreaOffset] = useState("");
  const [OffsetDisable, setOffsetDisable] = useState(false);
  const [AmountOffset, setAmountOffset] = useState("");

  const CalculateOffset = () => {
    setloading(true);
    axios
      .post(
        Routes.CalculateOffset,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountOffset.replaceAll(",", ""),
          obligationValue:obligationType?obligationAmount:defaultObligation

        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setloading(false);

        setOffsetDisable(true);
        if (res.data.responseCode === 200) {
          setOffset(res.data.value.response);

          // setModalA(false);
          // ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              CalculateOffset();
            }
          }
        }
      });
  };

  const finalOffset = () => {
    setloading(true);
    axios
      .post(
        Routes.AddOffset,
        {
          dealingItemId: dealId,
          paymentDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountOffset.replaceAll(",", ""),
          description: TextAreaOffset,
          docs: allFiles,
          obligationValue:obligationType?obligationAmount:defaultObligation
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
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              finalOffset();
            }
          }
        }
      });
  };

  //////////////////////////////////////////////////

  const [ForgiveFine, setForgiveFine] = useState([]);
  const [TextAreaForgiveFine, setTextAreaForgiveFine] = useState("");
  const [ForgiveFineDisable, setForgiveFinetDisable] = useState(false);
  const [AmountForgiveFine, setAmountForgiveFine] = useState("");
  const [SerialNumForgiveFine, setSerialNumForgiveFine] = useState("");
  const [dayForgiveFine, setDayForgiveFine] = useState("");
  const [monthForgiveFine, setMonthForgiveFine] = useState("");
  const [yearForgiveFine, setYearForgiveFine] = useState("");
  const CalculateForgiveFine = () => {
    setloading(true);
    axios
      .post(
        Routes.CalculateForgiveFine,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountForgiveFine.replaceAll(",", ""),
          obligationValue:obligationType?obligationAmount:defaultObligation

        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setloading(false);
        setForgiveFinetDisable(true);
        if (res.data.responseCode === 200) {
          setForgiveFine(res.data.value.response);

          // setModalA(false);
          // ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              CalculateForgiveFine();
            }
          }
        }
      });
  };

  const finalForgiveFine = () => {
    setloading(true);
    axios
      .post(
        Routes.AddForgiveFine,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          totalAmount: AmountForgiveFine.replaceAll(",", ""),
          description: TextAreaForgiveFine,
          docs: allFiles,
          letterDate:
            yearForgiveFine + "/" + monthForgiveFine + "/" + dayForgiveFine,
          letterNumber: SerialNumForgiveFine,
          obligationValue:obligationType?obligationAmount:defaultObligation

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
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              finalForgiveFine();
            }
          }
        }
      });
  };
  ////////////////////////////////////////////////////////////////////////////

  const [GoodDeallerReward, setGoodDeallerReward] = useState([]);
  const [TextAreaGoodDeallerReward, setTextAreaGoodDeallerReward] = useState(
    ""
  );
  const [GoodDeallerRewardDisable, setGoodDeallerRewardDisable] = useState(
    false
  );
  const [AmountGoodDeallerReward, setAmountGoodDeallerReward] = useState("");
  const [SerialNumGoodDeallerReward, setSerialNumGoodDeallerReward] = useState(
    ""
  );
  const [dayGoodDeallerReward, setDayGoodDeallerReward] = useState("");
  const [monthGoodDeallerReward, setMonthGoodDeallerReward] = useState("");
  const [yearGoodDeallerReward, setYearGoodDeallerReward] = useState("");
  const CalculateGoodDeallerReward = () => {
    setloading(true);
    axios
      .post(
        Routes.CalculateGoodDeallerReward,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          paymentAmount: AmountGoodDeallerReward.replaceAll(",", ""),
          obligationValue:obligationType?obligationAmount:defaultObligation

        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setloading(false);
        setGoodDeallerRewardDisable(true);
        if (res.data.responseCode === 200) {
          setGoodDeallerReward(res.data.value.response);
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              CalculateGoodDeallerReward();
            }
          }
        }
      });
  };

  const finalGoodDeallerReward = () => {
    setloading(true);
    axios
      .post(
        Routes.AddGoodDeallerReward,
        {
          dealingItemId: dealId,
          applicationDate: yearAction + "/" + monthAction + "/" + dayAction,
          totalAmount: AmountGoodDeallerReward.replaceAll(",", ""),
          description: TextAreaGoodDeallerReward,
          docs: allFiles,
          letterDate:
            yearGoodDeallerReward +
            "/" +
            monthGoodDeallerReward +
            "/" +
            dayGoodDeallerReward,
          letterNumber: SerialNumGoodDeallerReward,
          obligationValue:obligationType?obligationAmount:defaultObligation
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
          // setModalA(false);
          // ChecksList(loanFullDetails.id);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setErrorText(res.data.message);
          toast(
            <PNotify
              title="خطا!"
              icon="fas fa-exclamation"
              text={res.data.message}
            />,
            {
              containerId: "bottom-bar",
              className: "notification-warning",
            }
          );
        }
      })
      .catch(async (err) => {
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
        setloading(false);
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              finalGoodDeallerReward();
            }
          }
        }
      });
  };
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
          setModalDelete(false);
          LoanDocument(DeleteId);
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }
        setloading(false);
      })
      .catch(async (err) => {
        setloading(false);
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

  const handleChangSeperator = (event) =>
    setNewCheckAmount(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeOffset = (event) =>
    setAmountOffset(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeAmount = (event) =>
    setAmount(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeAmount2 = (event) =>
    setAmount2(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeAmountCalculate = (event) =>
    setAmountCalculate(addCommas(removeNonNumeric(event.target.value)));
  const handleChangeAmountForgiveFine = (event) =>
    setAmountForgiveFine(addCommas(removeNonNumeric(event.target.value)));
  const HandleChangeAmountGoodDeallerReward = (event) =>
    setAmountGoodDeallerReward(addCommas(removeNonNumeric(event.target.value)));

  const [addTextError, setAddTextError] = useState("");
  const handleObligationChange = () => {
    if (!obligationType) {
      document.getElementById("obligationViewer").disabled = false;
      document.getElementById("obligationViewer").value = obligationAmount;
      setObligationType(!obligationType);
    } else {
      document.getElementById("obligationViewer").disabled = true;
      document.getElementById("obligationViewer").value = defaultObligation;
      setObligationType(!obligationType);
    }
  };
  function AddCheckValidation() {
    if (
      newCheckSayad &&
      newCheckAmount &&
      newCheckOwner &&
      effectiveDay &&
      effectiveMonth &&
      effectiveYear &&
      newCheckBank &&
      newCheckSerial
    ) {
      validateDuplicate();
    } else {
      if (!newCheckBank) {
        setAddTextError(" عهده انتخاب نشده است");
      }
      if (!effectiveYear) {
        setAddTextError(" سال تاریخ موثر وارد نشده است");
      }
      if (!effectiveMonth) {
        setAddTextError(" ماه تاریخ موثر وارد نشده است");
      }
      if (!effectiveDay) {
        setAddTextError(" روز تاریخ موثر وارد نشده است");
      }
      if (!newCheckOwner) {
        setAddTextError(" طرف چک وارد نشده است");
      }
      if (!newCheckAmount) {
        setAddTextError(" مبلغ وارد نشده است");
      }
      if (!newCheckSayad) {
        setAddTextError(" شناسه صیاد وارد نشده است");
      }
      if (!newCheckSerial) {
        setAddTextError(" شماره سریال وارد نشده است");
      }

      setTimeout(() => {
        setAddTextError("");
      }, 3000);
    }
  }
  console.log(effectiveDay, effectiveMonth, effectiveYear);
  return (
    <>
      <div className="f-s-20 fw-bold c-black txt-al-r mg-b-20">{`جزئیات معامله ${
        thisDeal.name ? thisDeal.name : ""
      }`}</div>

      <Row>
        <Col lg={12}>
          <div
            className="tabs"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <Tabs className="nav-justified">
              <Tab eventKey="جزئیات" title="جزئیات">
                <Row>
                  <Form.Group as={Col} lg={12}></Form.Group>

                  <Form.Group as={Col} lg={4}>
                    <div>نوع فعالیت </div>
                    <Form.Control value={thisDeal.activity} />
                  </Form.Group>

                  <Form.Group as={Col} lg={4}>
                    <div>شناسه ملی </div>
                    <Form.Control value={thisDeal.nationalId} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تاریخ قرارداد</div>
                    <Form.Control value={thisDeal.contractDate} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تاریخ معامله</div>
                    <Form.Control value={thisDeal.sellDate} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تاریخ خاتمه قرارداد</div>
                    <Form.Control value={thisDeal.contractEndDate} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>بلوك واگذاري</div>
                    <Form.Control value={thisDeal.sellTypeTitle} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>نرخ هر سهم(ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.sharePrice
                          ? thisDeal.sharePrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>شماره قرارداد</div>
                    <Form.Control value={thisDeal.contractNum} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>شیوه واگذاری</div>
                    <Form.Control value={thisDeal.divestingMethodTitle} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>روش واگذاری</div>
                    <Form.Control value={thisDeal.divestingWayTitle} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div> مبلغ هر قسط(ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.eachQuarterValue
                          ? thisDeal.eachQuarterValue
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div> تاريخ اولين قسط</div>
                    <Form.Control value={thisDeal.firstQuarterDate} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div> نرخ سود فروش اقساطي</div>
                    <Form.Control value={thisDeal.ipprPercent} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div> شماره تماس</div>
                    <Form.Control value={thisDeal.phone} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div> فاصله بين اقساط ( روز )</div>
                    <Form.Control value={thisDeal.quarterGap} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>حصه اقساطي(ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.quarterPart
                          ? thisDeal.quarterPart
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>سود فروش اقساطي(ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.quarterSaleProfit
                          ? thisDeal.quarterSaleProfit
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>جمع كل اقساط(ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.quarterTotalSum
                          ? thisDeal.quarterTotalSum
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>کد پستی </div>
                    <Form.Control value={thisDeal.postalCode} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تاریخ ثبت </div>
                    <Form.Control value={thisDeal.registerDate} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>شماره ثبت </div>
                    <Form.Control value={thisDeal.registerNum} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>محل ثبت </div>
                    <Form.Control value={thisDeal.registerPlace} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>مبلغ معامله (ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.totalPrice
                          ? thisDeal.totalPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>مبلغ باقی مانده (ریال)</div>
                    <Form.Control
                      value={
                        thisDeal.restPrice
                          ? thisDeal.restPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تعداد اقساط</div>
                    <Form.Control value={thisDeal.loanCount} />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>تعداد سهم </div>
                    <Form.Control
                      value={
                        thisDeal.sharesCount
                          ? thisDeal.sharesCount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} lg={4}>
                    <div>وضعیت </div>
                    <Form.Control value={thisDeal.stateTitle} />
                  </Form.Group>
                  <Form.Group as={Col} lg={8}>
                    <div>توضیحات</div>
                    <textarea
                      value={thisDeal.description}
                      rows={3}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: "100%",
                        borderColor: "#e7e7e7",
                      }}
                    />
                  </Form.Group>
                </Row>
              </Tab>

              <Tab eventKey="خریداران" title="خریداران">
                <Col>
                  <Row>
                    <Table
                      className=" buyers-table"
                      responsive=""
                      bordered
                      striped
                      style={{ marginTop: "50px" }}
                    >
                      <thead>
                        <tr>
                          <th>ردیف</th>
                          <th className="text-center">نام و نام خانوادگی</th>
                          <th className="text-center">کد ملی</th>
                          <th
                            className="text-center"
                            style={{ minWidth: "80px" }}
                          >
                            نوع
                          </th>
                          <th className="text-center">
                            شماره شناسنامه / شماره ثبت
                          </th>
                          <th className="text-center">شماره تلفن</th>
                          <th className="text-center">صادره از</th>
                          <th className="text-center">کد پستی</th>
                        </tr>
                      </thead>
                      <tbody>
                        {thisDeal.buyers
                          ? thisDeal.buyers.map((e, index) => {
                              return (
                                <>
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.name}</td>
                                    <td className="text-center">
                                      {e.nationalId}
                                    </td>
                                    <td className="text-center">
                                      {e.type ? "حقوقی" : "حقیقی"}
                                    </td>
                                    <td className="text-center">
                                      {e.registerNum}
                                    </td>
                                    <td className="text-center">{e.phone}</td>
                                    <td className="text-center">
                                      {e.registerPlace}
                                    </td>
                                    <td className="text-center">
                                      {e.postalCode}
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          : null}
                      </tbody>
                    </Table>
                  </Row>
                </Col>
              </Tab>
              <Tab eventKey="اقساط" title="اقساط">
                <Col>
                  <Row>
                    <Form.Group
                      as={Col}
                      lg={12}
                      style={{ textAlign: "center" }}
                    >
                      <Row>
                        <Form.Group
                          as={Col}
                          lg={12}
                          style={{ textAlign: "center" }}
                        ></Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            تعداد اقساط پرداخت شده :{" "}
                            {finantialDetails.paidLoans}
                          </div>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            مجموع پرداخت شده :{" "}
                            {`${
                              finantialDetails.paidAmount
                                ? finantialDetails.paidAmount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : 0
                            } (ریال)`}
                          </div>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div
                            style={{ marginBottom: "5px", direction: "rtl" }}
                          >
                            تخفیف به شرط تسویه :{" "}
                            {`${
                              finantialDetails.discountOfSettlement
                                ? finantialDetails.discountOfSettlement
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : 0
                            } (ریال)`}
                          </div>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            تعداد اقساط پرداخت نشده :{" "}
                            {finantialDetails.unPaidLoans}
                          </div>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            مجموع پرداخت نشده :{" "}
                            {`${
                              finantialDetails.unPaidAmount
                                ? finantialDetails.unPaidAmount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : 0
                            } (ریال)`}
                          </div>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "center" }}
                        >
                          <div style={{ marginBottom: "5px" }}>
                            بدهی به شرط تسویه :{" "}
                            {`${
                              finantialDetails.paymentOfSettlement
                                ? finantialDetails.paymentOfSettlement
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : 0
                            } (ریال)`}
                          </div>
                        </Form.Group>
                      </Row>
                    </Form.Group>
                    <div className="scrolls-horizontal">
                    <Table
                      style={{ marginTop: "50px" }}
                      className="buyers-table"
                      responsive=""
                      bordered
                    >
                      <thead>
                        <tr>
                          <th className="text-center">ردیف</th>
                          <th className="text-center">تاریخ سررسید</th>
                          <th className="text-center">اصل بدهی (ریال)</th>
                          <th className="text-center"> سود (ریال)</th>
                          <th className="text-center"> جریمه (ریال)</th>
                          <th className="text-center"> پاداش (ریال)</th>
                          <th className="text-center"> پرداخت شده (ریال)</th>
                          <th className="text-center"> مانده (ریال)</th>
                          <th className="text-center">وضعیت</th>
                          <th className="text-center">لیست چک</th>
                          <th className="text-center">استمهال</th>
                          <th className="text-center">تعجیل</th>
                          <th className="text-center">تاریخچه</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table
                          ? table.map((e, index) => {
                              return (
                                <>
                                  <tr>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{e.dueDate}</td>
                                    <td className="text-center">
                                      {e.baseAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.benefitAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.finesAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.rewardAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.paidAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.remainingAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td className="text-center">
                                      {e.stateTitle}
                                    </td>
                                    <td className="text-center">
                                      {e.stateId === 1 ? (
                                        <img
                                          style={{
                                            cursor: "pointer",
                                            width: "25px",
                                          }}
                                          onClick={() => {
                                            ChecksList(e.id);
                                            GetLoanById(e.id);
                                            GetBuyersByLoanId(e.id);
                                            setSelectedBaseAmount(e.baseAmount);
                                            BankDropDown();
                                            setSelectedBenefitAmount(
                                              e.benefitAmount
                                            );

                                            setModal(99);
                                          }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACJ0lEQVR4nO3asW7TUBTG8e+4IUNhYIYhTUOJwsSIBEICiRdhQrwCHjxk6QsgFsSjABIsTCxIZHFcnoAKGFoS304sSPa9Lqg5cf+/MTo+9+ocWYqsTwIAAAAAAAAAAABweVlK0bTKxxYGozrT4M9vWa2VpOrruKjOc/BBlc/MshtSlnSHbdZlVq3DuH1U7EvhjYIeNtUE6V2m9dPF3nyZcrlby+JeZuG1pDsp9X2SMqvGhewti+tD02cpjOJH2dFp0N1qXHxvqzqo8plp55Oka/GefdU+q6zpsaHpedoyJCmMhtKzWFWmnVyXehlSbFaNC5HC/U7nmB5EryLr1rOvWmbVuJAg7XY5IyhcTSjr1LOv2mbV8oZgE1iIMyzEmcaFmOxXl0Ym/YxXhU49+6ptVs1vSKg/djrEwoeEspSa3mubVeNCVvXJS0mpn0Wq36uTV9GL1Ou5ZD8Se/ZV66waF1JODo9N68cme9/e395mwR6Vk8Pj2E0W+/NFCOsnkn2J1fZTfFZJH/Zm5YtRsCvjvz8untYqy0nx7TxXm5b5VNngZrD+/7H411kBAAAAAABAEkG5C0FQzimCci4RlHOGoJw/BOV8ISi3RViIMyzEGYJyG0BQzhmCcr4QlPODoJwLBOUAAAAAAAD+C4JyF4CgnFME5VwiKOcMQTl/CMr5QlBui7AQZ1iIMwTlNoCgnDME5XwhKOcHQTkXCMoBAAAAAAAAAAAASHMGH4aUnu+qG1IAAAAASUVORK5CYII="
                                        />
                                      ) : (
                                        <img
                                          style={{
                                            cursor: "not-allowed",
                                            width: "25px",
                                            filter: "grayscale(100%)",
                                          }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACJ0lEQVR4nO3asW7TUBTG8e+4IUNhYIYhTUOJwsSIBEICiRdhQrwCHjxk6QsgFsSjABIsTCxIZHFcnoAKGFoS304sSPa9Lqg5cf+/MTo+9+ocWYqsTwIAAAAAAAAAAABweVlK0bTKxxYGozrT4M9vWa2VpOrruKjOc/BBlc/MshtSlnSHbdZlVq3DuH1U7EvhjYIeNtUE6V2m9dPF3nyZcrlby+JeZuG1pDsp9X2SMqvGhewti+tD02cpjOJH2dFp0N1qXHxvqzqo8plp55Oka/GefdU+q6zpsaHpedoyJCmMhtKzWFWmnVyXehlSbFaNC5HC/U7nmB5EryLr1rOvWmbVuJAg7XY5IyhcTSjr1LOv2mbV8oZgE1iIMyzEmcaFmOxXl0Ym/YxXhU49+6ptVs1vSKg/djrEwoeEspSa3mubVeNCVvXJS0mpn0Wq36uTV9GL1Ou5ZD8Se/ZV66waF1JODo9N68cme9/e395mwR6Vk8Pj2E0W+/NFCOsnkn2J1fZTfFZJH/Zm5YtRsCvjvz8untYqy0nx7TxXm5b5VNngZrD+/7H411kBAAAAAABAEkG5C0FQzimCci4RlHOGoJw/BOV8ISi3RViIMyzEGYJyG0BQzhmCcr4QlPODoJwLBOUAAAAAAAD+C4JyF4CgnFME5VwiKOcMQTl/CMr5QlBui7AQZ1iIMwTlNoCgnDME5XwhKOcHQTkXCMoBAAAAAAAAAAAASHMGH4aUnu+qG1IAAAAASUVORK5CYII="
                                        />
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {e.stateId === 1 ? (
                                        <img
                                          style={{
                                            cursor: "pointer",
                                            width: "25px",
                                          }}
                                          onClick={() => {
                                            props.history.push(
                                              `/Postponement?${e.id}`
                                            );
                                          }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADeklEQVR4nO2bT2hUVxjFz3ffZMy0mFYotFarSZp5SbsoBFIXDViVrkQXbtxEsBSErqTSQCHg5JJKSlsIhS4sdBNa6kYXJXWhG6vQVXcKoiYk8yYirVDaZlHF/LmnC0GycDJz371v7oS83/r7zj0c3v3uffMHyMnJ2cpIqi5CyouVDxTUIGDSaTTAGLU016O/y0J7PQXbht75z14qLHbOgNhPEGkzbIQIEwCZB6BsGwqFzm9A7M/CzPPondd7+hP9UVb6VgG8lYztBHkyKzPPo6igCH7fX9MnstC3CmBNim8Cks0zvzGKxHR/TR/3LmxVbOxnhj8YkbjgOwTrGRAWRiR/7KtVjvpS3GQBAACKinIpTvRhH2KbMQAAKAK41J9UDroKbdYAALAEyOXygnY6kts4gKenjXCF9SoIvCCKv8QLel/aVdo4AO7aff9M6dWejgcA7m5Q2AWFK33J2cE0qwQ81hpSeHF1+4fXRZ9/58/RoUePS0NKRR11qxmlup+0cwCgqK/jmv7v1mv6BwA3sljDKrWBqj5ghL9mYaQBfwnkNsGVhpXGjM72fn6zWeG2fgLW8QrB95spVBLtsBFu4yHYGvIAQhsITR5AaAOhyQMIbSA0Hu4B8oDkTwKp+9JSD4IiIiMAd7n7SIdzACLm29nuiS/T9sdV/Q8EX7j6SItzAKScjqu6JMo8tu41qgThKVcPLvi4Cr8O4TiZ4mXMftd4Jx+CXlRE7oNNvKn5RKQD5BuuMj4CmJrdqz/1oGNNnOgpgGdcNHwEEA/M69gUsOpBq2nUKgoGiF11fARwxEQ8ghbPMxP50dnyQ3DLB+BjC/ymyHNGqTUPWk2jjImMqLMAh1103AMgrt3tmbjqrJOCcqKHBQgcgGAsro0fALHsrGW3bhHke64yPrZAoZU/mXmGp1MnH4LuErIEwc8wfOKuZYGSbSCPAehykfGxBb6a3asnPehYU04qcwI556LhIQCOlKv6b1Ew7loWqxooAUZch4GPJ+BtEZ5v9VXY12/VtvwQzAMIbSA0eQChDYQmDyC0gdDkAdgUG9XaDz7TYOvRKoCIy/MAw3+dUx+zsrY8Z9NgFcCd7sk/BGrazlMLEblY7Z18aNNiPQPWVvAJgeu2fVlDYmbZ4GPbvtR/m4sXK4dg1LsAXk6l4Y9/RfD7vW59LbCPnJycTcj/Mn7zd/YmTtUAAAAASUVORK5CYII="
                                        />
                                      ) : (
                                        <img
                                          style={{
                                            cursor: "not-allowed",
                                            width: "25px",
                                            filter: "grayscale(100%)",
                                          }}
                                          // onClick={() => {
                                          //   props.history.push(
                                          //     `/Postponement?${e.id}`
                                          //   );
                                          // }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADeklEQVR4nO2bT2hUVxjFz3ffZMy0mFYotFarSZp5SbsoBFIXDViVrkQXbtxEsBSErqTSQCHg5JJKSlsIhS4sdBNa6kYXJXWhG6vQVXcKoiYk8yYirVDaZlHF/LmnC0GycDJz371v7oS83/r7zj0c3v3uffMHyMnJ2cpIqi5CyouVDxTUIGDSaTTAGLU016O/y0J7PQXbht75z14qLHbOgNhPEGkzbIQIEwCZB6BsGwqFzm9A7M/CzPPondd7+hP9UVb6VgG8lYztBHkyKzPPo6igCH7fX9MnstC3CmBNim8Cks0zvzGKxHR/TR/3LmxVbOxnhj8YkbjgOwTrGRAWRiR/7KtVjvpS3GQBAACKinIpTvRhH2KbMQAAKAK41J9UDroKbdYAALAEyOXygnY6kts4gKenjXCF9SoIvCCKv8QLel/aVdo4AO7aff9M6dWejgcA7m5Q2AWFK33J2cE0qwQ81hpSeHF1+4fXRZ9/58/RoUePS0NKRR11qxmlup+0cwCgqK/jmv7v1mv6BwA3sljDKrWBqj5ghL9mYaQBfwnkNsGVhpXGjM72fn6zWeG2fgLW8QrB95spVBLtsBFu4yHYGvIAQhsITR5AaAOhyQMIbSA0Hu4B8oDkTwKp+9JSD4IiIiMAd7n7SIdzACLm29nuiS/T9sdV/Q8EX7j6SItzAKScjqu6JMo8tu41qgThKVcPLvi4Cr8O4TiZ4mXMftd4Jx+CXlRE7oNNvKn5RKQD5BuuMj4CmJrdqz/1oGNNnOgpgGdcNHwEEA/M69gUsOpBq2nUKgoGiF11fARwxEQ8ghbPMxP50dnyQ3DLB+BjC/ymyHNGqTUPWk2jjImMqLMAh1103AMgrt3tmbjqrJOCcqKHBQgcgGAsro0fALHsrGW3bhHke64yPrZAoZU/mXmGp1MnH4LuErIEwc8wfOKuZYGSbSCPAehykfGxBb6a3asnPehYU04qcwI556LhIQCOlKv6b1Ew7loWqxooAUZch4GPJ+BtEZ5v9VXY12/VtvwQzAMIbSA0eQChDYQmDyC0gdDkAdgUG9XaDz7TYOvRKoCIy/MAw3+dUx+zsrY8Z9NgFcCd7sk/BGrazlMLEblY7Z18aNNiPQPWVvAJgeu2fVlDYmbZ4GPbvtR/m4sXK4dg1LsAXk6l4Y9/RfD7vW59LbCPnJycTcj/Mn7zd/YmTtUAAAAASUVORK5CYII="
                                        />
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {e.stateId === 1 ? (
                                        <img
                                          style={{
                                            cursor: "pointer",
                                            width: "25px",
                                          }}
                                          onClick={() => {
                                            props.history.push(
                                              `/Acceleration?${e.id}`
                                            );
                                          }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAF3klEQVRoge2aX2hTVxzHv7+T3CR2naMW3dxqm9Ak/ml9kG1P6hRklaoPQ+zL2HyZoEOzzT8TdaOe9mVzCgpdUYZ7GLKnsYfKxE0dTvBBEF/Gqja3bdK6FawUlK1/0jTnt4ebpGn+NffmtnWwDwTOPef8zu/3Jefcc34nAf7n+YLsGmjtwLGqmPJsIuL1DKwBqB7AMoBfSLoaBfgxgH4C7oP5dgziVtQnn9rhvywhfj3kdmhVu0C0m5m2AOww6T4B8HUGXeL4yI+9gY6Y1VgsCal5dHBRReKlDwE+DOBVq86zQvmLGGdiwIWoT06YtjZrEIy2NgOiA+B6s7Yl0iuYDzz0tf9ixqhkIX495HY4l3zFhI/Mx2YFujTmeLb3zxVnx0vqXUonX/+JlzXhugLw62bDEaD1TAliFrfN2oLpbiKBHX1+OTxb11mFrIpIryK+DsBvOhAAYW8bAUAwepKt2DOT7gCaHvpktFg/UazRrx9fqgg/w6IIOyDigCLcaIjIV4r1KyjEG5EeobmvArzS/vDMwvVx4LJfD7kL9SgoRBN81sqamDOI3xTakjOFmvMKCUZbm4mxb+6isswBf79syteQI8T4+ujc3MdkDSG40xuRnpz6nAqtej+A4LxEZQ2/W6i92ZUzhCQX06F5C8kizHQke+HPEOLQqnYB/Nr8hmWJGnJW7cysmDm1iHbPazhlQETvZT6nhawdOFZlHMX/MzT5dbk49ZAWElOeTebziQXFSS68lXqYnlqEDQsSThkIzicEvHohgikLxqpUMS2EmQL2eqE4g49O++SjAKbs9MA0vd+lhRBhiZ1OAHVc97afTj3p3vbTDDpurw+uTpUyp9aLtvpwie9y3MZjOXXlQemYi+Yj5aAloLLrHG63Zq8XTieGGULobxs9DI9PojLHbQI2b7g0mio5M9yMAKjO09ssww5BW8JeOVjf+9kKzaPGWLndYPU+M7fZMH4G/DhVyhBCOsDlnnqHHYK2PKiVf6welI0Jxb+qKSwDGDZeamZAkVRp+q0FflDmqDkiACwrc8ziMH5PFafXCLP565pp5l+EwZ1UYfqsBXHLuIs1zQKJoPiUGr+ZekoLifrkUybcMDucILXNXhHUTUwHFalGj2e00uMZrVSkGsF8CMD9VC8G9/TXn3qWtsocIhCV7xL4e3N+aSMRJljxlTJFTAJ0OFzXfR70Q/6ZwS2OwGDDfmKcAVgDoz3sazsJZAnx6yG30Kr7FiBLnATR9nCdLGlGBAZa3yYWVwDWAN4W9rZfzXknrozIT5j4rP2xFoNCYa/8Ors2GJWTABD2Sld228qB1o+Z6RyAsDZKa3OOKDHgAoDeuQg3P9Qdrus+n7+NNeOTy/Ja0QnQAwDBqQrVnCMk6pMTgvmArbEWgRgXC66JIvxGcgrARQBQJFryHhqNH1mos8wYSyIhcM2qrSNpS+B1BU+/Kj5yGEx3rTopOZjxsUdWbdXY2ECyWFNQSG+gI5ZIYAcz6VYdlQ/Fjc+s/ahoPtLnl8MOoGkuxSQWuWsLtYW90pXvjZVCVFTUJYtDsyZWD30yqhLYMFfTTCjKe7teCgmltholvltShtjnl8NqamQjgJx3fdkQ7QG35L1PC0blZGovyWYzSydAe4whqKvkVLc30BELe9tCStFWm6famsBgw36zRkNRFQKwipn0yidDXZayHb8ecjtcVfuY6QiAGitjzITiTGq7Xtd+vST//bJJCPwEKCcJ8U5Prbxc9l84yFm1M3mh3IQZGWcpUJzBPQQ0AhQnUp8urxWdyc0uh80snUNRFQKJUwBrIPoiXCdPADbmn35dLoZLbXKw2MjGraUfoKXGNRMRgH+MHJsiyczuzpQav9lff+pZMHKyDYTW5FD3AfrWIXBNeBAFADUBr7GwxQfGjSgzSHwZrsXnIKlsFVIuxl9D6Bxm+bWMmXThwJGeWnk5s/65EQIADd3SNVWhmhWJFgKvA2iFcXdFjwC+R0RdlU+Guu698U3OJvkv/50p7hE+4esAAAAASUVORK5CYII="
                                        />
                                      ) : (
                                        <img
                                          style={{
                                            cursor: "not-allowed",
                                            width: "25px",
                                            filter: "grayscale(100%)",
                                          }}
                                          // onClick={() => {
                                          //   props.history.push(
                                          //     `/Acceleration?${e.id}`
                                          //   );
                                          // }}
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAF3klEQVRoge2aX2hTVxzHv7+T3CR2naMW3dxqm9Ak/ml9kG1P6hRklaoPQ+zL2HyZoEOzzT8TdaOe9mVzCgpdUYZ7GLKnsYfKxE0dTvBBEF/Gqja3bdK6FawUlK1/0jTnt4ebpGn+NffmtnWwDwTOPef8zu/3Jefcc34nAf7n+YLsGmjtwLGqmPJsIuL1DKwBqB7AMoBfSLoaBfgxgH4C7oP5dgziVtQnn9rhvywhfj3kdmhVu0C0m5m2AOww6T4B8HUGXeL4yI+9gY6Y1VgsCal5dHBRReKlDwE+DOBVq86zQvmLGGdiwIWoT06YtjZrEIy2NgOiA+B6s7Yl0iuYDzz0tf9ixqhkIX495HY4l3zFhI/Mx2YFujTmeLb3zxVnx0vqXUonX/+JlzXhugLw62bDEaD1TAliFrfN2oLpbiKBHX1+OTxb11mFrIpIryK+DsBvOhAAYW8bAUAwepKt2DOT7gCaHvpktFg/UazRrx9fqgg/w6IIOyDigCLcaIjIV4r1KyjEG5EeobmvArzS/vDMwvVx4LJfD7kL9SgoRBN81sqamDOI3xTakjOFmvMKCUZbm4mxb+6isswBf79syteQI8T4+ujc3MdkDSG40xuRnpz6nAqtej+A4LxEZQ2/W6i92ZUzhCQX06F5C8kizHQke+HPEOLQqnYB/Nr8hmWJGnJW7cysmDm1iHbPazhlQETvZT6nhawdOFZlHMX/MzT5dbk49ZAWElOeTebziQXFSS68lXqYnlqEDQsSThkIzicEvHohgikLxqpUMS2EmQL2eqE4g49O++SjAKbs9MA0vd+lhRBhiZ1OAHVc97afTj3p3vbTDDpurw+uTpUyp9aLtvpwie9y3MZjOXXlQemYi+Yj5aAloLLrHG63Zq8XTieGGULobxs9DI9PojLHbQI2b7g0mio5M9yMAKjO09ssww5BW8JeOVjf+9kKzaPGWLndYPU+M7fZMH4G/DhVyhBCOsDlnnqHHYK2PKiVf6welI0Jxb+qKSwDGDZeamZAkVRp+q0FflDmqDkiACwrc8ziMH5PFafXCLP565pp5l+EwZ1UYfqsBXHLuIs1zQKJoPiUGr+ZekoLifrkUybcMDucILXNXhHUTUwHFalGj2e00uMZrVSkGsF8CMD9VC8G9/TXn3qWtsocIhCV7xL4e3N+aSMRJljxlTJFTAJ0OFzXfR70Q/6ZwS2OwGDDfmKcAVgDoz3sazsJZAnx6yG30Kr7FiBLnATR9nCdLGlGBAZa3yYWVwDWAN4W9rZfzXknrozIT5j4rP2xFoNCYa/8Ors2GJWTABD2Sld228qB1o+Z6RyAsDZKa3OOKDHgAoDeuQg3P9Qdrus+n7+NNeOTy/Ja0QnQAwDBqQrVnCMk6pMTgvmArbEWgRgXC66JIvxGcgrARQBQJFryHhqNH1mos8wYSyIhcM2qrSNpS+B1BU+/Kj5yGEx3rTopOZjxsUdWbdXY2ECyWFNQSG+gI5ZIYAcz6VYdlQ/Fjc+s/ahoPtLnl8MOoGkuxSQWuWsLtYW90pXvjZVCVFTUJYtDsyZWD30yqhLYMFfTTCjKe7teCgmltholvltShtjnl8NqamQjgJx3fdkQ7QG35L1PC0blZGovyWYzSydAe4whqKvkVLc30BELe9tCStFWm6famsBgw36zRkNRFQKwipn0yidDXZayHb8ecjtcVfuY6QiAGitjzITiTGq7Xtd+vST//bJJCPwEKCcJ8U5Prbxc9l84yFm1M3mh3IQZGWcpUJzBPQQ0AhQnUp8urxWdyc0uh80snUNRFQKJUwBrIPoiXCdPADbmn35dLoZLbXKw2MjGraUfoKXGNRMRgH+MHJsiyczuzpQav9lff+pZMHKyDYTW5FD3AfrWIXBNeBAFADUBr7GwxQfGjSgzSHwZrsXnIKlsFVIuxl9D6Bxm+bWMmXThwJGeWnk5s/65EQIADd3SNVWhmhWJFgKvA2iFcXdFjwC+R0RdlU+Guu698U3OJvkv/50p7hE+4esAAAAASUVORK5CYII="
                                        />
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          width: "25px",
                                        }}
                                        onClick={() => {
                                          {
                                            LoanHistory(e.id);
                                            setLoanDocId(e.id);
                                          }
                                        }}
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABB0lEQVRIie2UMU4DMRBF36zCOdg0ew1OARwBCUVcwTZVWqQoEi0lR3KTVJwAiW4nxawTC5xkkyxiC35j+Xv15/+ZteEfRyDfiWbt9FLRWIetbnWp2DFM+rjoi1L6v0uQkFylRCWXh9L+eoIfaNZOh/iTEsY3g9LZIYx/BqXvc26ABKom6h/zNfHbGZRc7NeUEKfe26aaQbsAXTQrdwPtLaDGn5tA1DUrPweItV8iPBjPXVf0KdZ+eX4BgKr92nek0hZf04/e4iohXj8H6HquvBrPO4AoL2kWuwLCW1/9Xf/B+i8C1SxOw731XsT4rMDVpziE+UlJzJlAN4tsTfzJb36Ocd7kobEBCblvMAYwBLkAAAAASUVORK5CYII="
                                      />
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          : null}
                      </tbody>
                    </Table>
                    </div>
                    <Pagination
                      count={Math.ceil(countPage)}
                      page={page}
                      onChange={handleChange}
                      className={classes.root}
                      style={{ direction: "ltr", margin: "30px auto" }}
                    />
                  </Row>
                </Col>
              </Tab>
              <Tab eventKey="عملیات مالی" title="عملیات مالی">
                <Row>
                  <Form.Group as={Col} lg={12}></Form.Group>

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
                    <div style={{ marginBottom: "5px" }}>نوع عملیات :</div>

                    <Select
                      style={{
                        fontFamily: "DIROOZ-FD",
                        direction: "rtl",
                        textAlign: "right",
                      }}
                      placeholder={""}
                      onChange={(e) => {
                        setTypeAction(e.value);
                        setDayAction("");
                        setMonthAction("");
                        setYearAction("");
                      }}
                      options={types}
                    />
                  </Form.Group>

                  <Form.Group as={Col} lg={4} style={{ textAlign: "right" }}>
                    <div style={{ marginBottom: "5px" }}>{DateText} :</div>

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
                        onChange={(e) => setDayAction(e.target.value)}
                        onFocus={() => setErrors({ ...errors, date: "" })}
                        value={dayAction}
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
                        value={monthAction}
                        onChange={(e) => setMonthAction(e.target.value)}
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
                        value={yearAction}
                        onChange={(e) => setYearAction(e.target.value)}
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
                  <Form.Group as={Col} lg={4} style={{ textAlign: "right" }}>
                    <div style={{ marginBottom: "5px" }}>وجه التزام (%):</div>
                    <div className="row">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          height: "47px",
                        }}
                        className="col-6"
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
                          <option value={false}>پیشفرض</option>
                          <option value={true}>دستی</option>
                        </CFormSelect>
                      </div>
                      <Form.Control
                        style={{
                          color: "black",
                          width: "50%",
                          marginBottom: "10px",
                        }}
                        disabled={obligationType ? false : true}
                        onChange={(e) => {
                          setObligationAmount(e.target.value);
                        }}
                        id="obligationViewer"
                        className="col-5"
                      />
                    </div>
                  </Form.Group>
                  {TypeAction === "1" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

                        <Form.Control
                          onChange={handleChangeOffset}
                          value={AmountOffset}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>

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
                                border: "1px solid #e7e7e7",
                                width: "95%",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          placeholder="توضیحات"
                          onChange={(e) => setTextAreaOffset(e.target.value)}
                          rows={3}
                          maxLength={300}
                        />
                      </Col>

                      <Form.Group
                        as={Col}
                        lg={12}
                        style={{ textAlign: "right" }}
                      >
                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                          }}
                          color="success"
                          className="px-4"
                          onClick={() => CalculateOffset()}
                        >
                          محاسبه
                        </CButton>

                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                            marginRight: "20px",
                          }}
                          color="success"
                          className="px-4"
                          disabled={!OffsetDisable}
                          onClick={() => setModal(21)}
                        >
                          تایید نهایی
                        </CButton>
                      </Form.Group>

                      {Offset.length > 0 ? (
                        <div className="container">
                          <Table
                            style={{ marginTop: "50px" }}
                            className="buyers-table"
                            responsive=""
                            bordered
                          >
                            <thead>
                              <tr>
                                <th className="text-center">ردیف</th>
                                <th className="text-center">شماره قسط</th>
                                <th className="text-center">تاریخ سررسید</th>
                                <th className="text-center">اصل مبلغ</th>
                                <th className="text-center">سود</th>
                                <th className="text-center">جریمه</th>
                                <th className="text-center">پاداش</th>
                                <th className="text-center">پرداخت شده</th>
                                <th className="text-center">مانده</th>
                                <th className="text-center">وضعیت</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Offset.map((e, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.id}</td>
                                    <td>{e.dueDate}</td>
                                    <td>
                                      {e.baseAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.benefitAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.finesAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.rewardAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.paidAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.remainingAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{e.stateTitle}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {TypeAction === "2" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

                        <Form.Control
                          onChange={handleChangeAmountCalculate}
                          value={AmountCalculate}
                          type="text"
                          maxLength={15}
                          disabled={value == 2}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شناسه واریز :</div>

                        <Form.Control
                          onChange={(e) => setAmountNum(e.target.value)}
                          value={AmountNum}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
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
                        lg={6}
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
                            setBankCalculate(e.value);
                          }}
                          options={banksDrop}
                        />
                      </Form.Group>

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
                                border: "1px solid #e7e7e7",
                                width: "95%",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          placeholder="توضیحات"
                          onChange={(e) => setTextAreaCalculate(e.target.value)}
                          rows={3}
                          maxLength={300}
                        />
                      </Col>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                          }}
                          color="success"
                          className="px-4"
                          onClick={() => CalculateDeposit()}
                        >
                          محاسبه
                        </CButton>

                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                            marginRight: "20px",
                          }}
                          color="success"
                          className="px-4"
                          disabled={!calculateDisable}
                          onClick={() => setModal(20)}
                        >
                          تایید نهایی
                        </CButton>
                      </Form.Group>

                      {CalculateTable.length > 0 ? (
                        <div className="container">
                          <Table
                            style={{ marginTop: "50px" }}
                            className="buyers-table"
                            responsive=""
                            bordered
                          >
                            <thead>
                              <tr>
                                <th className="text-center">ردیف</th>
                                <th className="text-center">شماره قسط</th>
                                <th className="text-center">تاریخ سررسید</th>
                                <th className="text-center">اصل مبلغ</th>
                                <th className="text-center">سود</th>
                                <th className="text-center">جریمه</th>
                                <th className="text-center">پاداش</th>
                                <th className="text-center">پرداخت شده</th>
                                <th className="text-center">مانده</th>
                                <th className="text-center">وضعیت</th>
                              </tr>
                            </thead>
                            <tbody>
                              {CalculateTable.map((e, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.id}</td>
                                    <td>{e.dueDate}</td>
                                    <td>
                                      {e.baseAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.benefitAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.finesAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.rewardAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.paidAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.remainingAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{e.stateTitle}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {TypeAction === "3" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

                        <Form.Control
                          onChange={handleChangeAmount}
                          value={amount}
                          type="text"
                          disabled={value == 2}
                          maxLength={15}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شناسه صیاد :</div>

                        <Form.Control
                          onChange={(e) => setSayadNum(e.target.value)}
                          value={SayadNum}
                          type="text"
                          maxLength={20}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شماره سریال :</div>

                        <Form.Control
                          onChange={(e) => setSerialNum(e.target.value)}
                          value={SerialNum}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>
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
                          options={banksDrop}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
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
                                border: "1px solid #e7e7e7",
                                width: "95%",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          placeholder="توضیحات"
                          rows={3}
                          maxLength={300}
                        />
                      </Col>
                    </>
                  ) : null}

                  {TypeAction === "4" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          اصل بدهی (ریال) :
                        </div>

                        <Form.Control
                          onChange={handleChangeAmount}
                          value={amount}
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
                        <div style={{ marginBottom: "5px" }}>شاخص تورم :</div>
                        <Select
                          style={{
                            fontFamily: "DIROOZ-FD",
                            direction: "rtl",
                            textAlign: "right",
                          }}
                          placeholder={""}
                          onChange={(e) => {
                            setInflation(e.value);
                          }}
                          options={Inflations}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>‌درصد(%) :</div>

                        <Form.Control
                          // onKeyUp={(e) => thousnads(e.target)}
                          onChange={(e) => setIndicator(e.target.value)}
                          value={Indicator}
                          type="text"
                          maxLength={2}
                          disabled={Inflation != 2 ? true : false}
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
                        <div style={{ marginBottom: "5px" }}>
                          بستانکار‌/‌بدهکار :
                        </div>

                        <Select
                          style={{
                            fontFamily: "DIROOZ-FD",
                            direction: "rtl",
                            textAlign: "right",
                          }}
                          placeholder={""}
                          onChange={(e) => {
                            setTypeState(e.value);
                          }}
                          options={TypeStates}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        lg={8}
                        className="align-items-center"
                        style={{
                          fontFamily: "DIROOZ-FD",
                          direction: "rtl",
                          textAlign: "right",
                        }}
                      ></Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>
                          جریمه (ریال) :
                        </div>

                        <Form.Control
                          onChange={handleChangeAmount2}
                          value={amount2}
                          type="text"
                          maxLength={15}
                          disabled={TypeState == 1 ? false : true}
                        />
                      </Form.Group>

                      {TypeState == 1 ? (
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
                          <div style={{ marginBottom: "5px" }}>شاخص تورم :</div>
                          <Select
                            style={{
                              fontFamily: "DIROOZ-FD",
                              direction: "rtl",
                              textAlign: "right",
                            }}
                            placeholder={""}
                            onChange={(e) => {
                              setInflation2(e.value);
                            }}
                            options={Inflations}
                          />
                        </Form.Group>
                      ) : (
                        <Form.Group
                          as={Col}
                          lg={4}
                          style={{ textAlign: "right" }}
                        >
                          <div style={{ marginBottom: "5px" }}>شاخص تورم :</div>

                          <Form.Control
                            // onKeyUp={(e) => thousnads(e.target)}

                            disabled={true}
                          />
                        </Form.Group>
                      )}

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>‌درصد(%) :</div>

                        <Form.Control
                          // onKeyUp={(e) => thousnads(e.target)}
                          onChange={(e) => setIndicator2(e.target.value)}
                          value={Indicator2}
                          type="text"
                          maxLength={2}
                          disabled={Inflation2 != 2 ? true : false}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>تاریخ نامه :</div>

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
                                    <option value={day.value}>
                                      {day.label}
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

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شماره نامه :</div>

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
                        style={{ textAlign: "right" }}
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
                                border: "1px solid #e7e7e7",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          placeholder="توضیحات"
                          onChange={(e) => setDesc(e.target.value)}
                          value={Desc}
                          rows={3}
                          maxLength={300}
                        />
                      </Col>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                          }}
                          color="success"
                          className="px-4"
                          disabled={
                            !amount ||
                            // !Inflation ||
                            // !Inflation2 ||
                            // !Indicator ||
                            // !Indicator2 ||
                            !dayAction ||
                            !monthAction ||
                            !yearAction ||
                            !TypeState ||
                            !day ||
                            !month ||
                            !year ||
                            !SerialNum ||
                            !Desc
                          }
                          onClick={() => JudicialVerdict()}
                        >
                          ثبت
                        </CButton>
                      </Form.Group>
                    </>
                  ) : null}

                  {TypeAction === "5" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

                        <Form.Control
                          onChange={handleChangeAmountForgiveFine}
                          value={AmountForgiveFine}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>تاریخ نامه :</div>

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
                            onChange={(e) => setDayForgiveFine(e.target.value)}
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={dayForgiveFine}
                          >
                            <option>روز</option>
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
                            value={monthForgiveFine}
                            onChange={(e) =>
                              setMonthForgiveFine(e.target.value)
                            }
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
                            value={yearForgiveFine}
                            onChange={(e) => setYearForgiveFine(e.target.value)}
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

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شماره نامه :</div>

                        <Form.Control
                          onChange={(e) =>
                            setSerialNumForgiveFine(e.target.value)
                          }
                          value={SerialNumForgiveFine}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
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
                                border: "1px solid #e7e7e7",
                                width: "95%",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          onChange={(e) =>
                            setTextAreaForgiveFine(e.target.value)
                          }
                          placeholder="توضیحات"
                          rows={3}
                          maxLength={300}
                        />
                      </Col>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                          }}
                          color="success"
                          className="px-4"
                          onClick={() => CalculateForgiveFine()}
                        >
                          محاسبه
                        </CButton>

                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                            marginRight: "20px",
                          }}
                          color="success"
                          className="px-4"
                          disabled={!ForgiveFineDisable}
                          onClick={() => setModal(22)}
                        >
                          تایید نهایی
                        </CButton>
                      </Form.Group>

                      {ForgiveFine.length > 0 ? (
                        <div className="container">
                          <Table
                            style={{ marginTop: "50px" }}
                            className="buyers-table"
                            responsive=""
                            bordered
                          >
                            <thead>
                              <tr>
                                <th className="text-center">ردیف</th>
                                <th className="text-center">شماره قسط</th>
                                <th className="text-center">تاریخ سررسید</th>
                                <th className="text-center">اصل مبلغ</th>
                                <th className="text-center">سود</th>
                                <th className="text-center">جریمه</th>
                                <th className="text-center">پاداش</th>
                                <th className="text-center">پرداخت شده</th>
                                <th className="text-center">مانده</th>
                                <th className="text-center">وضعیت</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ForgiveFine.map((e, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.id}</td>
                                    <td>{e.dueDate}</td>
                                    <td>
                                      {e.baseAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.benefitAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.finesAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.rewardAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.paidAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.remainingAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{e.stateTitle}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {TypeAction === "6" ? (
                    <>
                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

                        <Form.Control
                          onChange={HandleChangeAmountGoodDeallerReward}
                          value={AmountGoodDeallerReward}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>تاریخ نامه :</div>

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
                            onChange={(e) =>
                              setDayGoodDeallerReward(e.target.value)
                            }
                            onFocus={() => setErrors({ ...errors, date: "" })}
                            value={dayGoodDeallerReward}
                          >
                            <option>روز</option>
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
                            value={monthGoodDeallerReward}
                            onChange={(e) =>
                              setMonthGoodDeallerReward(e.target.value)
                            }
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
                            value={yearGoodDeallerReward}
                            onChange={(e) =>
                              setYearGoodDeallerReward(e.target.value)
                            }
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

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
                      >
                        <div style={{ marginBottom: "5px" }}>شماره نامه :</div>

                        <Form.Control
                          onChange={(e) =>
                            setSerialNumGoodDeallerReward(e.target.value)
                          }
                          value={SerialNumGoodDeallerReward}
                          type="text"
                          maxLength={15}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        lg={6}
                        style={{ textAlign: "right" }}
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
                                border: "1px solid #e7e7e7",
                                width: "95%",
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
                      </Form.Group>

                      <Col lg={12}>
                        <MaxLengthInput
                          as="textarea"
                          onChange={(e) =>
                            setTextAreaGoodDeallerReward(e.target.value)
                          }
                          placeholder="توضیحات"
                          rows={3}
                          maxLength={300}
                        />
                      </Col>

                      <Form.Group
                        as={Col}
                        lg={4}
                        style={{ textAlign: "right" }}
                      >
                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                          }}
                          color="success"
                          className="px-4"
                          onClick={() => CalculateGoodDeallerReward()}
                        >
                          محاسبه
                        </CButton>

                        <CButton
                          style={{
                            width: "150px",
                            backgroundColor: "#4BB543	",
                            marginTop: "20px",
                            marginRight: "20px",
                          }}
                          color="success"
                          className="px-4"
                          disabled={!GoodDeallerRewardDisable}
                          onClick={() => setModal(23)}
                        >
                          تایید نهایی
                        </CButton>
                      </Form.Group>

                      {GoodDeallerReward.length > 0 ? (
                        <div className="container">
                          <Table
                            style={{ marginTop: "50px" }}
                            className="buyers-table"
                            responsive=""
                            bordered
                          >
                            <thead>
                              <tr>
                                <th className="text-center">ردیف</th>
                                <th className="text-center">شماره قسط</th>
                                <th className="text-center">تاریخ سررسید</th>
                                <th className="text-center">اصل مبلغ</th>
                                <th className="text-center">سود</th>
                                <th className="text-center">جریمه</th>
                                <th className="text-center">پاداش</th>
                                <th className="text-center">پرداخت شده</th>
                                <th className="text-center">مانده</th>
                                <th className="text-center">وضعیت</th>
                              </tr>
                            </thead>
                            <tbody>
                              {GoodDeallerReward.map((e, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.id}</td>
                                    <td>{e.dueDate}</td>
                                    <td>
                                      {e.baseAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.benefitAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.finesAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.rewardAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.paidAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      {e.remainingAmount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{e.stateTitle}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </Row>
              </Tab>
              <Tab eventKey="وضعیت" title="وضعیت">
                <Col lg={12} xl={12}>
                  <Row>
                    <Form.Group as={Col} lg={12} style={{ textAlign: "right" }}>
                      {" "}
                      <div
                        style={{
                          marginBottom: "5px",
                          fontSize: "20px",
                          color: "black",
                        }}
                      >
                        وضعیت جاری :
                        <strong className="mg-r-5">
                          {thisDeal.stateTitle}
                        </strong>
                      </div>
                    </Form.Group>

                    <Form.Group as={Col} lg={4} style={{ textAlign: "right" }}>
                      <div>تغییر وضعیت</div>
                      <CFormSelect
                        style={{
                          width: "100%",
                          color: "black",
                          minHeight: 40,
                        }}
                        onChange={(e) => setDealNewState(e.target.value)}
                        // onFocus={() => setErrors({ ...errors, date: "" })}
                      >
                        <option value="">انتخاب</option>

                        {dealStatesDrop
                          ? dealStatesDrop.map((e) => {
                              return (
                                <>
                                  {" "}
                                  <option value={e.value}>{e.label}</option>
                                </>
                              );
                            })
                          : null}
                      </CFormSelect>
                    </Form.Group>

                    <Form.Group as={Col} lg={4} style={{ textAlign: "right" }}>
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
                              border: "1px solid #e7e7e7",
                              width: "90%",
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
                    </Form.Group>

                    <Col lg={12}>
                      <MaxLengthInput
                        as="textarea"
                        placeholder="توضیحات"
                        rows={3}
                        maxLength={300}
                        onChange={(e) => setChangeStateDes(e.target.value)}
                      />
                      <div className="col-12 mg-t-20">
                        <Button
                          style={{
                            width: "200px",
                            backgroundColor: "#4BB543",
                            fontFamily: "DIROOZ-FD",
                          }}
                          className=""
                          variant="primary"
                          onClick={() => {
                            ChangeDealingItemState();
                          }}
                        >
                          <TbChecklist
                            style={{ fontSize: "19px", margin: "0 2px" }}
                          />
                          تایید{" "}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Tab>
              {/* <Tab eventKey="تراز مالی" title="تراز مالی">
                <Col lg={12} xl={12}>
                  <Row>
                    <Table
                      style={{ marginTop: "50px", direction: "ltr" }}
                      className="buyers-table"
                      responsive=""
                      bordered
                    >
                      <thead>
                        <tr>
                          <th className="text-center">مانده</th>
                          <th className="text-center">بستانکار</th>
                          <th className="text-center">بدهکار</th>
                          <th className="text-center">شرح</th>
                          <th className="text-center">تاریخ</th>
                          <th className="text-center">ردیف</th>
                        </tr>
                      </thead>
                      <tbody>
{balanceList? 
balanceList.map((b,index)=>{

  return<>
               <tr>
                          <td>{b.balance.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td>{b.withdrawal.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td>{b.deposit.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td>{b.refTypeTitle}</td>
                          <td>{b.creationDateTime}</td>
                          <td>{index+1}</td>
                        </tr>
  </>
})
:null}
           
                      </tbody>
                    </Table>
                  </Row>
                </Col>
              </Tab> */}
            </Tabs>
          </div>
        </Col>
      </Row>
      <Modal
        show={modalC}
        onHide={closeModalC}
        centered={true}
        size={"lg"}
        className="modal-block-info "
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
        }}
      >
        <Card.Header>تعویض چک</Card.Header>
        <Card.Body>
          <Row>
            <Table
              style={{
                marginTop: "50px",
                direction: "rtl",
                maxHeight: "50px",
                padding: "10px",
              }}
              className="buyers-table mg-b-50 "
              responsive=""
              bordered
            >
              <thead>
                <tr>
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
                {changingCheck ? (
                  <tr className="deleted-color">
                    <td className="txt-al-c">{changingCheck.sayyadNumber}</td>
                    <td className="txt-al-c">{changingCheck.dueDate}</td>
                    <td className="txt-al-c">{changingCheck.effectiveDate}</td>
                    <td className="txt-al-c">
                      {changingCheck.amount
                        .toString()
                        .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td className="txt-al-c">{changingCheck.ownerName}</td>
                    <td className="txt-al-c">{changingCheck.bankName}</td>
                    <td className="txt-al-c">{changingCheck.stateTitle}</td>
                  </tr>
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
            <Form.Group as={Col} lg={12}></Form.Group>

            <div className="txt-al-c fw-bold col-12 mg-b-10">
              تعویض با چک های جدید
            </div>

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
                  maxLength={15}
                  style={{ marginBottom: "10px" }}
                  onChange={handleChangSeperator}
                  value={newCheckAmount}
                  id="cellFive"
                />
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              طرف چک
              <Form.Group as={Col} lg={12} className="p-0">
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
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
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              تاریخ سررسید{" "}
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
                  <Form.Control
                    maxLength={15}
                    style={{ marginBottom: "10px" }}
                    value={changingCheck ? changingCheck.dueDate : null}
                    id="DueDate"
                  />
                </div>

                {errors.date ? (
                  <span style={{ color: "red" }}>{errors.date}</span>
                ) : null}
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
                  <Form.Control
                    maxLength={15}
                    style={{ marginBottom: "10px" }}
                    value={changingCheck ? changingCheck.effectiveDate : null}
                    id="DueDate"
                  />
                </div>

                {errors.date ? (
                  <span style={{ color: "red" }}>{errors.date}</span>
                ) : null}
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              عهده
              <Form.Group as={Col} lg={12} className="p-0">
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
                  }}
                  value={newCheckBank}
                  onChange={(e) => setNewCheckBank(e.target.value)}
                  className=""
                  id="cellSeven"
                >
                  <option>انتخاب</option>

                  {banksDrop
                    ? banksDrop.map((ck) => {
                        return (
                          <>
                            <option value={ck.value}>{ck.label}</option>
                          </>
                        );
                      })
                    : null}
                </CFormSelect>
              </Form.Group>
            </div>

            {editMode ? (
              <>
                <div className="col-12" style={{ position: "relative" }}>
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      marginLeft: "5px",
                    }}
                    disabled={
                      newCheckSayad &&
                      newCheckAmount &&
                      newCheckOwner &&
                      newCheckBank &&
                      newCheckSerial
                        ? false
                        : true
                    }
                    className=""
                    variant="primary"
                    onClick={() => {
                      deleteRowE(edditingRow);
                      setEditMode(false);
                      setTimeout(() => {
                        validateDuplicateC();
                        extractTable();
                      }, 500);
                    }}
                  >
                    ویرایش چک
                  </Button>
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      marginRight: "5px",
                      color: "green",
                      backgroundColor: "white",
                    }}
                    //   onClick={() => {

                    //   }}
                    className=""
                    variant="default"
                    onClick={() => {
                      setEditMode(false);
                      clearForm();
                    }}
                  >
                    لغو
                  </Button>
                </div>
              </>
            ) : (
              <div className="col-12" style={{ position: "relative" }}>
                <Button
                  style={{
                    width: "200px",
                    backgroundColor: "#4BB543",
                    fontFamily: "DIROOZ-FD",
                    // position: "absolute",
                    // bottom: "12%",
                    // right: 0,
                  }}
                  //   onClick={() => {

                  //   }}
                  className=""
                  variant="primary"
                  disabled={
                    newCheckSayad &&
                    newCheckAmount &&
                    newCheckOwner &&
                    newCheckBank &&
                    newCheckSerial
                      ? false
                      : true
                  }
                  onClick={() => {
                    validateDuplicateC();
                  }}
                >
                  <TbChecklist style={{ fontSize: "19px", margin: "0 2px" }} />
                  ثبت چک
                </Button>
              </div>
            )}

            <div style={{ minHeight: "300px", width: "100%" }}>
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
                    <th className="text-center">شماره سریال </th>
                    <th className="text-center">مبلغ(ریال)</th>
                    <th className="text-center">طرف چک</th>
                    <th className="text-center">عهده</th>
                    <th className="text-center">حذف</th>
                    <th className="text-center">ویرایش</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </div>

            <Form.Group as={Col} lg={12}></Form.Group>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="col-12 row mg-t-20">
            <Button
              style={{
                width: "200px",
                backgroundColor: "#4BB543",
                margin: "0px 10px",
                fontFamily: "DIROOZ-FD",
              }}
              onClick={() => {
                extractTable();
                validateChecksAmountC();
              }}
              className="margin-auto"
              variant="primary"
              // disabled={!validAmount}
            >
              <TiInputChecked style={{ fontSize: "19px", margin: "0 2px" }} />
              تایید نهایی عملیات{" "}
            </Button>
          </div>
        </Card.Footer>
      </Modal>
      <Modal
        show={modalF}
        onHide={closeModalF}
        centered={true}
        className="modal-block"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
        size={"md"}
      >
        <Card.Header>تایید تعویض</Card.Header>
        <Card.Body>
          <div className="col-12 txt-al-r mg-t-20 grey-form-heading">
            توضیحات
            <Form.Group as={Col} lg={12} className="p-0">
              <MaxLengthInput
                as="textarea"
                placeholder=""
                rows={3}
                maxLength={300}
                onChange={(e) => setChangeCheckDes(e.target.value)}
              />
            </Form.Group>
          </div>
        </Card.Body>
        <Card.Footer>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
            }}
            disable={changeCheckDes.length > 0 ? false : true}
            color="success"
            className="px-4"
            onClick={() => {
              ChangeCheck();
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
            onClick={() => {
              closeModalF();
              setChangeCheckDes("");
            }}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>
      <Modal
        show={modalE}
        onHide={closeModalE}
        centered={true}
        className="modal-block"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
        size={"lg"}
      >
        <Card.Header>ویرایش چک</Card.Header>
        <Card.Body>
          <Row>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              شماره سریال{" "}
              <Form.Group as={Col} lg={12} className="p-0">
                <Form.Control
                  type="number"
                  maxLength={15}
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => setEditingCheckNumber(e.target.value)}
                  value={editingCheckNumber}
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
                  onChange={(e) => setEditingSayyadNumber(e.target.value)}
                  value={editingSayyadNumber}
                  id="cellTwo"
                />
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              مبلغ(ریال){" "}
              <Form.Group as={Col} lg={12} className="p-0">
                <Form.Control
                  type="text"
                  maxLength={15}
                  style={{ marginBottom: "10px" }}
                  value={numberWithCommas(editingAmount)}
                  id="cellFive"
                />
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              طرف چک
              <Form.Group as={Col} lg={12} className="p-0">
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
                  }}
                  value={editingOwnerId}
                  onChange={(e) => setEditingOwnerId(e.target.value)}
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
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              تاریخ سررسید{" "}
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
                  <Form.Control
                    maxLength={15}
                    style={{ marginBottom: "10px" }}
                    value={editingDueDate}
                    id="DueDate"
                  />
                </div>

                {errors.date ? (
                  <span style={{ color: "red" }}>{errors.date}</span>
                ) : null}
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
                      setEditingEffectiveDay(e.target.value);
                    }}
                    onFocus={() => setErrors({ ...errors, date: "" })}
                    value={editingEffectiveDay}
                    id="effeDay"
                  >
                    <option value="">روز</option>
                    {days
                      ? days.map((day) => {
                          return <option value={day.value}>{day.label}</option>;
                        })
                      : null}
                  </CFormSelect>
                  <CFormSelect
                    style={{ width: "33%", color: "black" }}
                    value={editingEffectiveMonth}
                    onChange={(e) => {
                      setEditingEffectiveMonth(e.target.value);
                    }}
                    id="effeMonth"
                  >
                    <option value="">ماه</option>
                    {months
                      ? months.map((month) => {
                          if (dueDateM <= month.value) {
                            return (
                              <option value={month.value}>{month.label}</option>
                            );
                          }
                        })
                      : null}
                  </CFormSelect>
                  <CFormSelect
                    style={{ width: "33%", color: "black" }}
                    value={editingEffectiveYear}
                    onChange={(e) => {
                      setEditingEffectiveYear(e.target.value);
                    }}
                    id="effeYear"
                  >
                    <option value="">سال</option>
                    {newYears
                      ? newYears.map((year) => {
                          if (dueDateY < year.value) {
                            return (
                              <option value={year.label}>{year.label}</option>
                            );
                          }
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
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
                  }}
                  value={editingBankId}
                  onChange={(e) => setEditingBankId(e.target.value)}
                  className=""
                  id="cellSeven"
                >
                  <option>انتخاب</option>
                  {banksDrop
                    ? banksDrop.map((ck) => {
                        return (
                          <>
                            <option value={ck.value}>{ck.label}</option>
                          </>
                        );
                      })
                    : null}
                </CFormSelect>
              </Form.Group>
            </div>

            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              <Button
                style={{
                  width: "200px",
                  backgroundColor: "#4BB543",
                  fontFamily: "DIROOZ-FD",
                  marginLeft: "5px",
                }}
                disabled=""
                className=""
                variant="primary"
                onClick={() => {
                  EditCheck();
                }}
              >
                ویرایش چک
              </Button>
              <Button
                style={{
                  width: "200px",
                  backgroundColor: "#4BB543",
                  fontFamily: "DIROOZ-FD",
                  marginRight: "5px",
                  color: "green",
                  backgroundColor: "white",
                }}
                //   onClick={() => {

                //   }}
                className=""
                variant="default"
                onClick={() => {
                  closeModalE();
                }}
              >
                لغو
              </Button>
            </div>
          </Row>
        </Card.Body>
      </Modal>
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
            onClick={() => setModal(-1)}
          >
            تایید
          </CButton>
        </Card.Footer>
      </Modal>
      <Modal
        show={modalG}
        onHide={closeModalG}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card.Header>اسناد قسط</Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer></Card.Footer>
      </Modal>
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
              آیا از حذف این چک اطمینان دارید؟
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
              DeleteCheck(deleteCheckId);
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
        show={modalA}
        onHide={closeModalA}
        centered={true}
        size={"lg"}
        className="modal-block"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
          padding: "unset 20px",
        }}
      >
        <Card.Header>ثبت چک‌های جدید</Card.Header>

        <Card.Body>
          <Row>
            <div className="col-12">
              {" "}
              مبلغ کل قسط :{" "}
              {loanTotal
                .toString()
                .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              ریال
            </div>

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
                  maxLength={20}
                  style={{ marginBottom: "10px" }}
                  onChange={
                    handleChangSeperator
                    // numberWithCommas(e.target.value);setNewCheckAmount(e.target.value)}
                  }
                  // onKeyUp={(e)=>thousnads(this,e.target)}
                  value={newCheckAmount}
                  id="cellFive"
                />
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              طرف چک
              <Form.Group as={Col} lg={12} className="p-0">
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
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
              </Form.Group>
            </div>
            <div className="col-6 txt-al-r mg-t-20 grey-form-heading">
              تاریخ سررسید{" "}
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
                  <Form.Control
                    maxLength={15}
                    style={{ marginBottom: "10px" }}
                    value={loanFullDetails ? loanFullDetails.dueDate : null}
                    id="DueDate"
                  />
                </div>

                {errors.date ? (
                  <span style={{ color: "red" }}>{errors.date}</span>
                ) : null}
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
                          return <option value={day.value}>{day.label}</option>;
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
                          if (dueDateM <= month.value) {
                            return (
                              <option value={month.value}>{month.label}</option>
                            );
                          }
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
                          if (dueDateY <= year.label) {
                            return (
                              <option value={year.label}>{year.label}</option>
                            );
                          }
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
                <CFormSelect
                  style={{
                    color: "black",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "6px 32px 6px 12px",
                  }}
                  value={newCheckBank}
                  onChange={(e) => setNewCheckBank(e.target.value)}
                  className=""
                  id="cellSeven"
                >
                  <option>انتخاب</option>

                  {banksDrop
                    ? banksDrop.map((ck) => {
                        return (
                          <>
                            <option value={ck.value}>{ck.label}</option>
                          </>
                        );
                      })
                    : null}
                </CFormSelect>
              </Form.Group>
            </div>

            {editMode ? (
              <>
                <div className="col-12" style={{ position: "relative" }}>
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      marginLeft: "5px",
                    }}
                    disabled={
                      newCheckSayad &&
                      newCheckAmount &&
                      newCheckOwner &&
                      effectiveDay &&
                      effectiveMonth &&
                      effectiveYear &&
                      newCheckBank &&
                      newCheckSerial
                        ? false
                        : true
                    }
                    className=""
                    variant="primary"
                    onClick={() => {
                      deleteRowE(edditingRow);
                      setEditMode(false);
                      setTimeout(() => {
                        validateDuplicate();
                        extractTable();
                      }, 500);
                    }}
                  >
                    ویرایش چک
                  </Button>
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#4BB543",
                      fontFamily: "DIROOZ-FD",
                      marginRight: "5px",
                      color: "green",
                      backgroundColor: "white",
                    }}
                    //   onClick={() => {

                    //   }}
                    className=""
                    variant="default"
                    onClick={() => {
                      setEditMode(false);
                      clearForm();
                    }}
                  >
                    لغو
                  </Button>
                </div>
              </>
            ) : (
              <div className="col-12" style={{ position: "relative" }}>
                <Button
                  style={{
                    width: "200px",
                    backgroundColor: "#4BB543",
                    fontFamily: "DIROOZ-FD",
                    // position: "absolute",
                    // bottom: "12%",
                    // right: 0,
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
                  // onClick={() => {
                  //   validateDuplicate();

                  // }}
                  onClick={() => {
                    AddCheckValidation();
                  }}
                >
                  <TbChecklist style={{ fontSize: "19px", margin: "0 2px" }} />
                  ثبت چک
                </Button>
                <div className="error-text">{addTextError}</div>
              </div>
            )}
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
                  <th className="text-center">شماره سریال </th>
                  <th className="text-center">مبلغ(ریال)</th>
                  <th className="text-center">طرف چک</th>
                  <th className="text-center">عهده</th>
                  <th className="text-center">حذف</th>
                  <th className="text-center">ویرایش</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer>
          {" "}
          <div className="col-12 row mg-t-20">
            <CButton
              style={{
                width: "100px",
                backgroundColor: "#4BB543	",
                margin: "0px 10px",
                backgroundColor: "white",
                border: "solid black 1px",
              }}
              color="dafault"
              className="px-4"
              onClick={() => setModalA(false)}
            >
              بازگشت{" "}
            </CButton>
            <Button
              style={{
                width: "200px",
                backgroundColor: "#4BB543",
                margin: "0px 10px",
                fontFamily: "DIROOZ-FD",
              }}
              onClick={() => {
                extractTable();
                validateChecksAmount();
              }}
              className=""
              variant="primary"
              // disabled={!validAmount}
            >
              <TiInputChecked style={{ fontSize: "19px", margin: "0 2px" }} />
              تایید نهایی عملیات{" "}
            </Button>
          </div>
        </Card.Footer>
      </Modal>
      <Modal
        show={modal === 99}
        onHide={closeModal}
        centered={true}
        size={"lg"}
        className="modal-block"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
        }}
      >
        <Card.Header>لیست چک</Card.Header>
        <Card.Body>
          <div className="container">
            <div className="txt-al-l">
              <CButton
                style={{
                  width: "250px",
                  backgroundColor: "#4BB543	",
                  margin: "0px 10px",
                }}
                color="success"
                className="px-4"
                onClick={() => {
                  setModalA(true);
                  jsonObj = [];
                }}
                disabled={submitedTotal < loanTotal ? false : true}
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABgklEQVQ4ja2UvU6UURCGn/lCDxQEY/xJCJplDVZUZrkGC41giJcjcBnYGi2Wa9DOcpc10ZiooEgjdFQ+FMyGzbfnW93INCeZd+ad/wPXLDEJVCugDdxJ1TfgICL+TBVFnVd31Z+Oyw91R53/pwzVdeAtsAD0gS7wKeH7wOPM+gR4EhHvJmW2rp6rv9UNtRQw1Ofqadp2JpV5kmQPalhbbdd0q0l6rM6VCHezRxsFrKf2Cvqt9NmuA1UOoNdQZhNhqAfq0dCvSqwN3AC6EWGhI0VJ2y5wMzmYSexWvp8z8hLwesR3KfUfRnTPIuILVxtwG+hXXLMMMzzMdxkgI68NjYb9i4g1xuVevt8ZcajyAvpTDqVSB2NDydt8xWVjN6eocAtoAXtjw8zF/pXLulrDSov9UD3LdZsthlM7eU6nubRNp/ciyc7VR6N4yaEDvAEWgQGwD3xMuMXl59ACjoGnEfG+uSNXpHPqdja7Lkfqy6Yy//bBBrAC3E3VV2AwzTX9t1wAW/dwvVFUsT8AAAAASUVORK5CYII="
                  style={{ marginLeft: "3px" }}
                />
                ثبت چک های جدید{" "}
              </CButton>
            </div>
            <div class="wrapper1">
              <div class="div1"></div>
            </div>
            <div style={{ overflowX: "scroll", width: "100%" }}>
              <Table
                style={{
                  marginTop: "50px",
                  direction: "rtl",
                }}
                className="buyers-table mg-b-50"
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
                    <th className="text-center">ویرایش</th>
                    <th className="text-center">حذف</th>
                    <th className="text-center">تعویض</th>
                  </tr>
                </thead>
                <tbody>
                  {checkList ? (
                    checkList.length > 0 ? (
                      checkList.map((c, index) => {
                        return (
                          <>
                            <tr className="">
                              <td className="txt-al-c">{index + 1}</td>
                              <td className="txt-al-c">{c.sayyadNumber}</td>
                              <td className="txt-al-c">{c.dueDate}</td>
                              <td className="txt-al-c">{c.effectiveDate}</td>
                              <td className="txt-al-c">
                                {c.amount
                                  .toString()
                                  .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </td>
                              <td className="txt-al-c">{c.ownerName}</td>
                              <td className="txt-al-c">{c.bankName}</td>
                              <td className="txt-al-c">{c.stateTitle}</td>
                              <td className="txt-al-c">
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAFAElEQVR4nO3dT2gcZRjH8d8zuxsVcVu7TfWQNo1WCrag4CW5CpKAHkyxYAVBPHkJwu7aVhDUk/820WIvnkS9lOZg0YtF8BovBQX/IE3ZrERcNZPgHKxss/N4yK5O4v55Z+Z9Z2Znnu8pbN59Z9lP3pm8u0sCSJIkSZIkSZIkSZKUnCjuB5D0qs3mnfx34QUATwE4CSAH4AYTfW7dar1XO3bv7zqPJyADeqm+9bBL7hUAk32GOGy5zy4dGf9M1zEFpE/VNXuGgS8AFIcMdcH8/OLUwY90HFdAeuQDo5s2FAHZUwCMblpQBMRTCIxuoVEEpJMGjG6hUAQEWjG6BUbJPIgBjG6BUDINYhCjW5st95SffYpl6IFIO+XItT6prjYPqd4h0yC1o6UVAuYAOAYPU+T82IuqgzMNAkSFwk+ojsw8CBAJyv2qAwWkU+1oaQXkPgpgy8D0LdWBAuJpcXL8GgGPQ/9K+VF1YOpBzq7bE37Gmzh9EWNZdWyqQcp1e7q9je+rdfs1P/fTjFJv5//6QHVwakHKdXuaCFcBFJnwakwoDrvW/LuHD99UvUMqd+qVxh+PgK0vAdztvZ2Z31qaOnhex1wKOcyYXZoqfe3nTqkDGfYERoQSCANIGYjqE2cYJTAGkCIQvz/FhlBCYQApuahX1+wZsPUVfJzniehcub7xpp/jLE6OXwO5j6H35jE0BpCCFRL2JXRNK0ULBjDiILrezwiJktOFAYwwiHefoWM+Yrxemyr52qtU1+wZoPM6mKZGEsTUO31BVoruRg7E9NuucaOMFEgE74EDiBdlZECiwugWF8pIgESN0S0OlMSDxIXRLWqURIPEjdHJyeVx4u2J0noUB0vsSydJwWDGbFQYQEJXSJIwdO3AVUscSJYxgISBZB0DSBCIYOyUCBDB+K/YQQRjd7GCCMb/iw1EMHoXC4hg9C9yEMEYXKQggjG8yEAEQ61IQARDPeMgguEvoyCC4T9jIIIRLCMgghE87SCCES6tIIIRPm0ggqGnnI5Jzq7bE65LFwHKA9iPeF4jcwiYWxxhDMDAE3fuxua+do5fYaCqe+4BOQTM6fwUelwZ+Uk+zZybbNi/MmjcxPx7Sg0GYOhzWctEbQA/mJh7T6nCAAx+UM4FbZqau5PDjNk0YQAGQYiM/lGwkf9tql/GQNjFn4amdgiYSyMGYBDEMvN3p1J5mvJmboVY2kFSe5ryZu7T70wbGmdL9WnKm7mLuoVvNU2Vul9tBxUI5OV1pzRsTO3Ige8AuhJkfk+ZwgAC7NQXrvNtY4XNn5jxtMoppNKwHyTgpOtSyYK73wX2EeEugG5nohIxTgB8rMddM4cBBACp1DeeBNGn0HWRZaZKY+sCwAueWzOJAQQ4ZRHRM50vi0S4Wq7b06EeARFzu33Rc0tmMQCfK2Thul0cK6AJ4A7PzeFXCjNVGptbACjLGIDPFVLI8ynsxgB0rBQiBmg17Zs+lfydsiw60+c7oVF4m+ezsM8YlvIpq7raPMT5wi8A8gOGZWI3bTLlFcKFwhkMxgB0XegznDoI47TiUEEJkTIIAQ/5mLdIhEsqO3ppd34u6j8rjLlJwDKY51u3Dhx/Y6JoB31gWW3YNeHfmPkdIvqwx7dcBlaI6ONWiy+9/0DJ5DuFqc/XxrBc33iOiKrY+e/J34D48na7ffnCfff8ZubhSZIkSZIkSZIkSZIkxdk/tOLwTIMTlO8AAAAASUVORK5CYII="
                                  id="editcheckss"
                                  style={{ width: "25px", cursor: "pointer" }}
                                  onClick={() => {
                                    GetCheck(c.id);
                                    setEditingId(c.id);
                                    setModalE(true);
                                  }}
                                />
                              </td>{" "}
                              <td className="txt-al-c">
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII="
                                  id="deletecheckss"
                                  onClick={() => {
                                    setDeleteCheckId(c.id);
                                    setModalP(true);
                                  }}
                                  style={{ width: "25px", cursor: "pointer" }}
                                />
                              </td>
                              <td className="txt-al-c">
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAI/0lEQVRogcVae3BU1Rn/fWc3j0ISyO4mYobk7iYktsV2agoz4qsWlSlOnbEKtSU8lD6daUuTbAgZKV2lQwQ2u1jsUDuiNYhWHnU69CGK7XRkoHYi6lgHK3ncjTxi9pGQBIYke8/XP0hpGpLcczd7w29m/9h7f9/v+757zj3n3PMdwjVGXWdvmZTGNgBLAPSD+IWhIXdgZzkN2uHPaYeoKmr12ANSGs8DyBu5lAOmDZnORCmAh+zwSXaImiHA7ByIJLYyUD1RDMIwKraXFZ5Kt2+RbkEz+Fu7CvsjicMM1GCSBy6Fo9QO/9PapWvbe+5gIX8H4HozrnTIuB0xTE8LM1NtJL4OQh6BQrIAkDnsSHt3Bqaphf2ReDODVlow+XRrmeu8HbFMSwsz6AuW+IyP7YrFtoTrIolb/a1dhQBAyeElAN5UNib7Ek77tBQ4e3bGwGD2LiZeDSAmJKq2l7pfX87sKIn0PAFwg4LfbgKflMAZAk4yxAnJdGyHL793qvGlNeGatmgFCXEAhNFdWILweG6J6xcBIumPJO5j5hcA5FuUTwJ0FMD+oWF+cWe5uy+VGNOWcF0kcatk/hOAWRNQ/pLpzFjVODcvXh3pLRWcPADQTSm6GwDoecHJLdt9hV1WDNOS8OXummgDoJlQI1LIZeGSgpZAR0d2H+U9TcB3UvXLwEUQtuUNuBoD82lIxSYtCdfp0UoJ8Y4amweZxbqQz/UMANTo8bUE/ApA9hRC+JClqAqV5r9vRpz2pSVAWUT861o90Rw4e3ZGyOt+jiFuAdA+BdH5EPJYrZ6oMiOmJWFd87wPIGLNilf1D2b9o66tuzzkzX83gxwLwHwo1RgImAHwHr+eqDPhpQe1kcRtYP4zgFyLpn0Efjjo9bwKZvLr8Q1MtBmAI/Vo+LEmr2fLeHfSOi2tb4/eYAhxEMB8i6ZMQFOO5moIECX9emwxg14GUJhiKMzED4c0T/PYG2lfeFR/8slnhDHjaQBrrdoy4y1J8qEd3oJz/tauQnZm7AVwd4qhDEvJt4VLPf8cfdG2DYCajsSjRDIMUJZF03MEPBj0uo8HmEW/nrgHRFUMfvDye2oJH1P2cGVwzpwL/71g2ygd8rl2QeB2WB7McD0TngSAAJFs8rkPN3ldq51CljOwG4C0oFXBg86Noy/YvsXTcLrPPZQc3gNgqaoNgaNBr2fc97dGj35VgF5hUIGaGg9Kh7wxXFzYCkzDPNw4Ny+eq7m+zsAmAIaKDYMK6tsS4y5RQ96CvzkMsQAMxQ0CyiLDseHKPzWj9MAfid0NxksqrSOFXBguKWiZUEvv9TGMowCKFFwPSQeXhos9Z6Z1pRXUPEeEkyoBHDfjOpPCNamWd3YHA8uh9k5nOqRYCVyDpeW2ue7T/THXV8B4alIiGx1mWiGv+xgTfqnil5lXAADV6LHHCHTnxFQakMQbw5r7QxVhK/BH4t9kxrMYuzojvNKkub+lovHTjp7ZDpKdV2mMA4cTxYJA9bg8uU/w4/sF0wprqaghqLn3CcP4MhP9AcAFAF3MvHVoyLVGVWOHL78XjOdUuEmD7nQCuAjTp8OpLvFMMVJduH8qGoJks4RYZ0qUvFCAobBVwnOmEpDdmKl53gOQMOMJQoVgAdPBAaCbA8zX4NtZDQEiCeBtMx4DPkFM/1bQ9FzQe7849dBsxTkFziwnk2whNl9/GEKuAfCeqvdAR0f2AOVtBniNBM0kpiNCJv12VAQvg7oANiPNoPq2REnSwSoL/H6nQcWqJZBaPX4QwANjNYjw3aDm3qeiYQX+zsSNLLEZ4JyJOMT8VxoJ7l9Q+Ghnwo6Q5q4249V2xD4LopMTC+Gp/rir7jcLaNhMK90QAEDMe1XIxPhJjR6/RYE5+XYtYV2uJ/H39afjc1X8phMCAAwnmgGo7OsKAvb79V7fZCTF2u4imeQT/kgs1R2NlCAAIFzsOQNAqZUBFDEbh+vbEiUTEdhwtqoIMaiAmV6r0eM/m65p74oT6TC2QK2VAUK54ZAtfj22eLzbO3z5vQSOKsbgIOCJ/kjijw2n+9yKNinjSsLh4sJWZg6rGjKogEFv1Orx3es7o1d9k0qmjyzGsnQoOfxObWdsoUU7S/i/Cdjf1TWTL2WcAFBhRYSBiwR+VTK9OMvrej1AJP16fBEDB6F4xGGU2iCzqA75XLus2anhqhXHSJ3oOIDMVASZ8RY7+dvhYs+ZH5/qL8jMGHoZwF0pKO2l7OQPRu84pgNXDRTbvQUnmPh7UFi2jAci3C4MOuHXY4t3ludGczXX1wgIWtejKr6U8fb69ugNqcQxoepEN/wdsQYmGrdcoQgD4E1NmrsRROzXY99g0G/xv1N3qugH0b1NmuvoFGK5gkkX0TV63E/ANjPepGA+lCGca57UZvfUtXWXS+E4OOaEgAoinZqrbD+R0q7nZJh07gt53UECreTLmwSpgei+YTZaavSem7aXFZ7KzRq8GaA9FlU0r95r9SGNC9PJPuh1vSQkLQLjgyn4KSXIYzV6fG2gqOhik9e1mpl+CLDyiVmDUxtTxkK5q36/hTNyPfF6gDYAmJmqQwZ253HfjwI+36XqzugCIcUBmB+V6MjVXPNGPvSnBMvv5rr2T69zkrMBhLWwXgseAb8rybksrM1uVyjFnCdgadDrNt3LVkHKg9H6j6K5ySzHCiJeDuAOABkWJXqIaE1Qcx0KMIv+zsRGMH6O0a8Z4wOWclmorCBtB9XSUmqpb0vMGhK8SBBXEvA5hpgL8OdhXtBmgBo7tfxN+4mMuvb4EimwF4CHmJpzsi49GigqSn3AHAf21Yf1+LMWjiS9ScnhFcF5c7r9rV2F0pkxL+R1H7MjLvtO0zIqLDzOu9jpfA1AZXDenG4A3XaFZds3KJG1DxBiMZVpTxm2JDxS271OkW4Q4/Ecb/4jdsQyFrZ06WSGrIA0788EjjJRVdDrfsOOOMaDPV1aCo8C66gQ/KUmbfqSBWxqYYc02g0x4bNkAsI5mqs+QJS0w/9ksG1a8uvxfSMV+tHoA/iRJq/n93b5NYNto/TgsGsVEzUCOA3gPIADQjgqr2WyAPAfVNFp7/xNFvkAAAAASUVORK5CYII="
                                  style={{ width: "25px", cursor: "pointer" }}
                                  onClick={() => GetCheckC(c.id)}
                                />
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
                    )
                  ) : null}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        <Card.Footer>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
              backgroundColor: "white",
              border: "solid black 1px",
            }}
            color="dafault"
            className="px-4"
            onClick={() => setModal(-1)}
          >
            بازگشت{" "}
          </CButton>
        </Card.Footer>
      </Modal>
      <Modal
        show={modal === 6}
        onHide={closeModal}
        centered={true}
        size="lg"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
        }}
      >
        <Card.Header>تاریخچه قسط</Card.Header>
        <Card.Body>
          <Row>
            {loanHistoryDetail.length > 0
              ? loanHistoryDetail.map((h, index) => {
                  return (
                    <>
                      <Form.Group
                        as={Col}
                        lg={12}
                        style={{ textAlign: "center" }}
                      >
                        {index === 1 ? (
                          <div className="col-12 txt-al-c mg-b-20 fw-bold">
                            اطلاعات قسط جدید
                          </div>
                        ) : null}
                        <Row>
                          <div className="col-md-3 txt-al-r mg-t-20 grey-form-heading">
                            سررسید قسط{" "}
                            <Form.Group as={Col} lg={12} className="p-0">
                              <Form.Control value={h.dueDate} />
                            </Form.Group>
                          </div>
                          <div className="col-md-3 txt-al-r mg-t-20 grey-form-heading">
                            اصل بدهی(ریال){" "}
                            <Form.Group as={Col} lg={12} className="p-0">
                              <Form.Control
                                value={
                                  h
                                    ? h.baseAmount
                                        .toString()
                                        .replaceAll(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ","
                                        )
                                    : null
                                }
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-3 txt-al-r mg-t-20 grey-form-heading">
                            سود (ریال){" "}
                            <Form.Group as={Col} lg={12} className="p-0">
                              <Form.Control
                                value={
                                  h
                                    ? h.benefitAmount
                                        .toString()
                                        .replaceAll(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ","
                                        )
                                    : null
                                }
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-3 txt-al-r mg-t-20 grey-form-heading">
                            وضعیت
                            <Form.Group as={Col} lg={12} className="p-0">
                              <Form.Control value={h.stateTitle} />
                            </Form.Group>
                          </div>
                          <div className="col-md-12 txt-al-r mg-t-20 grey-form-heading">
                            توضیحات
                            <Form.Group as={Col} lg={12} className="p-0">
                              <MaxLengthInput
                                as="textarea"
                                placeholder="---"
                                rows={3}
                                maxLength={300}
                                value={
                                  index != 0
                                    ? h.parentDescription
                                    : h.stateComment
                                }
                                readOnly
                                style={{ backgroundColor: "white" }}
                              />
                            </Form.Group>
                          </div>
                          <CButton
                            style={{
                              width: "100px",
                              backgroundColor: "#4BB543	",
                              // color: "#4BB543",
                              margin: "10px 15px",
                            }}
                            color="primary"
                            className="px-4"
                            onClick={() => {
                              LoanDocument(h.id);
                              setDeleteId(h.id);
                            }}
                          >
                            نمایش مستندات{" "}
                          </CButton>
                        </Row>
                      </Form.Group>
                    </>
                  );
                })
              : null}
          </Row>
        </Card.Body>
        <Card.Footer>
          {" "}
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
              backgroundColor: "white",
              border: "solid black 1px",
            }}
            color="dafault"
            className="px-4"
            onClick={() => closeModal()}
          >
            بازگشت{" "}
          </CButton>{" "}
        </Card.Footer>
      </Modal>
      <Modal
        show={modal === 16}
        onHide={closeModal}
        centered={true}
        size="lg"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
        }}
      >
        <Card.Header>لیست چک‌های قسط</Card.Header>
        <Card.Body>
          <Row>
            <Form.Group
              as={Col}
              lg={12}
              style={{ textAlign: "right" }}
            ></Form.Group>
            <Form.Group as={Col} lg={12} style={{ textAlign: "right" }}>
              <div className="row">
                <div
                  style={{
                    marginBottom: "5px",
                    width: "33%",
                    textAlign: "center",
                  }}
                >
                  شماره قسط : 54646
                </div>
                <div
                  style={{
                    marginBottom: "5px",
                    width: "33%",
                    textAlign: "center",
                  }}
                >
                  تاریخ سر رسید:
                </div>
                <div
                  style={{
                    marginBottom: "5px",
                    width: "33%",
                    textAlign: "center",
                  }}
                >
                  مبلغ قسط:
                </div>
              </div>
            </Form.Group>

            <Form.Group as={Col} lg={6} style={{ textAlign: "right" }}>
              <div style={{ marginBottom: "5px" }}>شماره سریال :</div>

              <Form.Control
                // onKeyUp={(e) => thousnads(e.target)}
                // onChange={(e) => setIndicator(e.target.value)}
                // value={Indicator}
                type="text"
                // maxLength={3}
                // disabled={Inflation != 2 ? true : false}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} style={{ textAlign: "right" }}>
              <div style={{ marginBottom: "5px" }}>شناسه صیاد:</div>

              <Form.Control
                // onKeyUp={(e) => thousnads(e.target)}
                // onChange={(e) => setIndicator(e.target.value)}
                // value={Indicator}
                type="text"
                // maxLength={3}
                // disabled={Inflation != 2 ? true : false}
              />
            </Form.Group>

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
                options={banksDrop}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} style={{ textAlign: "right" }}>
              <div style={{ marginBottom: "5px" }}>مبلغ (ریال) :</div>

              <Form.Control
                onKeyUp={(e) => thousnads(e.target)}
                // onChange={(e) => setAmount(e.target.value)}
                // value={amount}
                type="text"
                maxLength={15}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} style={{ textAlign: "right" }}>
              <div style={{ marginBottom: "5px" }}>طرف چک :</div>

              <Form.Control type="text" />
            </Form.Group>
            <Form.Group as={Col} lg={6} style={{ textAlign: "right" }}>
              <div style={{ marginBottom: "5px" }}>تاریخ سررسید:</div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  height: 40,
                }}
              >
                <input style={{ width: "33%", color: "black" }} value={day} />
                <CFormSelect
                  style={{ width: "33%", color: "black" }}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option>ماه</option>
                  {months
                    ? months.map((month) => {
                        return <option value={month.id}>{month.value}</option>;
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
                        return <option value={year.value}>{year.value}</option>;
                      })
                    : null}
                </CFormSelect>
              </div>
              {errors.date ? (
                <span style={{ color: "red" }}>{errors.date}</span>
              ) : null}
            </Form.Group>
            <Col>
              <CButton
                style={{
                  width: "100px",
                  backgroundColor: "#4BB543	",
                  margin: "0px 10px",
                }}
                color="success"
                className="px-4"
                // onClick={() => setModal(16)}
              >
                ثبت
              </CButton>
            </Col>
          </Row>
        </Card.Body>

        {/* <Card.Footer>
          <CButton
            style={{
              width: "100px",
              backgroundColor: "#4BB543	",
              margin: "0px 10px",
            }}
            color="success"
            className="px-4"
            onClick={() => setModal(16)}
          >
            تایید
          </CButton>
        </Card.Footer> */}
      </Modal>

      <Modal
        show={modal === 20}
        onHide={closeModal}
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
              آیا از انجام عملیات اطمینان دارید؟
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
              finalCalculate();closeModal()
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
            onClick={() => closeModal()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={modal === 21}
        onHide={closeModal}
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
              آیا از انجام عملیات اطمینان دارید؟
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
              finalOffset();closeModal()
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
            onClick={() => closeModal()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={modal === 22}
        onHide={closeModal}
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
              آیا از انجام عملیات اطمینان دارید؟
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
              finalForgiveFine();closeModal()
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
            onClick={() => closeModal()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={modal === 23}
        onHide={closeModal}
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
              آیا از انجام عملیات اطمینان دارید؟
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
              finalGoodDeallerReward();closeModal()
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
            onClick={() => closeModal()}
          >
            انصراف
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={modalDoc}
        onHide={closeModalDoc}
        centered={true}
        className="modal-block-info"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
          backgroundColor: "#7b7b7c99",
        }}
      >
        <Card.Header>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>دانلود مستندات</span>
            {/* <CloseIcon
              style={{ marginRight: "auto", cursor: "pointer" }}
              onClick={() => {
                setModalC(false);
              }}
            /> */}
          </div>
        </Card.Header>

        <Card.Body style={{ minHeight: 100 }}>
          <>
            {/* {loanDoc.length > 0 ? (
              <label
                style={{ marginTop: "10px", fontWeight: "bold" }}
                for="nf-email"
              >
                مدارک
              </label>
            ) : null} */}
            <div
              style={{ textAlign: "right", display: "flex" }}
              class="form-group col-md-12"
            ></div>
            {/* {loanDoc
              ? loanDoc.map((a, index) => {
                  return (
                    <div
                      style={{ textAlign: "right", display: "inline-flex" }}
                      class="form-group col-md-6"
                    >
                      <input
                        value={a.title}
                        class="form-control"
                        type="email"
                        id="nf-email"
                        name="nf-email"
                        autocomplete="email"
                      />
                      <GetAppIcon
                        onClick={() => {
                          setTimeout(() => {
                            downloadDoc(a.source, a.title);
                          }, 100);
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          position: "absolute",
                          left: "32px",
                          top: "40%",
                        }}
                      />
                    </div>
                  );
                })
              : null} */}

            {loanDoc
              ? loanDoc.map((a) => {
                  return (
                    <>
                      <div
                        style={{ textAlign: "right", display: "inline-flex" }}
                        class="form-group col-md-6"
                      >
                        <input
                          value={a.title}
                          class="form-control"
                          type="email"
                          id="nf-email"
                          name="nf-email"
                          autocomplete="email"
                        />
                        <GetAppIcon
                          onClick={() => {
                            setTimeout(() => {
                              downloadDoc(a.source, a.title);
                            }, 100);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            position: "absolute",
                            left: "23%",
                            top: "40%",
                          }}
                        />

                        <a
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            left: "20px",
                            top: "33%",
                          }}
                          onClick={
                            () => {
                              setModalDelete(true);
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
                    </>
                  );
                })
              : null}
          </>
        </Card.Body>

        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <CButton
            color="warning"
            className="px-4"
            onClick={() => {
              setmodalDoc(false);
            }}
          >
            بستن
          </CButton>
        </Card.Footer>
      </Modal>

      <Modal
        show={ModalDelete}
        // onHide={ModalDelete}
        centered={true}
        className="modal-block-warning"
        style={{
          direction: "rtl",
          textAlign: "right",
          color: "black",
          backgroundColor: "#7b7b7c99",
        }}
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
                  variant="danger"
                  onClick={() => DeleteDocument(IdPic)}
                >
                  حذف
                </Button>
                <Button
                  style={{ width: "100px", margin: "0px 10px" }}
                  variant="warning"
                  onClick={() => setModalDelete(false)}
                >
                  انصراف
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

export default detailTest;
