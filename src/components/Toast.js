import React, { useState } from "react";
import { Form, Button, Row, Col, Toast } from "react-bootstrap";

const ToastMessage = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Toast
        onClose={() => setShow(false)}
        className="bg-success"
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastMessage;
