import StringMask from "string-mask";

const CARD_NUMBER_DELIMITER = "-";
const CARD_NUMBER_MASK = "0000-0000-0000-0000";

const CARD_DATE_DELIMITER = "/";
const CARD_DATE_MASK = "00/00";

const removeTrailingCharIfFound = (str, char) =>
  str
    .split(char)
    .filter((segment) => segment !== "")
    .join(char);

export const formatCardNumberValue = (str) => {
  const unmaskedValue = str.split(CARD_NUMBER_DELIMITER).join("");
  const formatted = StringMask.process(unmaskedValue, CARD_NUMBER_MASK);

  return removeTrailingCharIfFound(formatted.result, CARD_NUMBER_DELIMITER);
};

export const formatCardDateValue = (str) => {
  const unmaskedValue = str.split(CARD_DATE_DELIMITER).join("");
  const formatted = StringMask.process(unmaskedValue, CARD_DATE_MASK);

  return removeTrailingCharIfFound(formatted.result, CARD_DATE_DELIMITER);
};
