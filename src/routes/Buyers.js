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
import { toast } from "react-toastify";
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
import { createBrowserHistory } from "history";
// import "./myStyles.css";
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
function Buyers(props) {
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
  const [dealingItems, setDealingItems] = useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    BuyersNature();
    BuyersType();
    BuyersKind();
    BuyersReport(page);
  }, [page]);
  const [modal, setModal] = useState(-1);
  function closeModal() {
    setModal(-1);
  }
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        fullName: table[i].name,
        nationalId: table[i].nationalId,
        phone: table[i].phone,
        registerPlace: table[i].registerPlace,
        dealingItems:
          table[i].dealingItems.split(",").length > 2
            ? `${table[i].dealingItems.split(",")[0]}, ${
                table[i].dealingItems.split(",")[1]
              },...`
            : table[i].dealingItems,
        kindTitle: table[i].kindTitle,
        natureTitle: table[i].natureTitle,
        postalCode: table[i].postalCode,
        typeTitle: table[i].typeTitle,

        mobile: table[i].mobile,
        // detail: (
        //   <img
        //     onClick={() => {}}
        //     style={{ cursor: "pointer", width: "40px" }}
        //     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEk0lEQVRoge2aS2xUVRjH/9+dNwqYoiSUkt7p0NaGmBiXtimJUZMaXBl24laJlFglgbgoh8Zoq9EGGw1bHV1J3Bh8BDXh4YrgBlE6nc5MM1BAUiqCpTN37vlcTO9w5z33wcxo+K3OOfec7/t/cx7z3QfwgPaC3DK0Iy06tByGQRgCeACgCIDNAD+05uofgK8DSBDwOzP9ElBWT13onlx2w7+jQNSkCPoVuRtMrwB4BoBi0b1OxD8BFM1IHE+FxapdLbYC6UqPhUL6xtcJeBPgLXadl0i5CsgPVzy3P728bfqu5dFWB/QuiF3E+BjgsNWxDZJg8P45deKElUENB6ImRTAAnmLCfuva7EDRO368ttgpVhrq3UingdTbW3T4vgXwpCNtlqHzPsaui2FxrW7Peh36FkQPmE8C6HFFm2VoHoTnY90iUbNXrYuRuNiseHCWiHvdFWeZhI9psNbMVD0uu9JjIY+Xf2iDIACgJ0d8Qk2KYLUOVQNZp288Cmd7IktEB0mhraTQViI+BCBr1xgDT/kUnq52veLSyh+x/I1dpwBAxIdmuyemzG39C+MHmWnSiV2AX4ipE9+VtpbNSFd6LETMR505AxTOfV7a5pXKZ07tAspMpSVWFkhIX78PLpxQUvGXzbbm1TxO7QIc8UPuLW0tCkRNiiBBGXPuDADLPWVtOV95mx2IDpTOitdcWUsAXcmdmGmif2EcICWab5B7mPmIG7YBdAZIvgTgS6OheGnls1i38DPTJEu+wpKvrG1yv1vGJSlFs1tYxzvSokPT8SfALqzjZkB6lvFoKiz+Akwzouly538nCABgT8CDYaNmWlrKYCvkOEJiyCiaNjsPuGU/ph6p+EfblzrMbvkAADAeN4qFGWGmdsipLMGEPqNcCISIN7nloC91mF3/9SvTYRTMx+/DTXDsNhuMgsWnHu2LOZA7LVNhn7+NgnmzL7VGiyNuGgXzZp9rjRb7ECNmlE1Li/5ohRhHEC4ZxXuBMM62RIwDdJJnjHIhkICyegogvTWSbJGTucxpo1II5EL35DIYP7dGky1+TESmbhmVov8RUlB2n92uMChqrhcFomeXvgKw2FRFtqCrGuNrc0tRIPHemQzAHzVXlHWI8X7pu5SydLsrPRZap2/4DQ6epFRL4w0cJpTxLNMTpYGU5VqXt03fZXCTXh1Yh5hGK73ZqvrL9S+IY8z86v2VZRX6JKaKfZWuVM1+MxJvAHT+/omyCNM5qS29Ve1y1UBSYbEqtcwIcC+faR00r3H2xfxhVJma9yPx3vdugGgEoHn3xTUKzRNyzyV73r1eq1fdG6tYt0j4GEME/OqeuAZhOqfJ7OCs+k6yXteG7hAvhsU1Xbv5dP5tbrOg6Ir31s56M1HobdV8X2p8BFBmAI5YF9cQcWIanQ2L760MsvXBgJoUQT/kXhAdANBpx0YFFonpgwxwzM4XEI4+4dg+Nxrw+DftlsDLxHjW+iNX0gE+SeAvdG35eK1Tqa4luwNLUZPikYAHw5AY4vxTy+0APQbw+jVXtwG+QUxzIFzSSZ6Rucxpcyr+gP8T/wI89o0spXLNXgAAAABJRU5ErkJggg=="
        //   />
        // ),
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
      text: "نام و نام خانوادگی",
    },
    {
      dataField: "nationalId",
      text: "کد ملی",
    },
    {
      dataField: "mobile",
      text: "شماره همراه",
    },
    {
      dataField: "phone",
      text: "تلفن ثابت",
    },
    {
      dataField: "registerPlace",
      text: "صادره از",
    },
    {
      dataField: "typeTitle",
      text: "خصوصی/دولتی",
    },
    {
      dataField: "postalCode",
      text: "کد پستی",
    },
    {
      dataField: "natureTitle",
      text: "ماهیت",
    },
    {
      dataField: "kindTitle",
      text: "نوع خریدار",
    },
    {
      dataField: "dealingItems",
      text: "موارد معامله",
    },
  ];

  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [loading, setloading] = useState(false);
  const [types, setTypes] = useState([]);
  const [BuyerName, setBuyerName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const [Mobile, setMobile] = useState("");
  const [registerNum, setregisterNum] = useState("");
  const [registerPlace, setregisterPlace] = useState("");
  const [typeBuyer, setTypeBuyer] = useState(0);
  const [kindIds, setKindIds] = useState("");
  const [kindId, setKindId] = useState(0);
  const [natureIds, setNatureIds] = useState("");
  const [natureId, setNatureId] = useState(0);
  const [CommentId, setCommentId] = useState("");
  const [Descr, setDescr] = useState("");
  const [Image, setImage] = useState("");
  const [id, setId] = useState("");
  const [viewModal, setViewModal] = useState("");

  const [typeModal, settypeModal] = useState("");
  const [nameModal, setnameModal] = useState("");
  const [nationalIdModal, setnationalIdModal] = useState("");
  const [birthDateModal, setbirthDateModal] = useState("");
  const [mobileModal, setmobileModal] = useState("");
  const [addressModal, setaddressModal] = useState("");
  const [registerPlaceModal, setregisterPlaceModal] = useState("");
  const [registerNumModal, setregisterNumModal] = useState("");
  const [postalCodeModal, setpostalCodeModal] = useState("");
  //===============================================================
  const BuyersType = () => {
    axios
      .get(Routes.BuyersType, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setTypes(res.data.value.response);
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
              BuyersType();
            }
          }
        }
      });
  };
  //=============================================================
  const BuyersKind = () => {
    axios
      .get(Routes.BuyersKind, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setKindIds(res.data.value.response);
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
              BuyersKind();
            }
          }
        }
      });
  };
  //=============================================================
  const BuyersNature = () => {
    axios
      .get(Routes.BuyersNature, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setNatureIds(res.data.value.response);
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
              BuyersNature();
            }
          }
        }
      });
  };
  //=============================================================
  const BuyersReport = () => {
    setloading(true);
    axios
      .post(
        Routes.BuyersReport,
        {
          name: BuyerName,
          typeId: typeBuyer,
          nationalId: NationalId,
          registerNum: registerNum,
          registerPlace: registerPlace,
          mobile: Mobile,
          dealingItem: dealingItems,
          kindId: kindId,
          natureId: natureId,
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
          settable(res.data.value.response.buyersList);
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
              BuyersReport();
            }
          }
        }
      });
  };
  //======================================================================
  const BuyersReportToXlsFile = () => {
    setloading(true);
    axios
      .post(
        Routes.BuyersReportToXlsFile,
        {
          name: BuyerName,
          typeId: typeBuyer,
          nationalId: NationalId,
          registerNum: registerNum,
          registerPlace: registerPlace,
          mobile: Mobile,
          dealingItem: dealingItems,
          kindId: kindId,
          natureId: natureId,
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
              BuyersReportToXlsFile();
            }
          }
        }
      });
  };
  //=====================================================================
  const BuyersReportToCsvFile = () => {
    setloading(true);
    axios
      .post(
        Routes.BuyersReportToCsvFile,
        {
          name: BuyerName,
          typeId: typeBuyer,
          nationalId: NationalId,
          registerNum: registerNum,
          registerPlace: registerPlace,
          mobile: Mobile,
          dealingItem: dealingItems,
          kindId: kindId,
          natureId: natureId,
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
              BuyersReportToCsvFile();
            }
          }
        }
      });
  };
  //======================================================================
  return (
    <>
      <Breadcrumb current="خریداران" />
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
                          نوع خریدار
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
                            value={typeBuyer}
                            onChange={(e) => {
                              setTypeBuyer(e.target.value);
                            }}
                          >
                            <option value="">انتخاب کنید</option>
                            {types
                              ? types.map((e) => {
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
                          حقیقی / حقوقی
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
                            value={kindId}
                            onChange={(e) => {
                              setKindId(e.target.value);
                            }}
                          >
                            <option value="">انتخاب کنید</option>
                            {kindIds
                              ? kindIds.map((e) => {
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
                          ماهیت خریدار
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
                            value={natureId}
                            onChange={(e) => {
                              setNatureId(e.target.value);
                            }}
                          >
                            <option value="">انتخاب کنید</option>
                            {natureIds
                              ? natureIds.map((e) => {
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
                          نام خریدار/نماینده
                        </div>
                        <Form.Control
                          onChange={(e) => setBuyerName(e.target.value)}
                          value={BuyerName}
                          type="text"
                          maxLength={30}
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        {" "}
                        <div
                          style={{ padding: "0px 3px" }}
                          className="col-12 grey-form-heading"
                        >
                          کدملی / شناسه ملی
                        </div>
                        <Form.Control
                          onChange={(e) => setNationalId(e.target.value)}
                          value={NationalId}
                          type="tel"
                          placeholder=""
                          maxLength={10}
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
                          onChange={(e) => setMobile(e.target.value)}
                          value={Mobile}
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
                          شماره ثبت / شماره شناسنامه
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
                          محل ثبت / محل صدور
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
                         مورد معامله
                        </div>
                        <Form.Control
                          onChange={(e) => setDealingItems(e.target.value)}
                          value={dealingItems}
                          type="text"
                          placeholder=""
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
                            BuyersReport();
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
                      className= "mg-l-10"
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#26e07f",
                          borderColor: "#26e07f",
                        }}
                        onClick={() => BuyersReportToXlsFile()}
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
                        onClick={() => BuyersReportToCsvFile()}
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

export default Buyers;
