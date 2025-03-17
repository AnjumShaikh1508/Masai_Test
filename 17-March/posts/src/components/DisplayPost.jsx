import React, { useEffect, useState } from "react";
import axios from "axios";
import "./post.css";

const PostsApp = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterUserId, setFilterUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedPosts = [...posts];

    if (searchQuery) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterUserId) {
      updatedPosts = updatedPosts.filter(post => post.userId === parseInt(filterUserId));
    }

    if (sortBy === "title-asc") {
      updatedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      updatedPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "userId-asc") {
      updatedPosts.sort((a, b) => a.userId - b.userId);
    } else if (sortBy === "userId-desc") {
      updatedPosts.sort((a, b) => b.userId - a.userId);
    }

    setFilteredPosts(updatedPosts);
  }, [searchQuery, filterUserId, sortBy, posts]);

  return (
    
    <div className="container">
      <h1></h1>
      <div className="controls">
        <input
          className="search-input"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="dropdown" value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
          <option value="">All Users</option>
          {[...new Set(posts.map(post => post.userId))].map(userId => (
            <option key={userId} value={userId.toString()}>
              User {userId}
            </option>
          ))}
        </select>
        <select className="dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="userId-asc">User ID (Asc)</option>
          <option value="userId-desc">User ID (Desc)</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-message">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="no-posts-message">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <p className="post-user">User ID: {post.userId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsApp;
