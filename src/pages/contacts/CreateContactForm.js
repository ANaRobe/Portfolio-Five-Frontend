import React, {useState} from "react";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";


const CreateContactForm = () => {
  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    content: "",
  });

  const { first_name, last_name, email, content } = contactData;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post("/forms/", contactData);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (    
    <Row>
      
      <Col>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1>Contact Us</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.fname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.lname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
            className={appStyles.Button}
            type="submit"
            >
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
            </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default CreateContactForm;