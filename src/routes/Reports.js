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
import { makeStyles } from "@material-ui/core/styles";
import { createBrowserHistory } from "history"; 
import { toast } from "react-toastify";
import Breadcrumb from "../components/common/breadcrumb";

import moment from "moment-jalaali";

import DatePicker from "react-datepicker2";

import PNotify from "../components/features/elements/p-notify";
import {

  CFormSelect,
  CButton,
} from "@coreui/react";
import axios from "axios";
import { Routes } from "../api/api";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
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

function Reports(props) {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [tableRef, setTableRef] = useState(null);
  const [table, settable] = useState("");
  const [id, setId] = useState("");


  const history = createBrowserHistory();
  const[errorText,setErrorText]=useState("")

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
  useEffect(() => {
    GetAllTransaction(page);
  }, [page]);
  const [picName, setPicName] = useState("");
  const [UploadErr, setUploadErr] = useState("");

  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];

    if (file.size > 2000000) {
      setUploadErr("سایز فایل انتخاب شده بیش از حد مجاز است !");
      setFile("");
    } else getBase64(file);
  };
  const onLoad = (fileString) => {
    setFile(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  const [idCm, setidCm] = useState("");
  const GetCommenPicture = () => {
    setloading(true);
    axios
      .post(
        Routes.GetCommenPicture,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            id: idCm,
          },
        }
      )
      .then((res) => {
        
if(res.data.responseCode===200){
  setImage(res.data.value.response.commentPicture);
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
              GetCommenPicture();
            }
          }
        }
      });
  };

  const [Descr, setDescr] = useState("");
  const [Image, setImage] = useState("");
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        idTrans: table[i].transactionId,
        titleWish: table[i].wishTitle,
        amount: table[i].amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        dates: table[i].creationDateTimeJalali,
        time: table[i].creationTime,
        invoiceId: table[i].invoiceId,
        stateTitle: table[i].stateTitle,
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
      dataField: "idTrans",
      text: "شناسه",
    },
    {
      dataField: "titleWish",
      text: "عنوان آرزو",
    },
    {
      dataField: "amount",
      text: "مبلغ",
    },
    {
      dataField: "dates",
      text: "تاریخ",
    },

    {
      dataField: "time",
      text: "ساعت",
    },
    {
      dataField: "invoiceId",
      text: "شماره فاکتور",
    },
    {
      dataField: "stateTitle",
      text: "وضعیت",
    },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [genderId, setgenderId] = useState(null);
  const fileNames = picName.split("\\");
  const [pardakhtedMes, setPardakhtedMes] = useState("");
  const [ffile, setFile] = useState("");
  const [loading, setloading] = useState(false);
  const [description, setDescription] = useState("");
  const [massage, setMassage] = useState("");
  const [wishView, setWishView] = useState(true);

  const GetAllTransaction = (props) => {
    setloading(true);
    axios
      .post(
        Routes.GetAllTransaction,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            pageSize: 10,
            pageNumber: page,
            type: false,
          },
        }
      )
      .then((res) => {
        if(res.data.responseCode===200){
          setCountPage(res.data.value.max / 10);
          settable(res.data.value.response);
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
              GetAllTransaction();
            }
          }
        }
      });
  };
  const [edit, setEdit] = useState("");
  const GetUserDetail = (id) => {
    setloading(true);
    axios
      .post(
        Routes.GetComment,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            id: id,
          },
        }
      )
      .then((res) => {
        
if(res.data.responseCode===200){
        setloading(false);
        setDescription(res.data.value.response.description);
}else{
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
        Routes.EditComment,
        {
          id: edit,
          description: description,
          pictures: [],
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if(res.data.responseCode===200){
          if (res.data.message === "کامنت  با موفقیت ویرایش گردید") {
            setEdit("");
            setWishView(true);
            GetAllTransaction();
          }
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
              EditUser();
            }
          }
        }
      });
  };

  const DeleteUser = (id) => {
    setloading(true);
    axios
      .post(
        Routes.DeleteComment,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            id: id,
          },
        }
      )
      .then((res) => {
        
if(res.data.responseCode===200){
  GetAllTransaction();
}else{
  setErrorText("خطای داخلی رخ داده است.")
  }
    
        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            props.history.push(`/FinishToken`);
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              DeleteUser(id);
            }
          }
        }
      });
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromAmountSearch, setFromAmountSearch] = useState("");
  const [toAmountSearch, setToAmountSearch] = useState("");
  const [stateIdSearch, setStateIdSearch] = useState(0);
  const [invoiceIdSearch, setInvoiceIdSearch] = useState("");
  const [transactionIdSearch, setTransactionIdSearch] = useState("");
  const GetTransactionByFilter = () => {
    setloading(true);
    axios
      .post(
        Routes.GetTransactionByFilter,
        {
          wishId: 0,
          fromCreationDate: fromDate
            ? moment(fromDate).format("jYYYY/jM/jD")
            : "",
          toCreationDate: toDate ? moment(toDate).format("jYYYY/jM/jD") : "",
          fromAmount:
            fromAmountSearch === "" ? 0 : fromAmountSearch.replace(",", ""),
          tomAmount:
            toAmountSearch === "" ? 0 : toAmountSearch.replace(",", ""),
          stateId: stateIdSearch,
          invoiceId: invoiceIdSearch,
          transactionId: transactionIdSearch,
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
          setCountPage(res.data.value.max / 10);
          settable(res.data.value.response);
        }else{
          setErrorText("خطای داخلی رخ داده است.")
        }
        
        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            props.history.push(`/FinishToken`);
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetTransactionByFilter();
            }
          }
        }
      });
  };

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

  return (
    <>
      <Breadcrumb current="گزراشات تراکنشات" />
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
                  backgroundColor: "#eee",
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
                        <Form.Control
                          onKeyUp={(e) => thousnads(e.target)}
                          onChange={(e) => setFromAmountSearch(e.target.value)}
                          value={fromAmountSearch}
                          type="text"
                          maxLength={15}
                          placeholder="از مبلغ"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onKeyUp={(e) => thousnads(e.target)}
                          onChange={(e) => setToAmountSearch(e.target.value)}
                          value={toAmountSearch}
                          type="text"
                          maxLength={15}
                          placeholder="تا مبلغ"
                        />
                      </Form.Group>

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

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setInvoiceIdSearch(e.target.value)}
                          value={invoiceIdSearch}
                          type="text"
                          maxLength={15}
                          placeholder="شماره پرونده"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) =>
                            setTransactionIdSearch(e.target.value)
                          }
                          value={transactionIdSearch}
                          type="text"
                          maxLength={15}
                          placeholder="شناسه پرداخت"
                        />
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
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
                            onChange={(e) => setStateIdSearch(e.target.value)}
                            // onFocus={() => setErrors({ ...errors, date: "" })}
                            value={stateIdSearch}
                          >
                            <option value={0}>وضعیت</option>
                            <option value={1}>ثبت اولیه</option>
                            <option value={2}>درحال اجرا</option>
                            <option value={3}>پرداخت شده</option>
                            <option value={4}>عدم پرداخت</option>
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
                            width: "100px",
                            backgroundColor: "#4BB543	",
                            margin: "0px 10px",
                            fontFamily: "DIROOZ-FD",
                          }}
                          onClick={() => GetTransactionByFilter()}
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
        show={modal === 8}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card>
          <Card.Header>
            <Card.Title>توضیحات</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ direction: "rtl" }} className="modal-wrapper">
              {Descr}
            </div>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={12} className="text-right">
                <Button variant="info" onClick={closeModal}>
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

export default Reports;
