import React, { useState } from "react";
import { Form, Button, Col, Container, Image }  from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import cloud from "../../assets/cloud.png";
import { useHistory } from 'react-router-dom';

/*
Render input fields to create a post.
 */
function CreatePostForm() {
  const history = useHistory();
  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = data;

  /*
  Populate postData strings
  */
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const changeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image); // Clear browsers's reference to the previous
      setData({
        ...data,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const textFields = (
    <div>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
  const imageField = (
    <div>
      <Form.Group className="text-center">
        {image ? (
          <>
            <figure>
              <Image src={image} />
            </figure>
            <div>
              <Form.Label
                className={`${appStyles.Button} btn`}
                htmlFor="image-upload"
              >
                Change
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex justify-content-center"
            htmlFor="image-upload"
          >
          <Col>
              <figure className={appStyles.Button}>
                  <Image src={cloud} height="100"/>Upload image
              </figure>
            <Asset message="Upload image" />        
          </Col>
          </Form.Label>
        )}
        <Form.File
          className="d-none"
          id="image-upload"
          accept="image/*"
          onChange={changeImage}
        />
      </Form.Group>
  </div>
  );
  const formButtons = (
    <span>
      <Form.Group>
      <Button className={appStyles.Button} type="submit">
      S H A R E
      </Button> 
      <Button className={appStyles.Button}
        onClick={() => history.goBack()}
      >
      C a n c e l
      </Button>
      </Form.Group>
    </span>
  );
  return (
    <Form>
      <h1 className="d-flex justify-content-center">S H A R E </h1>
        <Container>{textFields}</Container>
        <Container>{imageField}</Container>
        <Container>{formButtons}</Container>
    </Form> 
  );
}

export default CreatePostForm; 