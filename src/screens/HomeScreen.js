import React, { useEffect, useState } from "react";
// import products from "../products";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`http://localhost:5000/api/products`);
      setProducts(res.data);
      console.log(res.data);
    };
    getProducts();
  }, []);
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
