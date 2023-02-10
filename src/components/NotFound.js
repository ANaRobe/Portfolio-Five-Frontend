import React from 'react';
import NoResults from "../assets/no_results.png";
import Asset from "./Asset";
import { useHistory } from 'react-router-dom';
import appStyles from "../App.module.css";
import { Row, Col, Container, Button } from "react-bootstrap";

const NotFound = () => {
    const history = useHistory();
  return (
    <Row className={appStyles.Content}>  
    <Col className="text-center">
  <Container>
        <Asset src={NoResults} msg={`Sorry, the page you're looking for doesn't exist`} />
        <Button className={appStyles.Button} onClick={() => history.push("/")}>Back Home</Button>
    </Container>
    </Col>
    </Row>
             
  )
}

export default NotFound