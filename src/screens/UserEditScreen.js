import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
//import ToastMessage from "../components/Toast";

import { ToastContainer } from "react-toastify";

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = match.params.id;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;
  const { loading, user, error } = userDetails;
  console.log(userUpdate);

  useEffect(() => {
    if (!user._id || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }

    console.log(user);
    console.log(userUpdate);
  }, [user]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ id: user._id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {/* {success && <ToastMessage />} */}

        {loading || loadingUpdate ? (
          <Loader />
        ) : error || errorUpdate ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                  console.log(isAdmin);
                }}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Edit
            </Button>
          </Form>
        )}
      </FormContainer>
      <div></div>
    </>
  );
};

export default UserEditScreen;
