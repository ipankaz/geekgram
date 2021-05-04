import React from "react";
import "./style.css";
/**
 * @author
 * @function DropDown
 **/

const DropDown = (props) => {
  const handlePostDelete = () => {
    props.handleDelete();
  };

  const handlePostEdit = ()=>{
    props.handleEdit()
  }
  return (
    <div className="customDropDown">
      <div className="option">
        <span onClick={handlePostEdit}>Edit</span>
      </div>
      <div className="option">
        <span onClick={handlePostDelete}>Delete</span>
      </div>
    </div>
  );
};

export default DropDown;
