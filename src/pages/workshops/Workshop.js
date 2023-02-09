import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from "../../styles/Workshop.module.css";
import appStyles from"../../App.module.css";


function Workshop(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    date,
    time,
    location,
    price,
    link,
    created_on,
    last_edit,
  } = props;

  return (
    <Card className={styles.Workshop}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">   
          <Link to={`workshops/${profile_id}`}>
            <Avatar src={profile_image} height={30} />
            <p>By: {owner}</p>
          </Link>
          <span class="text-secondary">{last_edit}</span>
        </Media>
      </Card.Body>
      <Link to={`/workshops/${id}`}>
        <Card.Body>
          {title && <Card.Title className={styles.Title}><strong>{title}</strong></Card.Title>}
          <hr className={appStyles.Line} />
        </Card.Body>
        
      </Link>
      <Card.Body>
      
      <Card.Body>
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>  
      <p>
        <strong>Date:</strong> {date} | <strong>Time:</strong> {time} | <strong>Admission:</strong> € {price}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        For more information, visit the workshop page:
        {' '}
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
        >
          <span className={appStyles.Button}>H E R E</span>
        </a>
      </p>
      <p>
      <strong>Posted:</strong>
        {' '}
        {created_on}
      </p>
      </Card.Body>
      </Card>
  );
}

export default Workshop;
