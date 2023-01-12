/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { usePost } from "../hooks/posts";

export default function Post({ postId }) {
  const {data:post, error, isLoading} = usePost(postId)

  /*const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPostById(postId);
        setPost(data);
        setError(null);
      } catch (error) {
        setError(error);
        setPost(null);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [postId]);*/

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error fetching post: {error.message}
      </div>
    );
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
