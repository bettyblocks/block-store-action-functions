const present = async ({ recordToCheck, numberToCheck, textToCheck }) => {
  const returnObj = { result: false };

  if (recordToCheck && recordToCheck.data) {
    returnObj.result = true;
  } else {
    if (numberToCheck && typeof numberToCheck === "number") {
      returnObj.result = true;
    } else {
      if (
        textToCheck &&
        typeof textToCheck === "string" &&
        textToCheck.trim().length > 0
      )
        returnObj.result = true;
    }
  }
  return returnObj;
};

export default present;
