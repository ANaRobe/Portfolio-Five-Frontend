import React, {useState} from "react";
import { Form, Button , Alert}  from "react-bootstrap";
import axios from "axios";



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
    <>
    <h1> Sign Up</h1>
    <Form onSubmit={handleSubmit}>
        {errors.username?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>{msg}</Alert>
              ))}
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name="username" value={username} onChange={handleChange}/>
        </Form.Group>
        {errors.password1?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>{msg}</Alert>
              ))}
        <Form.Group controlId="password1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password1" value={password1} onChange={handleChange}/>
        </Form.Group>
        {errors.password2?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>{msg}</Alert>
              ))}
        <Form.Group controlId="password2">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleChange}/>
        </Form.Group> 
        <Button variant="primary" type="submit">
            Sign up
        </Button>
        {errors.non_field_errors?.map((msg, idx) => (
                <Alert variant="warning" key={idx}>{msg}</Alert>
              ))}
    </Form>
    </>
  );
};

export default SignUpForm;