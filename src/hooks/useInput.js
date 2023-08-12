import { useState } from "react";

const useInput = (valueFun) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueValidity = valueFun(enteredValue);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const valueBlurHandler = () => {
    setValueTouched(true);
  };
  const reset = () => {
    setEnteredValue(""); //can not do that with useref, coz should not Manipulate DOM
    setValueTouched("");
  };

  const classInvalid = !valueValidity && valueTouched;
  return {
    enteredValue,
    valueValidity,
    classInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset
  };
};

export default useInput;
