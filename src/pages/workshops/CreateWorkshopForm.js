import React, {useState} from 'react';
import {
    Alert,
    Button,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {axiosReq} from '../../api/axiosDefaults';
import {useRedirect} from '../../hooks/useRedirect';
import styles from '../../styles/WorkshopForm.module.css';
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css"


function CreateWorkshopForm() {
    useRedirect('loggedout');
    const [errors, setErrors] = useState({});

    const [workshopData, setWorkshopData] = useState({
        title: '',
        content: '',
        date: '',
        time: '',
        location: '',
        price: '',
        link: ''
    });

    const {
        title,
        content,
        date,
        time,
        location,
        price,
        link
    } = workshopData;

    const history = useHistory();


    const handleChange = (e) => {
        setWorkshopData({
            ...workshopData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('link', link);
        formData.append('date', date);
        formData.append('time', time);

        try {
            const {data} = await axiosReq.post('/workshops/', formData);
            history.push(`/workshops/${
                data.id
            }`);
        } catch (error) {
            if (error.response?.status !== 401) {
                setErrors(error.response?.data);
            }
        }
    };

    return (
        <Container className={
            appStyles.Content
        }>
            <h1 className="text-center">share</h1>
            <h3 className="text-center text-secondary">workshop</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control type="text" name="title"
                        value={title}
                        onChange={handleChange}
                        aria-label="title"/>
                </Form.Group>
                {
                errors?.title?.map((msg, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {msg} </Alert>
                ))
            }

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea"
                        rows={5}
                        name="content"
                        value={content}
                        onChange={handleChange}
                        aria-label="content"/>
                </Form.Group>
                {
                errors?.content?.map((msg, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {msg} </Alert>
                ))
            }

                <Row className={
                    styles.RowSpacing
                }>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location"
                            value={location}
                            onChange={handleChange}
                            aria-label="location"/>
                    </Form.Group>
                    {
                    errors?.location?.map((msg, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {msg} </Alert>
                    ))
                } </Row>

                <Row className={
                    styles.RowSpacing
                }>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date"
                            value={date}
                            onChange={handleChange}
                            aria-label="date"/>
                    </Form.Group>
                    {
                    errors?.date?.map((msg, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {msg} </Alert>
                    ))
                }

                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name="time"
                            value={time}
                            onChange={handleChange}
                            aria-label="time"/>
                    </Form.Group>
                    {
                    errors?.time?.map((msg, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {msg} </Alert>
                    ))
                }

                    <Form.Group>
                        <Form.Label>Price in €</Form.Label>
                        <Form.Control type="text" name="price"
                            value={price}
                            onChange={handleChange}
                            aria-label="price"/>
                    </Form.Group>
                    {
                    errors?.price?.map((msg, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {msg} </Alert>
                    ))
                } </Row>

                <Form.Group>
                    <Form.Label>Workshop URL</Form.Label>
                    <Form.Control type="url" name="link"
                        value={link}
                        onChange={handleChange}
                        aria-label="workshop url"/>
                </Form.Group>
                {
                errors?.link?.map((msg, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {msg} </Alert>
                ))
            }
                <Row className={
                    styles.RowSpacing
                }>
                    <Button type="submit"
                        className={
                            btnStyles.Button
                    }>
                        S H A R E
                    </Button>

                    <Button onClick={
                            () => history.goBack()
                        }
                        className={
                            btnStyles.Button
                    }>
                        C a n c e l
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateWorkshopForm;
