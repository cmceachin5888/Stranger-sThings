import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchLocation = useLocation();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      const getPosts = async () => {
        try {
          const posts = await fetchPosts(token);
          setPosts(posts);
        } catch (error) {
          console.error("Failed to fetch posts", error);
        }
      };
  
      getPosts();
    }, []);
  
    const postMatches = (post, text) => {
      return (
        post.title.toLowerCase().includes(text.toLowerCase()) ||
        post.description.toLowerCase().includes(text.toLowerCase()) ||
        post.author.username.toLowerCase().includes(text.toLowerCase()) ||
        post.price.toLowerCase().includes(text.toLowerCase()) ||
        post.location.toLowerCase().includes(text.toLowerCase())
      );
    };
  
    const handleSearch = () => {
      const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
      setSearchResults(filteredPosts);
      setIsSearching(true);
    };
    
  const showSearchBar = searchLocation.pathname === "/";

  return (
    <div>
      {showSearchBar && (
        <div>
          <div>
            <input
              type="text"
              name="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
  
          {isSearching && searchResults.length === 0 ? (
            <p>No matching posts found.</p>
          ) : (
            searchResults.map((post) => (
              <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <div>{post.author.username || "Unknown User"}</div>
                <div>Description: {post.description}</div>
                <div>Price: {post.price}</div>
                <div>Location: {post.location}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
