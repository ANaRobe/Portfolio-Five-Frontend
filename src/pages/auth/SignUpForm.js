import React, {useState} from "react";
import { Form, Button , Alert, Row, Col, Container }  from "react-bootstrap";
import axios from "axios";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import PasswordCriteria from "../../components/PasswordCriteria";



const SignUpForm = () => {
        /* 
      Store the value of the inputs
    */
    const [Data, setData] = useState({
      username: "",
      password1: "",
      password2: "",
    });
    const { username, password1, password2 } = Data;
    /* 
      Handles changes to any of the input fields
    */
    const handleChange = (e) => {
      setData({
        ...Data,
        [e.target.name]: e.target.value, // key = input field name, value = user's input
      });
    };

    /* 
        Form submit handler
    */
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh
        try {
          await axios.post("/dj-rest-auth/registration/", Data);
        } catch (error) {
            setErrors(error.response?.data);  // Check if response is defined before looking at the data
          }
      };
    return (
    <Row className="text-center">
      <Col className="my-auto offset-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1> Sign up</h1>
          <Form onSubmit={handleSubmit}>
              {errors.username?.map((msg, idx) => (
                      <Alert variant="warning" key={idx}>{msg}</Alert>
                    ))}
              <Form.Group controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control type="text" placeholder="username" name="username" value={username} onChange={handleChange}/>
              </Form.Group>
              {errors.password1?.map((msg, idx) => (
                      <Alert variant="warning" key={idx}>{msg}</Alert>
                    ))}
              <Form.Group controlId="password1">
                  <Form.Label className="d-none" >Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password1" value={password1} onChange={handleChange}/>
              </Form.Group>
              {errors.password2?.map((msg, idx) => (
                      <Alert variant="warning" key={idx}>{msg}</Alert>
                    ))}
              <Form.Group controlId="password2">
                  <Form.Label className="d-none">Confirm password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleChange}/>
              </Form.Group> 
              {errors.non_field_errors?.map((msg, idx) => (
                      <Alert variant="warning" key={idx}>{msg}</Alert>
                    ))}

               <PasswordCriteria />

              <Button variant="primary" type="submit" className={appStyles.Button}>
                  Sign up
              </Button>
          </Form>
          <Link className={appStyles.Link} to="/login">Already registered? Click and<span> Sign in </span>!</Link>
      </Container>
    </Col>
  </Row>
  );
};

export default SignUpForm;