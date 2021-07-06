import React from "react";

import "components/Button.scss";

const classnames = require("classnames");

const Button = function(props) {
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
 
   return (
      <button 
         onClick={props.onClick} 
         className={buttonClass}
         disabled = {props.disabled}
      >
         {props.children}
      </button>);
 }


 export default Button;