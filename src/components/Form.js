import React, { useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";

import classes from "./Form.module.css";

const Form = (props) => {
  //if we just gets input and submit...useref is betterr..but if we wanna do some changes...Should use State..
  const [passType, setpassType] = useState("password");
  const {
    enteredValue: enteredName,
    valueValidity: nameValidity,
    classInvalid: nameClassInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((name) => {
    return name.trim().length > 1;
  });
  const {
    enteredValue: enteredEmail,
    valueValidity: emailValidity,
    classInvalid: emailClassInvalid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((email) => {
    return email.includes("@");
  });
  const {
    enteredValue: enteredPass,
    valueValidity: passValidity,
    classInvalid: passClassInvalid,
    valueChangeHandler: passChangeHandler,
    valueBlurHandler: passBlurHandler,
    reset: passReset,
  } = useInput((pass) => {
    return pass.trim().length > 5;
  });

  let formValidity = false;
  if (nameValidity && emailValidity && passValidity) {
    formValidity = true;
  }
  const passShowHandler = () => {
    if (passType === "password") {
      setpassType("text");
    } else {
      setpassType("password");
    }
  };

  const submitHandler = (e) => {
    console.log("form", formValidity);
    e.preventDefault();

    if (formValidity) {
      console.log(
        "Name:",
        enteredName,
        " Email:",
        enteredEmail,
        "Pass :",
        enteredPass
      );
      nameReset();
      emailReset();
      passReset();
    }

    //   const payload = {
    //     UserName:enteredName,
    //     Password:enteredPass
    //   }
    //    axios.post('https://daarconn-dev.alarkan.com/Account/validatelogin',payload,{
    //         headers:{
    //             Authorization:'Bearer RGFhci05MUAxMjM0OlBhc3M3NkBAJiY=',
    //             'Content-Type':'application/json',
    //             'Content-Length':'<calculated when request is sent>',
    //             Accept:'*/*',
    //             'Accept-Encoding':'gzip, deflate, br',
    //             'Connection':'keep-alive'
    //         }
    //       }).then((res) => {
    //         console.log("Test Api Response : ",res.data);
    //       }).catch((error) => {
    //         console.log("Test Api Error : ",error)
    //       })
  };
  //////////////////////////////// Classes /////////////////////////////////////////////////////////
  let nameclass = nameClassInvalid
    ? classes.input + " " + classes.invalid
    : classes.input;

  let emailclass = emailClassInvalid
    ? classes.input + " " + classes.invalid
    : classes.input;
  let passclass = passClassInvalid
    ? classes.input + " " + classes.invalid + " " + classes.btnPass
    : classes.input+  " " + classes.btnPass;

  /////////////////////////////////////////// Form return ///////////////////////////////////////////////////////
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameclass}>
        <label>
          Name
          <input
            type={"text"}
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameClassInvalid ? (
            <p style={{ color: "red", textDecoration: false }}>
              Please Enter a valid Name.!
            </p>
          ) : (
            <p>-</p>
          )}
        </label>
      </div>
      <div className={emailclass}>
        <label>
          Email
          <input
            type={"email"}
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailClassInvalid ? (
            <p style={{ color: "red", textDecoration: false }}>
              Please Enter a valid Email.!
            </p>
          ) : (
            <p>-</p>
          )}
        </label>
      </div>
      <div className={passclass}>
        <label>
          Password
          <input
            type={passType}
            value={enteredPass}
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
          />
          {passClassInvalid ? (
            <p style={{ color: "red", textDecoration: false }}>
              Please Enter a Valid Password (atleast 6)
            </p>
          ) : (
            <p>-</p>
          )}
        </label>
        <button type="button" onClick={passShowHandler} >
          {passType === "password" ? "Show" : "Hide"}
        </button>
      </div>
      <div className={classes["btn-main"]}>
        <button className={classes.btn} disabled={!formValidity}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
