import React, { useState } from "react";

import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
