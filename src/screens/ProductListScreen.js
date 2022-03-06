import React, { useState, useEffect, useMemo } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useSort } from "../hooks/useSort";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ProductListScreen = ({ history }) => {
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, error: errorDelete } = userDelete;

  const sortedAndSearchedProducts = useSort(
    products,
    selectedFilter,
    searchQuery
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // dispatch(deleteUser(id));
      console.log("user deleted");
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <h1 className="text-center">Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Sort by:</InputGroup.Text>
                <Form.Control
                  as="select"
                  value={selectedFilter}
                  id="button-addon2"
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option disabled value="all">
                    Sort by :
                  </option>
                  <option value="name">Name of Product</option>
                  <option value="category">Category</option>
                </Form.Control>
              </InputGroup>
            </Col>
            <Col md={7}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search..."
                  aria-label="search"
                  value={searchQuery}
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    e.preventDefault();

                    setSearchQuery(e.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon1"
                  onClick={(e) => {
                    e.preventDefault();

                    console.log(sortedAndSearchedProducts);
                  }}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
          {sortedAndSearchedProducts.length === 0 ? (
            <h2 className="text-center text-primary">Products not found</h2>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndSearchedProducts.map((prod, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>{prod.price}</td>
                    <td>{prod.countInStock}</td>
                    <td>
                      <LinkContainer to={`/admin/user/${prod._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      {/* <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler()}
                      >
                        <i className="fa fa-trash"></i>
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
