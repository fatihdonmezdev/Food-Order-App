import React, { Fragment } from 'react'
import ReactDOM  from 'react-dom'
import classes from './Modal.module.css'
const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onTick}></div>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>
        {props.children}
        </div>
    </div>
}
const portalElement = document.getElementById('overlays');

const Modal = props => {
  return <Fragment>
    {ReactDOM.createPortal(<Backdrop onTick={props.onTick}/>, portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    
  </Fragment>
  
}

export default Modal