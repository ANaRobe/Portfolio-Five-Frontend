import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
    console.log(post);
  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (error) {
        console.log(error);
      }
    };

    onMount();
  }, [id]);

  return (
   <Post {...post.results[0]} setPosts={setPost} postPage />
  );
}

export default PostPage;