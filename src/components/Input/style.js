/*eslint-disable*/

import { makeStyles } from "@material-ui/core/styles";

const CssTextField = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    width: "100%",
    fontFamily: "DIROOZ",

    "& label.Mui-focused": {
      color: "#a9ba9d",
      textAlign: "right",
      fontFamily: "DIROOZ",
      fontSize: 11,
      top: -5,
      transition: "0.5s",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      textAlign: "right",
      fontFamily: "DIROOZ",
      margin: 0,
    },
    "& label.MuiFormLabel-filled ": {
      textAlign: "right",
      fontFamily: "DIROOZ",
      fontSize: 11,
      top: -5,
      zIndex: 1,
    },
    "& .MuiInputLabel-formControl": {
      transform: "none",
      top: 20,
      right: 12,
      fontSize: 14,
      fontFamily: "DIROOZ",
      zIndex: 0,
    },
    "& .MuiFormControl-root": {
      direction: "ltr",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#a9ba9d",
    },
    "& .MuiInputBase-input": {
      fontFamily: "DIROOZ",
      height: 15,
      fontSize: 14,
      zIndex: 0,
      textAlign: "right",
    },
    "& .MuiOutlinedInput-root": {
      lineHeight: "normal",

      // "& .MuiOutlinedInput-input": {
      //   padding: "18.5px 14px 11px",
      // },
      "& fieldset": {
        borderColor: "gray",

        zIndex: 0,
        "& legend": {
          textAlign: "right",
        },
      },
      "&:hover fieldset": {
        borderColor: "#a9ba9d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#a9ba9d",
      },
    },
    "& .MuiSelect-iconOutlined": {
      left: 0,
      right: "90%",
    },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: 14,
    },
  },
}));

export default CssTextField;
