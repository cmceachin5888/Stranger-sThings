import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const query = encodeURIComponent(searchTerm);
    navigate(`/search?term=${query}`);
  };

  const isPostsPage = location.pathname === "/" || 
    location.pathname === "/search";

  return (
    <div>
      {isPostsPage && (
        <div>
          <input
            type="text"
            name="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;