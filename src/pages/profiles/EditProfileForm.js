import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";

const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    about: "",
    image: "",
  });
  const { first_name, last_name, about, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { first_name, last_name, about, image } = data;
          setProfileData({ first_name, last_name, about, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    onMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append("about", about);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
    <Form.Group>
      <Form.Label>First name:</Form.Label>
      <Form.Control
        type="text"
        name="first_name"
        value={first_name}
        onChange={handleChange}
        aria-label="first name"
      />
    </Form.Group>
    {errors?.first_name?.map((message, idx) => (
      <Alert variant="danger" key={idx}>
        {message}
      </Alert>
    ))}

    <Form.Group>
      <Form.Label>Last name:</Form.Label>
      <Form.Control
        type="text"
        name="last_name"
        value={last_name}
        onChange={handleChange}
        aria-label="last name"
      />
    </Form.Group>
    {errors?.last_name?.map((message, idx) => (
      <Alert variant="danger" key={idx}>
        {message}
      </Alert>
    ))}

    <Form.Group>
      <Form.Label>About:</Form.Label>
      <Form.Control
        as="textarea"
        value={about}
        onChange={handleChange}
        name="about"
        aria-label="about"
        rows={5}
      />
    </Form.Group>
    {errors?.about?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ))}

    <Button className={appStyles.Button} onClick={() => history.goBack()}>
      Cancel
    </Button>

    <Button className={appStyles.Button} type="submit">
      S A V E
    </Button>
  </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${appStyles.Button}  btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProfileForm;