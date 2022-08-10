import { number } from "prop-types";

let persianNumbers = [
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
];
let arabicNumbers = [
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
];
//convert persian number to english
export const fixNumbers = (str) => {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

export const IsNumber = (str, prevStr) => {
  str = str.replace(/\,/g, "");
  let enNumber = fixNumbers(str);
  let number = !isNaN(enNumber);
  if (number === true) {
    return enNumber;
  } else {
    return prevStr;
  }
};

export const fontFarsi = (word) => {
  let newWord = word
    .replace(/0/g, "۰")
    .replace(/1/g, "۱")
    .replace(/2/g, "۲")
    .replace(/3/g, "۳")
    .replace(/4/g, "۴")
    .replace(/5/g, "۵")
    .replace(/6/g, "۶")
    .replace(/7/g, "۷")
    .replace(/8/g, "۸")
    .replace(/9/g, "۹");
  return newWord;
};

export function moneySplitter(input) {
  if (input == 0 || input == null) {
    return 0;
  } else {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const ToRial = (str) => {
  str = str.replace(/\,/g, "");
  var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
  while (objRegex.test(str)) {
    str = str.replace(objRegex, "$1,$2");
  }
  return str;
};
