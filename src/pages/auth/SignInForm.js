import React, { useState } from "react";
import { Form, Button , Alert, Row, Col, Container }  from "react-bootstrap";
import axios from "axios";
import { useHistory, Link} from "react-router-dom";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");
  
  const [Data, setData] = useState({
    username: '',
    password: '',
});
const { username, password } = Data;
const [errors, setErrors] = useState({});
const history = useHistory();
    /* 
        Form submit handler
    */
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page refresh
  try {
      const { data } = await axios.post("/dj-rest-auth/login/", Data); 
      setCurrentUser(data.user)
      history.goBack();
  } catch (error) {
      setErrors(error.response?.data); // Check if response is defined before looking at the data
  }
};
    /* 
      Handles changes to any of the input fields
    */
const handleChange = (e) => {
    setData({
        ...Data,
        [e.target.name]: e.target.value, // key = input field name, value = user's input
    });
};

  return (
    <Row className="text-center">
      <Col className="my-auto offset-md-2" md={6}>
        <Container>
          <h1>Sign in</h1>
            <Form onSubmit={handleSubmit}>
                {errors.username?.map((msg, idx) => (
                        <Alert variant="warning" key={idx}>{msg}</Alert>
                        ))}
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={handleChange}/>
                </Form.Group>
                {errors.password?.map((msg, idx) => (
                        <Alert variant="warning" key={idx}>{msg}</Alert>
                        ))}
                <Form.Group controlId="password">
                    <Form.Label className="d-none" >Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange}/>
                </Form.Group>
                {errors.non_field_errors?.map((msg, idx) => (
                        <Alert variant="warning" key={idx}>{msg}</Alert>
                        ))}
                <Button variant="primary" type="submit" className={appStyles.Button}>
                    Sign in
                </Button>
            </Form>
            <Link className={appStyles.Link} to="/signup">Don't have an account? <span>Sign up now!</span></Link>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
