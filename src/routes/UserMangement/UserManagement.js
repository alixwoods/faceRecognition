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
import useStylee from "../../components/Styles";
import Breadcrumb from "../../components/common/breadcrumb";

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
import { Routes } from "../../api/api";
// import "./styles.scss";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createBrowserHistory } from "history";
import BootstrapTable from "react-bootstrap-table-next";
import { getMedia } from "../../api";
import { getCroppedImageUrl } from "../../utils";
import { days, months, newYears } from "../../components/date";
import { withCardActions } from "../../components/hoc/index";
import $ from "jquery";
import Loading from "../../components/Loading/Example";
import Select from "react-select";
import { RefreshToken } from "../ref";
import PNotify from "../../components/features/elements/p-notify";

const CardWithActions = withCardActions(Card);

function UserManagement(props) {
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
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [modal, setModal] = useState(-1);
  const [modalP, setModalP] = useState(false);
  function closeModalP() {
    setModalP(false);
  }  const[deleteId,setDeleteId]=useState("")

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
  // useEffect(() => {
  //   GetUserList(page);
  // }, [page]);
  const [PassView, setPassView] = useState(false);

  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        userName: table[i].userName,
        role: table[i].roleTitle,
        FirstName: table[i].firstName,
        LastName: table[i].lastName,
        nationalCode: table[i].nationalCode,
        birthDate: table[i].birthDate,
        phone: table[i].phone,
        mobile: table[i].mobile,
        Address: table[i].address,
        email: table[i].email,
        edit: (
          <div>
            <img
              onClick={() => {
                setEdit(table[i].userId);
                setView(false);
                setPassView(false);
                GetUserDetail(table[i].userId);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="data:image/png;base64,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"
            />
          </div>
        ),
        changePass: (
          <div>
            <img
              onClick={() => {
                setEdit(table[i].userId);
                setPassView(true);
                setPassword("");
                setConfirmPass("");
                setView(false);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="data:image/png;base64,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"
            />
          </div>
        ),
        delete: (
          <div>
            <img
              onClick={() => {
                setDeleteId(table[i].userId);
                setModalP(true);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFdUlEQVR4nO2bW2xURRjHfzOn1CpCQgC5tEAFFyj1knhBCc/ExAQSYsQEMeHFy4O+GSExXl8Ugi/6CCqJiS9KMAUSE55MSLjpS2uXhVbkTr0QIgrZwjnz+bBne2H3nDNnzp5S4v6Tpmc73/ef/3w7830zu1NoookmmvgfQ+Xew1D/02izDlGzUvkp+ROj9zG3+2hOyird5MY8MHAP08u7gE0Zmb7mWtsrFArDjZB1O1ryIAVg2vBniKoOXoALwC1L7ylAB5U36GWmlW8ArzdeZF4z4I9igcCUAA0cIwiep+OxC6k4LvYtQKvvgJWAwVPLeKB7sNFSdaMJAQjMGgSNAAGvph48QPsj5wnUawggaAKzpuE6ySsARs1CFIiC9u4+Z572Fb0jPEbPbqDCEbjngLO9M4AZEa0zkfDpXF8nZ3vd+jjXB55XeVbM5Gzv4gjLqyx69KpLF+lzwIX+FxD1PtDt0mGO6AP1IQu69qRxSheA88W3Ebal8plwqLdY2PWptbU1728nl6ODPirL5irI56AvOijMAaYd1JtUlqSPp7rp6Dpl42mfA1TwEqIq9lo/y8Jlx12k5obTJw+gzVGgBV9tAt6zcbOvAqKWYADD0KQbPMDiZccwDGEAkSW2bvYBCPSVsCTN5kxxnovGXHGuNB9Rs0ONf9m62S8BMftAvQF4+LqHwdIWjD7jorXh0KaTm2wHqjWzx9Y1XRUYKPUAa1P5TDy+p7B8va1xup1g29QXEbUbUTKyQ5s8P4LoL2mbujHNkNwOQwMDz2DM4fDVbpQ6HGufF0RWAZsB0HoVhcKRtBRuW2HfH0KFy034ka6lu514suLEqZuoMAC+P+RC4X4WkGSTCUFGHe6nQbHoXERTKq2mv//+uu3FXwv0Dz5Ut61UmkaptBqReI02OmKQIQDVY2qMTXFwK4F3CNVae0A5caITMb+A9FM8vaimPfD2EHiHKA5uieQ3Y3Q4IucZoAoIYNTSmja/pROhFaGVIHgw0lfq+KbVEQO3HFBug5ag8mwSoi8qutaMvHMRI4jzBQj0aHu5LV5HBPJNgtXlEWVb/Xu9QSb5ptERA/cA2AiMyw8+owOvxxHnW0VA5o91M8yAhOk7zsaBwzaxZUiA0IglENe/SWiP45DbfmfREYPsMyChTEe+Q34L6FB9UEeGzQwz3mj7xAeA5I6zJDDb5HZHdoJlRutvkGCbNMgsQQjGcJQTbCPQgCQYAxPGN7IMhhx1y6Aab5NFRwzuXBL0GZ1/9WZR2iToiOwzwMQp0CA2ZTKuDMZEOACURbKMQb47wbsgCTb3AW5uNGAfAOiwLXDcCY7bB0zkEiiP8bQpc1FjidvvJ/nC+LPAzRi7GORcBquzJKLraoJUdWTE+qbUEYNmGXT2rHacdGx1zfQ2A5v8x2FN7EKOm75JvjYcFmiWQTe3NpBw4bru1RPLICSOyowpwepOfSbYPA7HGSo/tPNr2zx/hEN07Q1SwQ9nQR3fEJPjOByXBOULRK0A9VVN263rx2mZ+i2I4N/4qdZZb0dkM8bsstPhhnyXwJqOI8Dqum3PFYaBDdG+83cCO611OMItAFrdGI28vjebhAwIvPtGzgDCdRcKtxzw95wrCP+GOeApJ46GQFaGOeAfjs294sLgFoANKkA4GN7I2sQPlyf+1uj+oYcxbAxvrh3kA2XzVUoN3L8cNd6O8KrMFHzZy75LjztzpcWBS0+C7EXUFEQJxtvhSpUthfZc/gTF2K+vSyDpr8anguoAlo+8FLaxbt5WZ7ZMWkQU+39/B+FdoDUTV3oMAx+xds7HKMdPQ2jUf4zsvdyJpzYi8gSo6Q3hjIRcQ6mfCeQb1s+bHPcUm2iiiSbuVvwHwfw0IjOIuaAAAAAASUVORK5CYII="
            />
          </div>
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
      dataField: "userName",
      text: "نام کاربری",
    },
    {
      dataField: "role",
      text: "نقش",
    },
    {
      dataField: "FirstName",
      text: "نام",
    },
    {
      dataField: "LastName",
      text: "نام خانوادگی",
    },
    {
      dataField: "nationalCode",
      text: "کد ملی",
    },
    {
      dataField: "birthDate",
      text: "تاریخ تولد",
    },
    {
      dataField: "phone",
      text: "شماره تماس",
    },
    {
      dataField: "mobile",
      text: "شماره همراه",
    },
    {
      dataField: "Address",
      text: "نشانی",
    },
    {
      dataField: "email",
      text: "ایمیل",
    },
    {
      dataField: "edit",
      text: "ویرایش",
    },
    {
      dataField: "changePass",
      text: "تغییر رمز عبور",
    },
    {
      dataField: "delete",
      text: "حذف",
    },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  // const [passWord, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setloading] = useState(false);
  const [View, setView] = useState(true);
  const [nationalCode, setnationalCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [RoleName, setRoleName] = useState(null);
  const [RoleId, setRoleId] = useState("");
  const [Roles, setRoles] = useState(0);
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const AddUser = () => {
    setloading(true);
    axios
      .post(
        Routes.AddUser,
        {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          passWord: password,
          mobile: mobile,
          birthDate: `${year}/${month}/${day}`,
          roleId: RoleId,
          nationalCode: nationalCode,
          phone: phone,
          email: Email,
          address: address,
          image: null,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          if (res.data.message === "کاربر با موفقیت ثبت شد") {
            setView(!View);
            GetUserList();
            setFirstName("");
            setLastName("");
            setnationalCode("");
            setMobile("");
            setYear("");
            setMonth("");
            setDay("");
            setPhone("");
            setPassword("");
            setConfirmPass("");
            setRoleId("");
            setRoleName("");
            setEmail("");
            setUserName("");
            setAddress("");
            setUserId("");
          }
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
          );        }

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
              AddUser();
            }
          }
        }
      });
  };

  useEffect(() => {
    GetUserList();
  }, []);
  const RolesList = () => {
    setloading(true);

    axios
      .get(Routes.RoleDropDown, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setRoles(res.data.value.response);
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
          );        }
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
              RolesList();
            }
          }
        }
      });
  };

  const GetUserList = () => {
    setloading(true);
    axios
      .get(Routes.GetUserList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          settable(res.data.value.response);
          RolesList();
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
          );        }
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
              GetUserList();
            }
          }
        }
      });
  };
  useEffect(() => {
    setb("");
  }, [edit]);
  const [edit, setEdit] = useState("");
  const [userId, setUserId] = useState("");
  const GetUserDetail = (id) => {
    setloading(true);
    axios
      .get(Routes.GetUser, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          userId: id,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {

          setFirstName(res.data.value.response.firstName);
          setLastName(res.data.value.response.lastName);
          setnationalCode(res.data.value.response.nationalCode);
          setYear(res.data.value.response.birthDate.substr(0, 4));
          var x = res.data.value.response.birthDate.substr(5);
          setMonth(x.substr(0, 2));
          setDay(x.substr(3));
          setPhone(res.data.value.response.phone);
          setMobile(res.data.value.response.mobile);
          setEmail(res.data.value.response.email);
          setRoleId(res.data.value.response.roleId);
          setRoleName(res.data.value.response.roleTitle);
          setUserName(res.data.value.response.userName);
          setAddress(
            res.data.value.response.address
              ? res.data.value.response.address
              : ""
          );
          setUserId(res.data.value.response.userId);
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
          );        }
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
              GetUserDetail(id);
            }
          }
        }
      });
  };
  const EditUser = () => {
    setloading(true);
    axios
      .post(
        Routes.EditUser,
        {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          roleId: RoleId,
          nationalCode: nationalCode,
          email: Email,
          address: address,
          phone: phone,
          mobile: mobile,
          birthDate: year + "/" + month + "/" + day,
          image: null,
          userId: userId,
          isActive: true,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          setEdit("");
          setView(true);
          GetUserList();
          setFirstName("");
          setLastName("");
          setnationalCode("");
          setMobile("");
          setYear("");
          setMonth("");
          setDay("");
          setPhone("");
          setPassword("");
          setConfirmPass("");
          setRoleId("");
          setRoleName("");
          setEmail("");
          setUserName("");
          setAddress("");
          setUserId("");
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
          );        }

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
              EditUser();
            }
          }
        }
      });
  };

  useEffect(() => {
    $("#pass")
      .focus(function() {
        $("#password-strength").css({
          height: "7px",
        });
      })
      .blur(function() {
        $("#password-strength").css({
          height: "0px",
        });
      });
  }, []);

  function passwordCheck(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;

    if (password.match(/(?=.*[0-9])/)) strength += 1;

    if (password.match(/(?=.*[a-z])/)) strength += 1;

    if (password.match(/(?=.*[A-Z])/)) strength += 1;
    displayBar(strength);
  }

  function CheckPass() {
    if (ConfirmPass === password) {
      setPassword(ConfirmPass);
      setButtonActive(true);
    }
    if (ConfirmPass !== password) {
      setButtonActive(false);
      setTextPass("رمز عبور مطابقت ندارد");
      setb(false);
    } else {
      setTextPass("");
      setb(true);
    }
  }

  function displayBar(strength) {
    switch (strength) {
      case 1:
        seta(false);
        $("#password-strength span").css({
          width: "30%",
          background: "#de1616",
        });
        break;

      case 2:
        seta(false);

        $("#password-strength span").css({
          width: "50%",
          background: "#de1616",
        });
        break;

      case 3:
        seta(false);

        $("#password-strength span").css({
          width: "75%",
          background: "#FFA200",
        });
        break;

      case 4:
        seta(true);
        $("#password-strength span").css({
          width: "100%",
          background: "#06bf06",
        });
        break;
      default:
        return;
    }
  }
  const [Text, setText] = useState("");
  const [TextPass, setTextPass] = useState("");
  const [ButtonActive, setButtonActive] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [fillField, setFillField] = useState(false);
  const [a, seta] = useState(false);
  const [b, setb] = useState(false);
  var md5 = require("md5");
  var str = md5(ConfirmPass);
  var res = str.toUpperCase();

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

  const DeleteRole = (id) => {
    setloading(true);
    axios
      .post(
        Routes.DeleteUser,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            userId: id,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          GetUserList();
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
          );        }

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
              DeleteRole(id);
            }
          }
        }
      });
  };

  const [TextError, setTextError] = useState("");

  const ChangePassword = () => {
    setloading(true);
    axios
      .post(
        Routes.ChangePassword,
        {
          userId: edit,
          oldPassword: password,
          newPassword: ConfirmPass,
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
          setTextError("رمز عبور با موفقیت تغییر یافت.");
          setTimeout(() => {
            setTextError("");
            setEdit("");
            setView(true);
            setPassView(false);
          }, 3000);
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
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              ChangePassword();
            }
          }
        }
      });
  };

  return (
    <>
      <Breadcrumb current="مدیریت کاربران" />
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
                    onClick={() => setView(!View)}
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    <Card.Title>
                      {edit ? "ویرایش کاربر" : "ثبت کاربر"}
                    </Card.Title>
                  </Card.Header>

                  <Card.Body style={{ direction: "rtl" }}>
                    <Row>
                      <Form.Group as={Col} lg={12}></Form.Group>

                      {PassView ? (
                        <>
                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              رمز عبور{" "}
                            </div>
                            <Form.Control
                              // placeholder="رمز عبور"
                              // style={{
                              //   // height: 40,
                              //   // border: "1px solid rgb(118, 118 , 118)",
                              //   // borderRadius: 2,
                              // }}
                              onKeyUp={(e) => {
                                passwordCheck(e.target.value);
                              }}
                              type="password"
                              id="pass"
                              data-strength
                              className={"form-control input-lg"}
                              name="password"
                              autoComplete="current-password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorText("");
                              }}
                            />
                            <div
                              id="password-strength"
                              //  className={"strength"}
                              style={{
                                height: "0px",
                                width: "100%",
                                background: "#ccc",
                                marginTop: "-7px",
                                borderBottomLeftRadius: "4px",
                                borderBottomRightRadius: "4px",
                                overflow: "hidden",
                                transition: "height 0.3s",
                              }}
                            >
                              <span
                                style={{
                                  width: "0px",
                                  height: "7px",
                                  display: "block",
                                  transition: "width 0.3s",
                                  backgroundColor: "#06bf060",
                                }}
                                // style={{
                                //   width: "0",
                                //   backgroundColor: "#06bf060",
                                // }}
                              ></span>
                            </div>
                          </Form.Group>

                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              تکرار رمزعبور
                            </div>

                            <Form.Control
                              // placeholder="تکرار رمزعبور"
                              // style={{
                              //   height: 40,
                              //   border: "1px solid rgb(118, 118 , 118)",
                              //   borderRadius: 2,
                              // }}
                              type="password"
                              id="confirm"
                              data-strength
                              className={"form-control input-lg"}
                              name="confirm"
                              onBlur={() => CheckPass()}
                              autoComplete="current-password"
                              onChange={(e) => {
                                setConfirmPass(e.target.value);
                                setErrorText("");
                              }}
                            />
                            <div id="password-strength" className={"strength"}>
                              <span
                                style={{
                                  width: "0",
                                  backgroundColor: "#06bf060",
                                }}
                              ></span>
                            </div>
                          </Form.Group>

                          {/* </div> */}

                          <div
                            style={{
                              color: "red",
                              width: "100%",
                              textAlign: "right",
                              paddingRight: 40,
                              marginTop: "20px",
                            }}
                          >
                            {TextPass}
                          </div>

                          <div
                            style={{
                              color: "green",
                              width: "100%",
                              textAlign: "right",
                              paddingRight: 40,
                              marginTop: "20px",
                            }}
                          >
                            {TextError}
                          </div>

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
                                setButtonActive(false);
                                ChangePassword();
                              }}
                              className="mb-1 mt-1 mr-1"
                              variant="primary"
                              disabled={ButtonActive === false ? true : false}
                            >
                              ثبت
                            </Button>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              نام
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setFirstName(e.target.value);
                                setErrorText("");
                              }}
                              value={firstName}
                              type="text"
                              maxLength={30}
                              // placeholder="نام"
                            />
                          </Form.Group>

                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              نام خانوادگی
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setLastName(e.target.value);
                                setErrorText("");
                              }}
                              value={lastName}
                              type="text"
                              maxLength={30}
                              // placeholder="نام خانوادگی"
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
                              onChange={(e) => {
                                setnationalCode(e.target.value);
                                setErrorText("");
                              }}
                              value={nationalCode}
                              type="tel"
                              maxLength={10}
                              // placeholder="کد ملی"
                            />
                          </Form.Group>

                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{
                                padding: "0px 3px",
                                textAlign: "right",
                              }}
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
                              className="selects-font"

                            >
                              <CFormSelect
                                style={{ width: "33%", color: "black" }}
                                onChange={(e) => {
                                  setDay(e.target.value);
                                  setErrorText("");
                                }}
                                onFocus={() =>
                                  setErrors({ ...errors, date: "" })
                                }
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
                                onChange={(e) => {
                                  setMonth(e.target.value);
                                  setErrorText("");
                                }}
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
                                onChange={(e) => {
                                  setYear(e.target.value);
                                  setErrorText("");
                                }}
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
                              <span style={{ color: "red" }}>
                                {errors.date}
                              </span>
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
                              onChange={(e) => {
                                setPhone(e.target.value);
                                setErrorText("");
                              }}
                              value={phone}
                              // placeholder="شماره تماس"
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
                              شماره همراه
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setMobile(e.target.value);
                                setErrorText("");
                              }}
                              value={mobile}
                              // placeholder="شماره همراه"
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
                              نشانی
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setErrorText("");
                              }}
                              value={address}
                              type="text"
                              // placeholder="نشانی"
                            />
                          </Form.Group>

                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              ایمیل
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorText("");
                              }}
                              value={Email}
                              // placeholder="ایمیل"
                              type="email"
                              maxLength={50}
                              // onBlur={phoneValidation}
                              // onFocus={() =>
                              //   setErrors({ ...errors, mobileNumber: "" })
                              // }
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
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              نقش
                            </div>
                            <Select
                              style={{
                                fontFamily: "DIROOZ-FD",
                                direction: "rtl",
                                textAlign: "right",
                              }}
                              placeholder={RoleName === null ? "نقش" : RoleName}
                              onChange={(e) => {
                                setRoleId(e.value);
                                setRoleName(e.value);
                                setErrorText("");
                              }}
                              options={Roles}
                            />
                          </Form.Group>

                          <Form.Group as={Col} lg={3}>
                            <div
                              style={{ padding: "0px 3px", textAlign: "right" }}
                              className="col-12 grey-form-heading"
                            >
                              نام کاربری
                            </div>
                            <Form.Control
                              onChange={(e) => {
                                setUserName(e.target.value);
                                setErrorText("");
                              }}
                              value={userName}
                              type="text"
                              // placeholder="نام کاربری"
                            />
                          </Form.Group>

                          {/* {edit ? null : ( */}
                          {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setPassword(e.target.value)}
                          value={passWord}
                          type="text"
                          placeholder="رمزعبور"
                        />
                      </Form.Group> */}
                          {/* )} */}

                          {/* <div
                        style={{
                          width: "100%",
                          display: "flex",
                          direction: "rtl",
                          textAlign: "right",
                          justifyContent: "space-between",
                        }}
                      > */}

                          {edit ? null : (
                            <Form.Group as={Col} lg={3}>
                              <div
                                style={{
                                  padding: "0px 3px",
                                  textAlign: "right",
                                }}
                                className="col-12 grey-form-heading"
                              >
                                رمز عبور
                              </div>
                              <Form.Control
                                // placeholder="رمز عبور"
                                // style={{
                                //   // height: 40,
                                //   // border: "1px solid rgb(118, 118 , 118)",
                                //   // borderRadius: 2,
                                // }}
                                onKeyUp={(e) => {
                                  passwordCheck(e.target.value);
                                }}
                                type="password"
                                id="pass"
                                data-strength
                                className={"form-control input-lg"}
                                name="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setErrorText("");
                                }}
                              />
                              <div
                                id="password-strength"
                                //  className={"strength"}
                                style={{
                                  height: "0px",
                                  width: "100%",
                                  background: "#ccc",
                                  marginTop: "-7px",
                                  borderBottomLeftRadius: "4px",
                                  borderBottomRightRadius: "4px",
                                  overflow: "hidden",
                                  transition: "height 0.3s",
                                }}
                              >
                                <span
                                  style={{
                                    width: "0px",
                                    height: "7px",
                                    display: "block",
                                    transition: "width 0.3s",
                                    backgroundColor: "#06bf060",
                                  }}
                                  // style={{
                                  //   width: "0",
                                  //   backgroundColor: "#06bf060",
                                  // }}
                                ></span>
                              </div>
                            </Form.Group>
                          )}

                          {edit ? null : (
                            <Form.Group as={Col} lg={3}>
                              <div
                                style={{
                                  padding: "0px 3px",
                                  textAlign: "right",
                                }}
                                className="col-12 grey-form-heading"
                              >
                                تکرار رمزعبور
                              </div>
                              <Form.Control
                                // placeholder="تکرار رمزعبور"
                                // style={{
                                //   height: 40,
                                //   border: "1px solid rgb(118, 118 , 118)",
                                //   borderRadius: 2,
                                // }}
                                type="password"
                                id="confirm"
                                data-strength
                                className={"form-control input-lg"}
                                name="confirm"
                                onBlur={() => CheckPass()}
                                autoComplete="current-password"
                                onChange={(e) => {
                                  setConfirmPass(e.target.value);
                                  setErrorText("");
                                }}
                              />
                              <div
                                id="password-strength"
                                className={"strength"}
                              >
                                <span
                                  style={{
                                    width: "0",
                                    backgroundColor: "#06bf060",
                                  }}
                                ></span>
                              </div>
                            </Form.Group>
                          )}

                          {/* </div> */}

                          <div
                            style={{
                              color: "red",
                              width: "100%",
                              textAlign: "right",
                              paddingRight: 40,
                              marginTop: "20px",
                            }}
                          >
                            {TextPass}
                          </div>

                          <div
                            className="col-12 row"
                            style={{
                              textAlign: "right",
                              marginTop: "10px",
                              width: "100%",
                            }}
                          >
                            {edit ? (
                              <>
                                <Button
                                  style={{
                                    width: "100px",
                                    backgroundColor: "#4BB543",
                                    border: "1px solid #4BB543",
                                    margin: "0px 10px",
                                    fontFamily: "DIROOZ-FD",
                                  }}
                                  lg={7}
                                  xl={12}
                                  onClick={() => {
                                    EditUser();
                                  }}
                                  className="mb-1 mt-1 mr-1"
                                  variant="primary"
                                  disabled={
                                    !firstName ||
                                    !lastName ||
                                    !userName ||
                                    !address ||
                                    errors.mobileNumber ||
                                    !RoleId ||
                                    !mobile
                                      ? true
                                      : false
                                  }
                                
                                >
                                  ثبت
                                </Button>

                                <Button
                                  style={{
                                    width: "100px",
                                    backgroundColor: "red",
                                    border: "1px solid red",
                                    margin: "0px 10px",
                                    fontFamily: "DIROOZ-FD",
                                  }}
                                  lg={7}
                                  xl={12}
                                  onClick={() => {
                                    EditUser();
                                  }}
                                  className="mb-1 mt-1 mr-1"
                                  variant="primary"
                                >
                                  انصراف
                                </Button>
                              </>
                            ) : (
                              <Button
                                style={{
                                  width: "100px",
                                  backgroundColor: "#4BB543	",
                                  margin: "0px 10px",
                                  fontFamily: "DIROOZ-FD",
                                }}
                                lg={7}
                                xl={12}
                                onClick={() => {
                                  edit ? EditUser() : AddUser();
                                }}
                                className="mb-1 mt-1 mr-1"
                                variant="primary"
                                disabled={
                                  !firstName ||
                                  !lastName ||
                                  !userName ||
                                  !address ||
                                  errors.mobileNumber ||
                                  !RoleId ||
                                  !b ||
                                  !mobile
                                    ? true
                                    : false
                                }
                              >
                                ثبت
                              </Button>
                            )}
                            <p
                              className="wtxt-al-c col-5"
                              style={{ color: "red" }}
                            >
                              {" "}
                              {errorText}
                            </p>
                          </div>
                        </>
                      )}
                    </Row>
                  </Card.Body>
                </CardWithActions>
              </Col>
            </Row>

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
                       <div className="scrolls-horizontal">
                    <BootstrapTable
                      // id="terminal"
                      // ref={ref}
                      bootstrap4
                      keyField="id"
                      data={products}
                      columns={columns}
                      pagination={paginationFactory({ sizePerPage: 5 })}
                    />
                    </div>
                  </div>

                  {/* <div
                    className="col-md-7"
                    style={{ marginTop: 20, direction: "ltr" }}
                  >
                    <Pagination
                      count={Math.ceil(countPage)}
                      page={page}
                      onChange={handleChange}
                      className={classes.root}
                    />
                  </div> */}
                </Card.Body>
              </Card>
            </div>
          </div>

        </Form>
      </section>
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
              آیا از حذف این نقش اطمینان دارید؟
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
              DeleteRole(deleteId);
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
      {loading === true ? <Loading /> : null}
      
    </>
  );
}

export default UserManagement;
