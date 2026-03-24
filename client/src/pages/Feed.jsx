import { useEffect, useState } from "react";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
  try {
    const { data } = await API.get("/posts");
    setPosts(data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <CreatePost refresh={fetchPosts} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} refresh={fetchPosts} />
      ))}
    </div>
  );
}