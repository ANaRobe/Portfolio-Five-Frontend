import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from "../../styles/Workshop.module.css";
import btnStyles from "../../styles/Button.module.css";
import { DropdownMenu } from '../../components/DropdownMenu';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

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
    workshopPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Route user to Edit page for workshop
   */
  const handleEdit = () => {
    history.push(`/workshops/${id}/edit`);
  };

  /**
   * Delete workshop from API.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/workshops/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };


  return (
    <Card className={styles.Workshop}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">   
        <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={30} />
            <p>By: {owner}</p>
          </Link>
          <div className="d-flex align-items-center">
            <span className="text-secondary">{last_edit}</span>
              {is_owner && workshopPage && (
                <DropdownMenu
                  handleEdit={handleEdit}
                  handleDelete={handleDelete} 
                />
              )}
              </div>
        </Media>
       
      </Card.Body>
      <Link to={`/workshops/${id}`}>
        <Card.Body>
          {title && <Card.Title  className="text-center"><strong>{title}</strong></Card.Title>}
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
            <span className={btnStyles.Button}>H E R E</span>
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
