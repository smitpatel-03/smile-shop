import React from "react";
import "./Dashboard.css";
const DashboardCard = ({ title, amount, image }) => {
  return (
    <div className="dashboard-card">
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <h2>{amount}</h2>
    </div>
  );
};

export default DashboardCard;
