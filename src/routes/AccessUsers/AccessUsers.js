/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { Row, Card, Col, Table, Form, Modal, Button } from "react-bootstrap";
import Breadcrumb from "../../components/common/breadcrumb";
import { createBrowserHistory } from "history";
// core components
import GridItem from "../../components/Grid/GridItem";
import CardBody from "../../components/Card/CardBody";
import axios from "axios";
import { Routes } from "../../api/api";
import Loading from "../../components/Loading/Example";
// import Button from "../../components/CustomButtons/Button";
import Slide from "@material-ui/core/Slide";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import { RefreshToken } from "../ref";
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AccessUsers(props) {
  const [roleTitle, setRoleTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [table, settable] = useState("");
  const [multiple, setMultiple] = useState([]);

  function checkAll() {
    multiple.forEach((element) => {
      if (element.value === "All") {
        alert("All Values");
      }
    });
  }
  const [modalP, setModalP] = useState(false);

  const history = createBrowserHistory();
  function closeModalP() {
    setModalP(false);
  }
  const options = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "داشبورد",
      value: "1",
    },
    {
      label: "پذیرندگان",
      value: "2",
    },
    {
      label: "عملیات پردازش",
      value: "4",
    },
    {
      label: "حذف تراکنش",
      value: "5",
    },
    {
      label: "پردازش تراکنش",
      value: "6",
    },
    {
      label: " محاسبه کارمزد",
      value: "8",
    },
    {
      label: " تسویه سرویس پرداخت",
      value: "9",
    },
    {
      label: "گزارش مغایرت",
      value: "11",
    },
    {
      label: "گزارش ریز تراکنش ها",
      value: "12",
    },
    {
      label: "گزارش تسویه کارمزد",
      value: "13",
    },
    {
      label: "گزارش کارمزد پذیرندگان",
      value: "25",
    },
    {
      label: "گزارش تسویه وجوه",
      value: "14",
    },
    {
      label: "گزارش ماهانه بانک",
      value: "23",
    },
    {
      label: "مدیریت کاربران",
      value: "16",
    },
    {
      label: "سطح دسترسی",
      value: "24",
    },
    {
      label: "سرویس ها",
      value: "17",
    },
    {
      label: "نوع سرویس ها",
      value: "18",
    },
    {
      label: "کارمزد پیش فرض",
      value: "19",
    },
    {
      label: "تغییر رمز عبور",
      value: "21",
    },
    {
      label: "راه اندازی پرداخت خودکار",
      value: "22",
    },
  ];

  const CreateRole = () => {
    setLoading(true);
    axios
      .post(
        Routes.AddRole,
        {
          roleTitle: roleTitle,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        setLoading(false);
        if(res.data.responseCode===200){        GetAllRoles();
          setViewCreate(!ViewCreate);
          setRoleTitle("");
          setId("");}else{
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
              CreateRole();
            }
          }
        }
      });
  };
  const [id, setId] = useState("");
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        title: table[i].roleTitle,
        access: (
          <div>
            <img
              onClick={() => {
                localStorage.setItem("RoleName", table[i].roleTitle);
                props.history.push(`./ManageAccess?${table[i].roleId}`);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="data:image/png;base64,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"
            />
          </div>
        ),
        edit: (
          <div>
            <img
              onClick={() => {
                GetRole(table[i].roleId);
                setId(table[i].roleId);
                window.scrollTo(0, 0);
              }}
              style={{ cursor: "pointer", width: "40px" }}
              src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-interface-kiranshastry-gradient-kiranshastry-1.png"
            />
          </div>
        ),
        delete: (
          <div>
            <img
              onClick={() => {
                setDeleteId(table[i].roleId);
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
      dataField: "title",
      text: "عنوان نفش",
    },
    {
      dataField: "access",
      text: "دسترسی ها",
    },
    {
      dataField: "edit",
      text: "ویرایش",
    },
    {
      dataField: "delete",
      text: "حذف",
    },
  ];

  useEffect(() => {
    GetAllRoles();
  }, []);
  const GetAllRoles = () => {
    setLoading(true);
    axios
      .get(Routes.RolesList, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       if(res.data.responseCode===200) {settable(res.data.value.response);}else{
        setErrorText("خطای داخلی رخ داده است.")
      }
        setLoading(false);
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetAllRoles();
            }
          }
        }
      });
  };

  const GetRole = (id) => {
    setLoading(true);
    axios
      .get(Routes.GetRole, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          roleId: id,
        },
      })
      .then((res) => {
        if(res.data.responseCode===200){
        setViewCreate(true);
        setRoleTitle(res.data.value.response.roleTitle);}else{
          setErrorText("خطای داخلی رخ داده است.")
        }
        setLoading(false);
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetRole();
            }
          }
        }
      });
  };
  const [ViewCreate, setViewCreate] = useState(false);
  const [selectedTwo, setSelectedTwo] = useState([]);
  const [ErrorText, setErrorText] = useState("");
  const[deleteId,setDeleteId]=useState("")
  const EditRole = () => {
    setLoading(true);
    axios
      .post(
        Routes.EditRole,
        {
          roleId: id,
          roleTitle: roleTitle,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        setLoading(false);

        if (res.data.responseCode === 200) {
          setId("");
          setViewCreate(!ViewCreate);
          GetAllRoles();
          setRoleTitle("");
        } else{
          setErrorText("خطای داخلی رخ داده است.")
        }
        // if (res.data.message === "ویرایش نقش با موفقیت انجام شد") {
        //   window.location.reload();
        // }
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              EditRole();
            }
          }
        }
      });
  };


  const DeleteRole = (id) => {
    setLoading(true);
    axios
      .post(
        Routes.DeleteRole,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            roleId: id,
          },
        }
      )
      .then((res) => {
        GetAllRoles();
        setLoading(false);
      })
      .catch(async(err) => {
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            history.push(`/#/FinishToken`);
            window.location.reload()
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              DeleteRole();
            }
          }
        }
      });
  };

  return (
    <>
      <Breadcrumb current="مدیریت نقش و سطح دسترسی" />

      <Card>
        <CardBody>
          <GridItem xs={12} sm={12} md={12}>
            <Accordion
              style={{
                direction: "rtl",
                textAlign: "right",
                backgroundColor: "#eee",
                margin: "20px 0px",
                fontFamily: "DIROOZ-FD",
              }}
              expanded={ViewCreate}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setViewCreate(!ViewCreate)}
              >
                <Typography
                  style={{ fontFamily: "DIROOZ-FD", padding: "0px 6px" }}
                >
                  ایجاد نقش ...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    fontFamily: "DIROOZ-FD",
                    color: "black",
                    height: "200px",
                  }}
                >
                  <Col sm={4}>
                    <Form.Control
                      onChange={(e) => setRoleTitle(e.target.value)}
                      value={roleTitle}
                      type="text"
                      maxLength={50}
                      placeholder="عنوان نقش"
                    />
                  </Col>
                  {/* <Col sm={10} style={{ marginTop: "10px" }}>
                    <Select
                      placeholder={"دسترسی ها "}
                      options={options}
                      isMulti
                      value={multiple}
                      onChange={(options) => {
                        checkAll();
                        setMultiple(options);
                      }}
                    />
                    <Form.Control
                      required
                      className="d-none"
                      readOnly
                      value={
                        multiple
                          ? multiple.map((option) => option.value).join(",")
                          : ""
                      }
                    />
                  </Col> */}

                  <Col sm={4}>
                    <div style={{ color: "red" }}>{ErrorText}</div>
                  </Col>

                  <Col sm={4}>
                    <Button
                      style={{
                        fontFamily: "DIROOZ-FD",
                        marginTop: "10px",
                        width: "150px",
                      }}
                      // className={classes.submit}
                      onClick={() => {
                        id ? EditRole() : CreateRole();
                      }}
                    >
                      {id ? "ثبت تغییرات" : "ثبت"}
                    </Button>
                  </Col>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <div
              // className="App"
              style={{
                fontSize: "12px",
                textAlign: "center",
                fontFamily: "DIROOZ-FD",
                direction: "rtl",
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
          </GridItem>

          {loading ? <Loading /> : null}
        </CardBody>
      </Card>
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
    </>
  );
}
