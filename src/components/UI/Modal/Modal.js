import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

function ModalOverlays(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

export default function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </React.Fragment>
  );
}
