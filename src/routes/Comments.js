import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import useStylee from "../components/Styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Breadcrumb from "../components/common/breadcrumb";
import AddIcon from "@mui/icons-material/Add";
import PtTable from "../components/features/elements/table";
import moment from "moment-jalaali";

import DatePicker from "react-datepicker2";

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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Pagination from "@material-ui/lab/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import { getMedia } from "../api";
import { getCroppedImageUrl } from "../utils";
import { days, months, newYears } from "../components/date";
import { withCardActions } from "../components/hoc/index";
import Loading from "../components/Loading/Example";
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
const history = createBrowserHistory();
const[errorText,setErrorText]=useState("")
function Comments(props) {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [tableRef, setTableRef] = useState(null);
  const [table, settable] = useState("");
  const [id, setId] = useState("");
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

  function openModal(index) {
    setModal(index);
  }

  function closeModal() {
    setModal(-1);
  }
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    GetAllComments(page);
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
        setImage(res.data.value.response.commentPicture);}else{
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
        Comments: table[i].description,
        ChangeState: (
          <div>
            <img
              onClick={() => {
                openModal(10);
                setId(table[i].id);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-miscellaneous-kiranshastry-gradient-kiranshastry.png"
            />
          </div>
        ),

        confirm:
          table[i].confirm === true ? (
            <div>
              <img
                // onClick={() => {
                //   openModal(9);
                //   setImage(
                //     table[i].pictures
                //       ? table[i].pictures[0]
                //       : "./assets/images/Logo-barik.png"
                //   );
                // }}
                style={{ cursor: "pointer", width: "45px" }}
                src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/50/000000/external-check-multimedia-kiranshastry-gradient-kiranshastry.png"
              />
            </div>
          ) : (
            <div>
              <img
                // onClick={() => {
                //   openModal(9);
                //   setImage(
                //     table[i].pictures
                //       ? table[i].pictures[0]
                //       : "./assets/images/Logo-barik.png"
                //   );
                // }}
                style={{ cursor: "pointer", width: "40px" }}
                src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/50/000000/external-close-banking-and-finance-kiranshastry-gradient-kiranshastry.png"
              />
            </div>
          ),
        picture: (
          <div>
            <img
              onClick={() => {
                openModal(9);
                setImage(
                  table[i].pictures
                    ? table[i].pictures
                    : "./assets/images/Logo-barik.png"
                );
                setidCm(table[i].id);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-picture-graph-design-kiranshastry-gradient-kiranshastry.png"
            />
          </div>
        ),
        edit: (
          <div>
            <img
              onClick={() => {
                setEdit(table[i].id);
                setWishView(false);
                GetUserDetail(table[i].id);
                window.scrollTo(0, 0);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-interface-kiranshastry-gradient-kiranshastry-1.png"
            />
          </div>
        ),
        Delete: (
          <div>
            <img
              onClick={() => {
                DeleteUser(table[i].id);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-gradient-kiranshastry.png"
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
      dataField: "Comments",
      text: "دل نوشته ها ",
    },
    {
      dataField: "confirm",
      text: "وضعیت نمایش",
    },
    {
      dataField: "ChangeState",
      text: "تغییر وضعیت",
    },

    {
      dataField: "picture",
      text: "عکس",
    },
    {
      dataField: "edit",
      text: "ویرایش",
    },
    {
      dataField: "Delete",
      text: "حذف",
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

  const GetAllComments = () => {
    setloading(true);
    axios
      .post(
        Routes.GetAllComments,
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
        
if(res.data.responseCode===200){        setCountPage(res.data.value.max / 10);
settable(res.data.value.response);}else{
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
              GetAllComments();
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
        setloading(false);
        
if(res.data.responseCode===200){
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
        if (res.data.message === "کامنت  با موفقیت ویرایش گردید") {
          setEdit("");
          setWishView(true);
          GetAllComments();
        }

        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          let ref = await RefreshToken();
          if (ref.result) {
            EditUser();
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
        GetAllComments();
        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          let ref = await RefreshToken();
          if (ref.result) {
            DeleteUser();
          }
        }
      });
  };

  const [confrimSearch, setConfirmSearch] = useState(null);
  const [descriptionSearch, setdescriptionSearch] = useState("");
  const [show, setShow] = useState("");

  const WisherGetByFilter = () => {
    setloading(true);
    axios
      .post(
        Routes.GetCommentByFilter,
        {
          description: descriptionSearch,
          type: false,
          confirm: confrimSearch === null ? "" : confrimSearch,
          fromCreationDateTime: "",
          toCreationDateTime: "",
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
        setCountPage(res.data.value.max / 10);
        settable(res.data.value.response);
        setdescriptionSearch("");
        setConfirmSearch(null);
        // }

        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          let ref = await RefreshToken();
          if (ref.result) {
            WisherGetByFilter();
          }
        }
      });
  };

  const confirmShow = (id) => {
    setloading(true);
    axios
      .get(
        Routes.ConfirmComments,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            id: id,
            Confirm: show,
          },
        }
      )
      .then((res) => {
        
        closeModal();
        setShow("");
        setId("");
        setloading(false);
        GetAllComments();
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          let ref = await RefreshToken();
          if (ref.result) {
            confirmShow(id);
          }
        }
      });
  };

  const DeleteCommentPicture = (idPic) => {
    setloading(true);
    axios
      .post(
        Routes.DeleteCommentPicture,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            id: idPic,
          },
        }
      )
      .then((res) => {
        
        // GetCommentByWishId(id);
        GetCommenPicture();
        setloading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          let ref = await RefreshToken();
          if (ref.result) {
            DeleteCommentPicture(idPic);
          }
        }
      });
  };
  return (
    <>
      <Breadcrumb current="دل نوشته های مهر" />
      <section className="media-gallery">
        <Form action="#" method="get" onSubmit={searchMedia}>
          <div
            className="inner-body mg-main ml-0"
            style={{ marginTop: "-160px" }}
          >
            {edit ? (
              <Row style={{ marginBottom: "20px" }}>
                <Col>
                  <CardWithActions
                    collapsed={wishView}
                    dismissible={false}
                    collapsible={false}
                  >
                    <Card.Header
                      // onClick={() => setWishView(!wishView)}
                      style={{ textAlign: "right", cursor: "pointer" }}
                    >
                      <Card.Title>ویرایش</Card.Title>
                    </Card.Header>

                    <Card.Body style={{ direction: "rtl" }}>
                      <Row>
                        <Form.Group as={Col} lg={12}></Form.Group>
                        <Col lg={7} xl={12}>
                          <Form.Control
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            as="textarea"
                            placeholder="توضیحات"
                            className="form-control-modern"
                            rows={6}
                          />
                        </Col>
                        {/* {massage ? (
                        <div style={{ color: "green" }}>{massage}</div>
                      ) : null} */}

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
                            onClick={() => EditUser()}
                            className="mb-1 mt-1 mr-1"
                            variant="primary"
                            disabled={!description}
                          >
                            ثبت
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </CardWithActions>
                </Col>
              </Row>
            ) : null}

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
                            onChange={(e) => setConfirmSearch(e.target.value)}
                            // onFocus={() => setErrors({ ...errors, date: "" })}
                            value={confrimSearch}
                          >
                            <option value={""}>حالت نمایش</option>
                            <option value={true}>نمایش داده شود</option>
                            <option value={false}>نمایش داده نشود</option>
                          </CFormSelect>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} lg={3}>
                        <Form.Control
                          onChange={(e) => setdescriptionSearch(e.target.value)}
                          value={descriptionSearch}
                          type="text"
                          placeholder="توضیحات آرزو"
                        />
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
                          onClick={() => WisherGetByFilter()}
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

      <Modal
        show={modal === 9}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card>
          <Card.Header>
            <Card.Title>عکس</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Image.length > 0 &&
                Image.map((file, index) => {
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
                        onClick={() => DeleteCommentPicture(file.id)}
                      >
                        <CloseIcon style={{ fontSize: 20 }} />
                      </button>
                      <div style={{ margin: "auto" }}>
                        <img src={file.picture} style={{ width: "100px" }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={12} className="text-right">
                <Button
                  style={{
                    width: "100px",
                    backgroundColor: "#f44336",
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

      <Modal
        show={modal === 10}
        onHide={closeModal}
        centered={true}
        className="modal-block-info"
        style={{ direction: "rtl", textAlign: "right", color: "black" }}
      >
        <Card>
          <Card.Header>
            <Card.Title>تغییر وضعیت نمایش</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group as={Col} lg={12}>
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
                  onChange={(e) => setShow(e.target.value)}
                  // onFocus={() => setErrors({ ...errors, date: "" })}
                  value={show}
                >
                  <option value={null}>حالت نمایش</option>
                  <option value={true}>نمایش داده شود</option>
                  <option value={false}>نمایش داده نشود</option>
                </CFormSelect>
              </div>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={12} className="text-right">
                <Button
                  style={{
                    width: "100px",
                    backgroundColor: "#4BB543	",
                    margin: "0px 10px",
                  }}
                  variant="info"
                  onClick={() => confirmShow(id)}
                >
                  ثبت
                </Button>
                <Button
                  style={{
                    width: "100px",
                    backgroundColor: "#f44336",
                    margin: "0px 10px",
                  }}
                  variant="info"
                  onClick={closeModal}
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

export default Comments;
