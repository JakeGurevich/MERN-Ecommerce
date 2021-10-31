import React, { useEffect } from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../actions/orderActions";

import CheckoutSteps from "../components/CheckoutSteps";

const PlaceorderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { order, success, error } = useSelector((state) => state.order);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { address, city, zipcode, country } = shippingAddress;
  console.log(shippingAddress);
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };
  const totalItemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxPrice = addDecimals(totalItemsPrice * 0.12);
  const shippingPrice = addDecimals(totalItemsPrice > 100 ? 0 : 10);
  const totalPrice = (
    Number(totalItemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  const placeorderHandler = () => {
    // orderItems
    // shippingAddress
    // paymentMethod

    // shippingPrice
    // taxPrice
    dispatch(
      createNewOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalItemsPrice,
        totalPrice,
        shippingPrice,
        taxPrice,
      })
    );
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      history.push("/payment");
    }
    if (success) {
      history.push(`orders/${order._id}`);
    }
  }, [history, success, cart.paymentMethod, order._id]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                Address : {address} , {city} , {zipcode} , {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method : {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              <ListGroup variant="flush">
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  cart.cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="d-grid ">
            <ListGroup className="d-grid ">
              <ListGroup.Item>
                <h2>ORDER SUMMERY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${totalItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid ">
                <Button
                  type="button"
                  className="btn mx-5"
                  disabled={cartItems.length === 0}
                  onClick={placeorderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderScreen;
