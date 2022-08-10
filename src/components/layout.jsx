import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import Header from "./common/header";
import Sidebar from "./common/sidebar";
import axios from "axios";
import { Routes } from "../api/api";
import { isIEBrowser, isEdgeBrowser, isFirefoxBrowser } from "../utils";
import { Router, Route, Switch, useHistory, create } from "react-router-dom";
import { createBrowserHistory } from "history";

import { RefreshToken } from "../routes/ref";

export default function Layout(props) {
  useEffect(() => {
    document.querySelector("body").classList.add("loaded");
    window.addEventListener("scroll", scrollHander, true);

    return () => {
      window.removeEventListener("scroll", scrollHander);
    };
  }, []);

  function scrollHander() {
    if (window.pageYOffset > 400) {
      document.querySelector(".scroll-to-top") &&
        document.querySelector(".scroll-to-top").classList.add("visible");
    } else {
      document.querySelector(".scroll-to-top") &&
        document.querySelector(".scroll-to-top").classList.remove("visible");
    }
  }

  function toTop(e) {
    if (isIEBrowser() || isEdgeBrowser() || isFirefoxBrowser()) {
      let pos = window.pageYOffset;
      let timer = setInterval(() => {
        if (pos <= 0) clearInterval(timer);
        window.scrollBy(0, -40);
        pos -= 40;
      }, 1);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    e.preventDefault();
  }


  var parts = window.location.href.split("/");
  var lastSegment = parts.pop() || parts.pop();

  useEffect(() => {
    MenuAccess();
  }, []);
  const [menuService, setmenuService] = useState([]);
  const [myMenu, setMyMenu] = useState([{children: null,
    icon: "bx bx-home",
    name: "داشبورد",
    url: "/"},{children: null,
      icon: "bx bx-face",
      name: "تشخیص چهره",
      url: "/FaceRecognition"},
  ]);
  const [accountName, setaccountName] = useState([]);
  const [ProfileImg, setProfileImg] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [loadingMenu, setloadingMenu] = useState(true);
  const history = createBrowserHistory();






  const MenuAccess = () => {
    setloadingMenu(true);
    axios
      .get(Routes.MenuAccess, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setloadingMenu(false);
        if (res.data.responseCode === 200) {
          setmenuService(res.data.value.response.menuAccesses);
          setaccountName(res.data.value.response.displayName);
          setProfileImg(res.data.value.response.imageThumb);
        } else if (res.data.responseCode === 500) {
          history.push(`/#/signUp`);
          window.location.reload();
        }
      })
      .catch(async (err) => {
        // if(lastSegment==="#"){
          if (
            !localStorage.getItem("token") &&
            !localStorage.getItem("refreshToken")
          ) {
            history.push(`/#/signUp`);
            window.location.reload();
          } else if (err.response.status === 500) {
            history.push(`/#/signUp`);
            window.location.reload();
          } else if (
            !localStorage.getItem("refreshToken") &&
            err.response.status === 401
          ) {
            history.push(`/#/FinishToken`);
            window.location.reload();
          } else if (
            localStorage.getItem("refreshToken") &&
            err.response.status === 401
          ) {
            let ref = await RefreshToken();
            if (ref.result) {
              MenuAccess();
            } else {
              history.push(`/#/FinishToken`);
              window.location.reload();
            }
          }
        // }

      });
  };

  return (
    <>
      <Header ProfileImg={ProfileImg} accountName={accountName} />

      {loadingMenu ? (
        <div className="loading-overlay">
          <div className="bounce-loader">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      ) : null}

      <div className="inner-wrapper">
        <Sidebar Menu={myMenu} />

        <section
          role="main"
          className="content-body content-body-modern mt-0"
          // style={{ marginLeft: "0px", marginRight: "250px" }}
        >
          {props.children}
        </section>
      </div>

      <a href="#top" className="scroll-to-top hidden-mobile" onClick={toTop}>
        <i className="fas fa-chevron-up"></i>
      </a>

      <ToastContainer
        className="ui-pnotify"
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        position="top-right"
        hideProgressBar={true}
        autoClose={3000}
        containerId="default"
        enableMultiContainer={true}
      />

      <ToastContainer
        className="ui-pnotify stack-bottomleft"
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        position="bottom-left"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={3000}
        containerId="bottom-left"
        enableMultiContainer={true}
      />

      <ToastContainer
        className="ui-pnotify stack-bottomright"
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        position="bottom-right"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={3000}
        containerId="bottom-right"
        enableMultiContainer={true}
      />

      <ToastContainer
        className="ui-pnotify stack-bar-top"
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        position="top-left"
        hideProgressBar={true}
        autoClose={3000}
        containerId="top-bar"
        enableMultiContainer={true}
      />

      <ToastContainer
        className="ui-pnotify stack-bar-bottom"
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        position="bottom-left"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={3000}
        containerId="bottom-bar"
        enableMultiContainer={true}
      />
    </>
  );
}
