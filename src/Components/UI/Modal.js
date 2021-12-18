import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlay");

  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClick={props.onCloseModal} />, portalElement)}
      {ReactDom.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
