import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const categoryHandler = (category) => {
    navigate(`/products/${category}`);
  };
  return (
    <div
      onClick={() => categoryHandler(category.name)}
      className="category-item"
    >
      <img
        src={category.link}
        alt={category.name}
        style={{ height: "150px", width: "150px" }}
        className="categoryImg"
      />
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryItem;
