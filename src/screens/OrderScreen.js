import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const order = useSelector((state) => state.getOrder);
  const { orderDetails, loading, error } = order;

  const totalItemsPrice = orderDetails?.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const payHandler = () => {
    console.log("paying");
  };
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Order: <h3>{orderDetails._id}</h3>
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Name :</strong>
                {orderDetails.user.name}
              </p>
              <p>
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
              <p>
                Address : {orderDetails.shippingAddress.address} ,
                {orderDetails.shippingAddress.city} ,
                {orderDetails.shippingAddress.zipcode} ,
                {orderDetails.shippingAddress.country}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method : {orderDetails.paymentMethod}</p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              <ListGroup variant="flush">
                {orderDetails.orderItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  orderDetails.orderItems.map((item, i) => (
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
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid ">
                <Button type="button" className="btn mx-5" onClick={payHandler}>
                  Pay
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
