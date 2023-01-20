import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        postPage,
        
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner 
  return (
    <Card>
        <Card.Body >
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    {owner}
                    {is_owner && postPage && "..."}
                </Link>
            </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}><Card.Img src={image} alt={title} /></Link>
        <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className="fas fa-heart" />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className="far fa-heart" />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;