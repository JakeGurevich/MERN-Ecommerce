import React, { useState, useEffect, useMemo } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import usersFromData from "../data/users";
import { useSort } from "../hooks/useSort";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserList, deleteUser } from "../actions/userActions";

const UsersListScreen = ({ history }) => {
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.getUsers);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, error: errorDelete } = userDelete;

  const sortedAndSearchedUsers = useSort(
    usersFromData,
    selectedFilter,
    searchQuery
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      console.log("user deleted");
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      //dispatch(getUserList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success]);
  return (
    <>
      <h1 className="text-center">Users</h1>

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
                  <option value="name">Name</option>
                  <option value="email">Email</option>
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

                    console.log(sortedAndSearchedUsers);
                  }}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
          {sortedAndSearchedUsers.length === 0 ? (
            <h2 className="text-center text-primary">Users not found</h2>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedAndSearchedUsers.map((user, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fa fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i className="fa fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/users/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
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

export default UsersListScreen;
