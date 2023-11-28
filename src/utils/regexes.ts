export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
//source: https://www.regextester.com/100102
export const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const charaterOnlyRegex = /^[a-zA-Z ]+$/;
export const noSpecialCharacter = /^[a-zA-Z0-9 ]+$/;
export const numberRegex = /^[1-9]{1,6}$/;
export const onlyNumber = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
export const onlyNumberMaxFiveDecimals =
  /^([0-9]+(?:[\.][0-9]{1,5})?|\.[0-9]{1,5})$/;
