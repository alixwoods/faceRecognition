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
import { createBrowserHistory } from "history"; 

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

function moratorium(props) {
  const classes = useStyles();

  const history = createBrowserHistory();
  const[errorText,setErrorText]=useState("")
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
    BuyersList(page);
  }, [page]);

  const BuyersList = () => {
    setloading(true);
    axios
      .post(
        Routes.BuyersList,
        {
          name: BuyerName,
          type: typeBuyer,
          nationalId: NationalId,
          registerNum: registerNum,
          registerPlace: registerPlace,
          mobile: Mobile,
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
        if(res.data.responseCode===200){
          setCountPage(res.data.value.response.count / 10);
          settable(res.data.value.response.buyersList);
        }else{
          setErrorText("خطای داخلی رخ داده است.")
          }
  
        setloading(false);
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              BuyersList();
            }
          }
        }
      });
  };
  const [modal, setModal] = useState(-1);

  function closeModal() {
    setModal(-1);
  }
  const [CommentId, setCommentId] = useState("");
  const [Descr, setDescr] = useState("");
  const [Image, setImage] = useState("");
  const [id, setId] = useState("");
  const [viewModal, setViewModal] = useState("");
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        fullName: table[i].name,
        nationalId: table[i].nationalId,
        certificateNum: table[i].certificateNum,
        certificatePlace: table[i].certificatePlace,
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
      dataField: "nationalId",
      text: "نام بنگاه",
    },
    {
      dataField: "fullName",
      text: "نام خریدار",
    },

    {
      dataField: "certificateNum",
      text: "شماره قسط",
    },
    {
      dataField: "certificateNum",
      text: "تاریخ قسط",
    },
    {
      dataField: "certificateNum",
      text: "تاریخ استمهال",
    },
  ];

  function searchMedia(e) {
    e.preventDefault();
    tableRef.current.wrappedInstance.filterColumn({ id: "name" }, search);
  }
  const [loading, setloading] = useState(false);
  const [types, settypes] = useState([
    {
      label: "استمهال",
      value: "1",
    },
    {
      label: "تنقس",
      value: "2",
    },
    {
      label: "همه اقساط",
      value: "3",
    },
  ]);
  const [BuyerName, setBuyerName] = useState("");
  const [NationalId, setNationalId] = useState("");
  const [Mobile, setMobile] = useState("");
  const [registerNum, setregisterNum] = useState("");
  const [registerPlace, setregisterPlace] = useState("");
  const [typeBuyer, settypeBuyer] = useState("");

  const [typeModal, settypeModal] = useState("");
  const [nameModal, setnameModal] = useState("");
  const [nationalIdModal, setnationalIdModal] = useState("");
  const [birthDateModal, setbirthDateModal] = useState("");
  const [mobileModal, setmobileModal] = useState("");
  const [addressModal, setaddressModal] = useState("");
  const [registerPlaceModal, setregisterPlaceModal] = useState("");
  const [registerNumModal, setregisterNumModal] = useState("");
  const [postalCodeModal, setpostalCodeModal] = useState("");

  const GetBuyer = (id) => {
    setloading(true);
    axios
      .get(Routes.GetBuyer, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          nationalId: id,
        },
      })
      .then((res) => {
        
if(res.data.responseCode===200){
  setModal(9);
  settypeModal(res.data.value.response.type === true ? "حقوقی" : "حقیقی");
  setnameModal(res.data.value.response.name);
  setnationalIdModal(res.data.value.response.nationalId);
  setbirthDateModal(res.data.value.response.birthDate);
  setmobileModal(res.data.value.response.mobile);
  setaddressModal(res.data.value.response.address);
  setregisterPlaceModal(res.data.value.response.registerPlace);
  setregisterNumModal(res.data.value.response.registerNum);
  setpostalCodeModal(res.data.value.response.postalCode);
}else{
  setErrorText("خطای داخلی رخ داده است.")
}
  

        setloading(false);
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetBuyer(id);
            }
          }
        }
      });
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <>
      <Breadcrumb current="اقساط استمهال شده" />
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
                        <DatePicker
                          placeholder="از تاریخ"
                          className={classes.calendarContainer}
                          timePicker={false}
                          isGregorian={false}
                          inputJalaaliFormat="jYYYY/jMM/jDD"
                          onChange={(value) => setFromDate(value)}
                          //  value={value}
                        />{" "}
                      </Form.Group>
                      <Form.Group as={Col} lg={3}>
                        <DatePicker
                          placeholder="تا تاریخ"
                          className={classes.calendarContainer}
                          timePicker={false}
                          isGregorian={false}
                          onChange={(value) => setToDate(value)}
                          inputJalaaliFormat="jYYYY/jMM/jDD"
                          //  value={value}
                        />
                      </Form.Group>
                      {/* 
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
                        <Select
                          style={{
                            fontFamily: "DIROOZ-FD",
                            direction: "rtl",
                            textAlign: "right",
                          }}
                          placeholder="نوع"
                          onChange={(e) => {
                            settypeBuyer(e.value);
                          }}
                          options={types}
                        />
                      </Form.Group> */}

                      {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setBuyerName(e.target.value)}
                          value={BuyerName}
                          type="text"
                          maxLength={30}
                          placeholder="نام خریدار"
                        />
                      </Form.Group> */}
                      {/* 
                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setNationalId(e.target.value)}
                          value={NationalId}
                          type="tel"
                          placeholder="کدملی / شناسه ملی"
                          maxLength={10}
                        />
                      </Form.Group> */}

                      {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setMobile(e.target.value)}
                          value={Mobile}
                          type="tel"
                          placeholder="شماره تماس"
                          maxLength={11}
                        />
                      </Form.Group> */}
                      {/* 
                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setregisterNum(e.target.value)}
                          value={registerNum}
                          type="tel"
                          placeholder="شماره ثبت / شماره شناسنامه"
                          maxLength={20}
                        />
                      </Form.Group> */}

                      {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setregisterPlace(e.target.value)}
                          value={registerPlace}
                          type="text"
                          placeholder="محل ثبت / محل صدور"
                          maxLength={20}
                        />
                      </Form.Group> */}

                      {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          // onChange={(e) => setregisterPlace(e.target.value)}
                          // value={registerPlace}
                          type="text"
                          placeholder="شماره قرارداد"
                          maxLength={20}
                        />
                      </Form.Group> */}
                      {/* <Form.Group as={Col} lg={3}>
                        <Form.Control
                          // onChange={(e) => setregisterPlace(e.target.value)}
                          // value={registerPlace}
                          type="text"
                          placeholder="مورد معامله"
                          maxLength={20}
                        />
                      </Form.Group> */}

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
                          onClick={() => BuyersList()}
                          className="mb-1 mt-1 mr-1"
                          variant="primary"
                        >
                          ثبت
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

export default moratorium;
