import React from "react";
import CategoryItem from "./CategoryItem";
import laptop from "../../../images/laptop.jpg";
import footwear from "../../../images/footwear.jpg";
import bottomwear from "../../../images/bottomwear.jpg";
import top from "../../../images/top.jpg";
import camera from "../../../images/camera.jpg";
import smartphone from "../../../images/smartphones.jpeg";

const categoryItems = [
  {
    name: "Laptop",
    link: laptop,
  },
  {
    name: "Footwear",
    link: footwear,
  },
  {
    name: "Bottom",
    link: bottomwear,
  },
  {
    name: "Tops",
    link: top,
  },
  {
    name: "Camera",
    link: camera,
  },
  {
    name: "SmartPhones",
    link: smartphone,
  },
];

const Categories = () => {
  return (
    <section className="categories">
      {categoryItems.map((item, index) => (
        <CategoryItem category={item} key={index} />
      ))}
    </section>
  );
};

export default Categories;
