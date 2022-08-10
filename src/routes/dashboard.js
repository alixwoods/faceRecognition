import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Table, ProgressBar } from "react-bootstrap";
import Chart from "react-apexcharts";
import axios from "axios";
import { Routes } from "../api/api";
import Breadcrumb from "../components/common/breadcrumb";
import { createBrowserHistory } from "history";
import BootstrapTable from "react-bootstrap-table-next";
import Loading from "../components/Loading/Example";

export default function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [dataValues, setDataValues] = useState([]);
  const DashboardReport = () => {
    setLoading(true);
    axios
      .get(Routes.CurrentMonthLoanStates, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setDataValues(res.data.value.response);
          res.data.value.response.forEach((element) => {
            dataValues.push(element.amount);
          });
          res.data.value.response.forEach((element) => {
            labels.push(element.stateTitle);
          });
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }

        setLoading(false);
      })
      .catch(async (err) => {
        // if (err.response.status === 401) {
        //   if (!localStorage.getItem("refreshToken")) {
        //     history.push(`/#/FinishToken`);
        //     window.location.reload();
        //   } else {
        //     let ref = await RefreshToken();
        //     if (ref.result) {
        //       DashboardReport();
        //     }
        //   }
        // }
      });
  };
  const [Value, setValue] = useState([]);
  const [DatesValue, setDatesValue] = useState([]);
  const [MoneyesValue, setMoneyesValue] = useState([]);
  const [labels, setlabels] = useState([]);
  const history = createBrowserHistory();
  const [errorText, setErrorText] = useState("");
  const TransactionReport = () => {
    setLoading(true);
    axios
      .get(Routes.LoansChart, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          month: 12,
        },
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          setTimeout(() => {
            DashboardReport();
          }, 100);
          try {
            res.data.value.response.forEach((element) => {
              DatesValue.push(element.dueDate);
            });
            res.data.value.response.forEach((element) => {
              MoneyesValue.push(element.amount);
            });
          } catch (error) {}
        } else {
          setErrorText("خطای داخلی رخ داده است.");
        }

        setLoading(false);
      })
      .catch(async (err) => {

      });
  };


  const pieSeries = [60, 10, 15, 15];
  var options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // const lineOptions = {
  //   legend: {
  //     show: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     lineCap: "round",
  //   },
  //   xaxis: {
  //     categories: DatesValue,
  //   },
  // };

  // const lineSeries = [
  //   {
  //     name: "تعداد",
  //     data: Value,
  //   },
  //   // {
  //   //   name: "Series B",
  //   //   data: [90, 65, 40, 65, 40, 65, 90, 65, 35, 70, 60, 90],
  //   // },
  // ];

  const areaOptions = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
    },
    xaxis: {
      categories: DatesValue,
    },
  };

  const areaSeries = [
    {
      name: "مبلغ",
      data: MoneyesValue,
    },
  ];

  var dateDay =
    new Date().toLocaleDateString("fa-IR").split("/")[2].length == 1
      ? "0" + new Date().toLocaleDateString("fa-IR").split("/")[2]
      : new Date().toLocaleDateString("fa-IR").split("/")[2];
  var dateMonth =
    new Date().toLocaleDateString("fa-IR").split("/")[1].length == 1
      ? "0" + new Date().toLocaleDateString("fa-IR").split("/")[1]
      : new Date().toLocaleDateString("fa-IR").split("/")[1];
  var dateYear = new Date().toLocaleDateString("fa-IR").split("/")[0];

  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function(str) {
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };

  useEffect(() => {
TransactionReport();
ReportCheckFun();
  }, []);

  const ReportCheckFun = () => {
    axios
      .post(
        Routes.ChecksReport,
        {
          amountFrom: 0,
          amountTo: 0,
          dueDateFrom: "",
          dueDateTo: "",
          effectiveDateFrom:"",
          // effectiveDateFrom: fixNumbers(
          //   dateYear + "/" + dateMonth + "/" + dateDay
          // ),
          effectiveDateTo:"",
          // effectiveDateTo : fixNumbers(
          //   dateYear + "/" + dateMonth + "/" + dateDay
          // ),
          checkNumber: "",
          sayyadNumber: "",
          bankId: 0,
          ownerId: 0,
          stateId:1,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            pageNumber: 1,
            pageSize: 100,
          },
        }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          settable(res.data.value.response.checksList);
          // setCountPage(res.data.value.response.count / 10);
        } else {
          setErrorText(res.data.message);
        }
      })
      .catch(async (err) => {
        // if (err.response.status === 401) {
        //   if (!localStorage.getItem("refreshToken")) {
        //     history.push(`/#/FinishToken`);
        //     window.location.reload();
        //   } else {
        //     let ref = await RefreshToken();
        //     if (ref.result) {
        //       ReportCheckFun();
        //     }
        //   }
        // }
      });
  };

  const [table, settable] = useState("");

  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        dealingItemName: table[i].dealingItemName,
        ownerName: table[i].ownerName,
        amount: table[i].amount
          .toString()
          .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ","),
        checkNumber: table[i].checkNumber,
        sayyadNumber: table[i].sayyadNumber,
        dueDate: table[i].dueDate,
        effectiveDate: table[i].effectiveDate,
        bankName: table[i].bankName,
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
      dataField: "dealingItemName",
      text: "مورد معامله",
    },

    // {
    //   dataField: "ownerName",
    //   text: "صاحب چک",
    // },
    {
      dataField: "amount",
      text: "مبلغ (ریال)",
    },
    {
      dataField: "checkNumber",
      text: "شماره چک",
    },

    // {
    //   dataField: "sayyadNumber",
    //   text: "شناسه صیاد",
    // },
    // {
    //   dataField: "dueDate",
    //   text: "تاریخ سررسید",
    // },
    {
      dataField: "effectiveDate",
      text: "تاریخ موثر",
    },
    // {
    //   dataField: "bankName",
    //   text: "عهده",
    // },
  ];
console.log(table,"tabletable")
  return (
    <>
      <Breadcrumb current="سامانه یکپارچه مدیریت اقساط" />

      <Row>
        <Col xl={12} xxl={12}>
          <Row>
            <Col lg={12}>
              <Card.Header
                style={{ textAlign: "right", fontFamily: "DIROOZ-FD" }}
              >
                <Card.Title>گزارش ماهانه اقساط </Card.Title>
              </Card.Header>

              <Card.Body>
                <Chart
                  type="area"
                  options={areaOptions}
                  series={areaSeries}
                  height={400}
                />
              </Card.Body>
            </Col>
          </Row>
        </Col>

        <Col lg={6}>
          <Card.Header style={{ textAlign: "right", fontFamily: "DIROOZ-FD" }}>
            <Card.Title>گزارش وضعیت اقساط ماه اخیر</Card.Title>
          </Card.Header>
          <Card>
            <Card.Body className="p-0">
              <Chart
                type="pie"
                options={options}
                series={dataValues}
                height={415}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card.Header style={{ textAlign: "right", fontFamily: "DIROOZ-FD" }}>
            <Card.Title>چک‌های در انتظار وصول (امروز)</Card.Title>
          </Card.Header>
          <Card className="dashboard-table">
            <Card.Body className="p-0 box-shad-no">
              {table.length > 0 ? (
                <>
                  <div
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      direction: "rtl",
                    }}
                  >
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={products}
                      columns={columns}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12" style={{ textAlign: "center" }}>
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
                  <div className="txt-al-c">
                    <p
                      style={{
                        margin: "10px unset",
                        textAlign: "center",
                      }}
                    >
                      موردی یافت نشد
                    </p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {loading === true ? <Loading /> : null}
    </>
  );
}
