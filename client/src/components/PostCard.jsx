import { useState } from "react";
import API from "../services/api";

export default function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");

  const likePost = async () => {
    await API.post(`/posts/${post._id}/like`);
    refresh();
  };

  const addComment = async () => {
    if (!comment) return;
    await API.post(`/posts/${post._id}/comment`, { text: comment });
    setComment("");
    refresh();
  };

  return (
    <div className="card">
      <div className="username">{post.userId?.username}</div>

      {post.content && <div className="post-text">{post.content}</div>}

      {post.image && (
        <img src={post.image} alt="" className="post-img" />
      )}

      <div className="actions">
        <span className="like" onClick={likePost}>
          ❤️ {post.likes.length}
        </span>
        <span className="comment-count">
          💬 {post.comments.length}
        </span>
      </div>

      {post.likes.length > 0 && (
        <div style={{ fontSize: "13px" }}>
          Liked by: {post.likes.map((u) => u.username).join(", ")}
        </div>
      )}

      {post.comments.map((c, i) => (
        <div key={i} className="comment">
          <b>{c.userId?.username}:</b> {c.text}
        </div>
      ))}

      <input
        placeholder="Write comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn" onClick={addComment}>
        Comment
      </button>
    </div>
  );
}