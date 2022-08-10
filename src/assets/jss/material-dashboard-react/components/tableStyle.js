/*eslint-disable*/

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "assets/jss/material-dashboard-react.js";

const tableStyle = () => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    fontFamily: "DIROOZ",
  },
  tableHeadCell: {
    color: "inherit",
    textAlign: "center",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em",
    },
    fontFamily: "DIROOZ",
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
    fontFamily: "DIROOZ",
    textAlign: "center",
    direction: "ltr",
  },
  tableResponsive: {
    width: "100%",
    // marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
    fontFamily: "DIROOZ",
    textAlign: "center",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
    fontFamily: "DIROOZ",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  pagination: {
    fontFamily: "DIROOZ",
    direction: "rtl",
    display: "flex",
    "& .MuiTablePagination-caption": {
      fontFamily: "DIROOZ",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      fontFamily: "DIROOZ",
      "& .MuiList-root.MuiMenuItem-root": {
        fontFamily: "DIROOZ",
      },
    },

    "& .MuiSvgIcon-root": {
      transform: "rotate(180deg)",
    },
    "& .MuiListItem-root": {
      fontFamily: "DIROOZ !important",
    },
  },
});

export default tableStyle;
