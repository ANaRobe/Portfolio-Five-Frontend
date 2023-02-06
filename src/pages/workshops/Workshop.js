import React from 'react';
import { Container, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';


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
    <Container>
      <br />
      <Link to={`/workshops/${id}`}>
        <h1>{title}</h1>
      </Link>
      <p>Last updated: {last_edit}</p>
      <Media>
        <Link to={`workshops/${profile_id}`}>
          <Avatar src={profile_image} height={30} />
          <p>By: {owner}</p>
        </Link>

      </Media>
      <p>{content}</p>
      <p>
        Date: {date} | Time: {time} | Admission: €{price}
      </p>
      <p>
        Location: {location}
      </p>
      <p>
        For more information, visit the workshop page:
        {' '}
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
        >
          <strong>H E R E</strong>
        </a>
      </p>
      <p>
        Submitted:
        {' '}
        {created_on}
      </p>
    </Container>
  );
}

export default Workshop;
