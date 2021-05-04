import React from "react";

/**
 * @author
 * @function Input
 **/

const Input = (props) => {
  return (
    <div className="input-field-123">
      <i className={props.iclassname}></i>
      <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Input;
