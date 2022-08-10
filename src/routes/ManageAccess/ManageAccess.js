/*eslint-disable*/
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Breadcrumb from "../../components/common/breadcrumb";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import axios from "axios";
import { Routes } from "../../api/api";
import Loading from "../../components/Loading/Example";
// import Button from "../../components/CustomButtons/Button";
import Slide from "@material-ui/core/Slide";
import BootstrapTable from "react-bootstrap-table-next";
import "./ManageAccess.css";
import { RefreshToken } from "../ref";
import { createBrowserHistory } from "history";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ManageAccess(props) {
  const [roleTitle, setRoleTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [table, settable] = useState("");
  const [multiple, setMultiple] = useState([]);
  const [id, setId] = useState("");
  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        title: table[i].pageTitle,
        display: (
          <label className="lock">
            <input id={`display_${table[i].pageId}`} type="checkbox" />
            <span></span>
          </label>
        ),
        create: (
          <label className="lock">
            <input id={`create_${table[i].pageId}`} type="checkbox" />
            <span></span>
          </label>
        ),
        update: (
          <label className="lock">
            <input id={`update_${table[i].pageId}`} type="checkbox" />
            <span></span>
          </label>
        ),
        delete: (
          <label className="lock">
            <input id={`delete_${table[i].pageId}`} type="checkbox" />
            <span></span>
          </label>
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
      text: "صفحه",
    },
    {
      dataField: "display",
      text: "نمایش",
    },
    {
      dataField: "create",
      text: "ایجاد",
    },
    {
      dataField: "update",
      text: "ویرایش",
    },
    {
      dataField: "delete",
      text: "حذف",
    },
  ];
  const history = createBrowserHistory();

  useEffect(() => {
    PageAccessList();
  }, []);
  const PageAccessList = () => {
    setLoading(true);
    axios
      .get(Routes.PageAccessList, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          roleId: lastSegment,
        },
      })
      .then((res) => {
        if(res.data.responseCode===200){  settable(res.data.value.response);
          res.data.value.response.forEach((element) => {
            document.getElementById("display_" + element.pageId).checked =
              element.displaying;
            document.getElementById("create_" + element.pageId).checked =
              element.creating;
            document.getElementById("update_" + element.pageId).checked =
              element.updating;
            document.getElementById("delete_" + element.pageId).checked =
              element.deleting;
          });}else{
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
              PageAccessList();
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
          id: id,
        },
      })
      .then((res) => {
        if(res.data.responseCode===200){        setViewCreate(true);
          
          setSelectedTwo(
            res.data.value.response.access === null
              ? []
              : res.data.value.response.access.split(",")
          );
          setRoleTitle(res.data.value.response.roleTitle);}else{
            setErrorText("خطای داخلی رخ داده است.")
          }

        setLoading(false);
      })
      .catch(async (err) => {
        
        if (err.response.status === 401) {
          if (!localStorage.getItem("refreshToken")) {
            props.history.push(`/FinishToken`);
          } else {
            let ref = await RefreshToken();
            if (ref.result) {
              GetRole(id);
            }
          }
        }
      });
  };
  const [ViewCreate, setViewCreate] = useState(false);
  const [selectedTwo, setSelectedTwo] = useState([]);
const[errorText,setErrorText]=useState("")
  const EditRole = () => {
    setLoading(true);
    axios
      .post(
        Routes.EditRole,
        {
          roleId: id,
          roleTitle: roleTitle,
          access: selectedTwo,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if(res.data.responseCode===200){ 
          setId("");
          if (res.data.message === "ویرایش نقش با موفقیت انجام شد") {
            window.location.reload();
          }}else{     setErrorText("خطای داخلی رخ داده است.")

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
              EditRole();
            }
          }
        }
      });
  };

  var parts = window.location.href.split("?");
  var lastSegment = parts.pop() || parts.pop();
  var jsonArr = [];

  function checkAllbBox() {
    setLoading(true);
    table.forEach((element) => {
      jsonArr.push({
        pageId: element.pageId,
        displaying: document.getElementById("display_" + element.pageId)
          .checked,
        creating: document.getElementById("create_" + element.pageId).checked,
        updating: document.getElementById("update_" + element.pageId).checked,
        deleting: document.getElementById("delete_" + element.pageId).checked,
      });
    });
    axios
      .post(Routes.EditPageAccess, jsonArr, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          roleId: lastSegment,
        },
      })
      .then((res) => {
        if(res.data.responseCode===200){       
          props.history.push("./accessUsers");
          window.location.reload();}else{
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
              checkAllbBox();
            }
          }
        }
      });  }

  const GetPageAccess = () => {
    setLoading(true);
    axios
      .get(
        Routes.PageAccessList,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            roleId: lastSegment,
          },
        }
      )
      .then((res) => {
     if   (res.data.responseCode!==200){
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
              GetPageAccess();
            }
          }
        }
      });
  };

  return (
    <>
      <Breadcrumb
        current={`سطح دسترسی نقش ${localStorage.getItem("RoleName")}`}
      />

      <Card>
        <CardBody>
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
          <GridItem xs={12} sm={12} md={12}>
            <Col sm={4}>
              <Button
                style={{
                  fontFamily: "DIROOZ-FD",
                  marginTop: "10px",
                  width: "150px",
                }}
                // className={classes.submit}
                onClick={() => {
                  // id ? EditRole() : CreateRole();
                  checkAllbBox();
                }}
              >
                ثبت تغییرات
              </Button>
            </Col>
          </GridItem>

          {loading ? <Loading /> : null}
        </CardBody>
      </Card>
    </>
  );
}
