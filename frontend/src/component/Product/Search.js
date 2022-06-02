import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    keyword.trim() ? navigate(`/products/${keyword}`) : navigate(`/products`);
  };
  return (
    <form onSubmit={searchSubmitHandler} className="searchBox">
      <input
        type="text"
        placeholder="Search a Product"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
