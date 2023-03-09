import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import {axiosReq} from '../../api/axiosDefaults';
import {useRedirect} from '../../hooks/useRedirect';
import styles from '../../styles/WorkshopForm.module.css';
import btnStyles from "../../styles/Button.module.css";


function EditWorkshopForm() {
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
    const {id} = useParams();


    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/workshops/${id}/`);
                const {
                    title,
                    content,
                    date,
                    time,
                    location,
                    price,
                    link,
                    is_owner
                } = data;

                is_owner ? setWorkshopData({
                    title,
                    content,
                    date,
                    time,
                    location,
                    price,
                    link
                }) : history.push('/');
            } catch (err) {}
        };

        handleMount();
    }, [history, id]);


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
        formData.append('date', date);
        formData.append('time', time);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('link', link);

        try {
            await axiosReq.put(`/workshops/${id}/`, formData);
            history.push(`/workshops/${id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container>
            <h1 className="text-center">update</h1>
            <h3 className="text-center text-secondary">workshop</h3>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Workshop Name:</Form.Label>
                    <Form.Control type="text" name="title"
                        value={title}
                        onChange={handleChange}
                        aria-label="title"/>
                </Form.Group>
                {
                errors?.title?.map((message, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {message} </Alert>
                ))
            }

                <Form.Group>
                    <Form.Label>Content:</Form.Label>
                    <Form.Control as="textarea"
                        rows={6}
                        name="content"
                        value={content}
                        onChange={handleChange}
                        aria-label="content"/>
                </Form.Group>
                {
                errors?.content?.map((message, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {message} </Alert>
                ))
            }

                <Row className={
                    styles.RowSpacing
                }>
                    <Form.Group>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control type="text" name="location"
                            value={location}
                            onChange={handleChange}
                            aria-label="location"/>
                    </Form.Group>
                    {
                    errors?.city?.map((message, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {message} </Alert>
                    ))
                }
                    {
                    errors?.country?.map((message, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {message} </Alert>
                    ))
                } </Row>

                <Row className={
                    styles.RowSpacing
                }>
                    <Form.Group>
                        <Form.Label>Date:</Form.Label>
                        <Form.Control type="date" name="date"
                            value={date}
                            onChange={handleChange}
                            aria-label="date"/>
                    </Form.Group>
                    {
                    errors?.date?.map((message, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {message} </Alert>
                    ))
                }

                    <Form.Group>
                        <Form.Label>Time:</Form.Label>
                        <Form.Control type="time" name="time"
                            value={time}
                            onChange={handleChange}
                            aria-label="time"/>
                    </Form.Group>
                    {
                    errors?.time?.map((message, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {message} </Alert>
                    ))
                }

                    <Form.Group>
                        <Form.Label>Price in €:</Form.Label>
                        <Form.Control type="text" name="price"
                            value={price}
                            onChange={handleChange}
                            aria-label="price"/>
                    </Form.Group>
                    {
                    errors?.price?.map((message, idx) => (
                        <Alert variant="danger"
                            key={idx}>
                            {message} </Alert>
                    ))
                } </Row>

                <Form.Group>
                    <Form.Label>Workshop URL:</Form.Label>
                    <Form.Control type="url" name="link"
                        value={link}
                        onChange={handleChange}
                        aria-label="url"/>
                </Form.Group>
                {
                errors?.link?.map((message, idx) => (
                    <Alert variant="danger"
                        key={idx}>
                        {message} </Alert>
                ))
            }
                <Row>
                    <Button type="submit"
                        className={
                            btnStyles.Button
                    }>
                        S A V E
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

export default EditWorkshopForm;
