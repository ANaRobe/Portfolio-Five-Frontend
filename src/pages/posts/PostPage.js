import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CreateCommentForm from "../comments/CreateCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };

    onMount();
  }, [id]);

  return (
    <>  
    <Post {...post.results[0]} setPosts={setPost} postPage />
    <Container className={appStyles.Content}>
    {currentUser ? (
      <CreateCommentForm
        profile_id={currentUser.profile_id}
        profileImage={profile_image}
        post={id}
        setPost={setPost}
        setComments={setComments}
      />
    ) : comments.results.length ? (
      "Comments"
    ) : null}
              {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
  </Container></>
   
  );
}

export default PostPage;