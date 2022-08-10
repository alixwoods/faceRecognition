import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes } from "../api/api";

export const RefreshToken = async () => {
    let ref;
    await axios
      .post(
        `${Routes.RefreshToken}`,
        {
          username: localStorage.getItem("userName"),
          refreshToken: localStorage.getItem("refreshToken"),
        },
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          localStorage.setItem("token", res.data.value.response.token);
          localStorage.setItem(
            "refreshToken",
            res.data.value.response.refreshToken
          );
  

          ref = { result: true };
        } else ref = { result: false };
      })
      .catch((err) => {
        ref = { result: false };
      });
    return ref;
  };