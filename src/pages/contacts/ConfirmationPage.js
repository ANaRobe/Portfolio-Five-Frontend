import React from "react";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import {useRedirect} from "../../hooks/useRedirect";
import {Col, Row, Container, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom';


const Confirmation = () => {
    useRedirect("loggedOut");
    const history = useHistory();
    return (
        <Row className={
            appStyles.Content
        }>
            <Col className="text-center">
                <Container>
                    <h1>Thank you for your message!</h1>
                    <p className="text-center">We have received your message and will get back to you soon!</p>
                    <Button className={
                            btnStyles.Button
                        }
                        onClick={
                            () => history.push("/")
                    }>Back Home</Button>
                </Container>
            </Col>
        </Row>
    );
};

export default Confirmation;
