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



  function FaceCard1(props){

console.log(props.Data)
return<>
<div className="face1-con txt-al-c">
  <img className="col-12 face1-img" src={props.Data.image} />
  <h3 className="f-s-16 col-12">{props.Data.title}</h3>
  <p className="f-s-14 col-12">{props.Data.des}</p>
</div>
</>

  }


  export default FaceCard1;