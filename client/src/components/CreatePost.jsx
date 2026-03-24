import { useState } from "react";
import API from "../services/api";

export default function CreatePost({ refresh }) {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content) return;
    await API.post("/posts", { content });
    setContent("");
    refresh();
  };

  return (
    <div className="card">
      <input
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}
