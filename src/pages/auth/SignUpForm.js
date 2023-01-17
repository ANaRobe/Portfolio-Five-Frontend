import React, {useState} from "react";
import { Form, Button }  from "react-bootstrap";


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
  return (
    <>
    <h1> Sign Up</h1>
    <Form>
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name="username" value={username} onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password 1</Form.Label>
            <Form.Control type="password1" placeholder="Password1" name="password1" value={password1} onChange={handleChange}/>
        </Form.Group>
        
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password 2</Form.Label>
            <Form.Control type="password1" placeholder="Password1" name="password2" value={password2} onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
            Sign up
        </Button>
    </Form>
    </>
  );
};

export default SignUpForm;