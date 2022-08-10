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
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import FaceCard1 from "../components/FaceCards";
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
function FaceRecognition() {
  const [faceData, setFaceData] = useState([
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
    {
      image: "./assets/images/user.jpg",
      title: "Name Name",
      des: "Not recognized",
    },
  ]);
  const [selectedFace, setSelectedFace] = useState({
    image: "./assets/images/user-b.jpg",
    name: "علی نوری",
    isACustomer: "بله",
    customerType: "طلایی",
    CustomerNum: "5435643547434",
  });
  return (
    <>
      <section className="media-gallery">
        <div className="container">
          <Card className="card-modern">
            <Card.Body>
              <Row className="">
                <div className="col-6">
                  <img src={selectedFace.image} className="main-face-img" />
                </div>
                <div className="col-6 txt-al-r">
                  <div className="mg-b-10">
                    <span className="f-s-16 ">نام و نام خانوادگی :</span>{" "}
                    <span className="f-s-14 fw-bold">{selectedFace.name}</span>
                  </div>
                  <div className="mg-b-10">
                    <span className="f-s-16 ">مشتری بانک:</span>{" "}
                    <span className="f-s-14 fw-bold">{selectedFace.isACustomer}</span>
                  </div>
                  <div className="mg-b-10">
                    <span className="f-s-16 ">نوع مشتری :</span>{" "}
                    <span className="f-s-14 fw-bold">{selectedFace.customerType}</span>{" "}
                  </div>
                  <div className="mg-b-10">
                    <span className="f-s-16 ">شماره مشتری :</span>
                    <span className="f-s-14 fw-bold"> {selectedFace.CustomerNum}</span>{" "}
                  </div>
                </div >
                <div className="col-12 txt-al-r f-s-20 fw-bold mg-b-50 ">
                  مراجعین اخیر
                </div>
{/* <div className="face-list">
                {faceData
                  ? faceData.map((f, index) => {
                      return <FaceCard1 className="scrollmenu-item" Data={f} />;
                    })
                  : null}
                
                  </div> */}
                  <OwlCarousel className='owl-theme' loop margin={5} items={6} >
                  {faceData
                  ? faceData.map((f, index) => {
                      return <FaceCard1 className="scrollmenu-item" Data={f} />;
                    })
                  : null}

                  </OwlCarousel>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}

export default FaceRecognition;
