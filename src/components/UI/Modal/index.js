import React from 'react'
import {  Modal,Button } from "react-bootstrap";

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {

  const {_task , action} = props

  const task = ()=>{
     if(_task){
       return (
         <Button className="btn-sm" variant={props.color ? props.color : "primary"} onClick={action}>
           {_task}
          </Button>
       )
     }
  }

  return(
    <Modal  size = {props.size} show={props.show}  onHide={props.handleCloseModal}
    centered={props.centered} scrollable className={props.className}
    >
        <Modal.Header >
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
            {props.children}
        </Modal.Body>
        <Modal.Footer>
         <Button className="btn-sm" variant="secondary" onClick={props.handleCloseModal}> Close </Button>
           {task()}
           </Modal.Footer>
      </Modal>
   )

 }

export default NewModal