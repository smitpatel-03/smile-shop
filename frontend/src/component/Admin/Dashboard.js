import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminProducts } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Chart as ChartJS, registerables } from "chart.js";
import DashboardCard from "./DashboardCard.js";
import productsImg from "../../images/products.png";
import orderImg from "../../images/orders.jpg";
import usersImg from "../../images/users.jpg";

ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount Earned
              <br /> ₹{totalAmount}
            </p>
          </div>
          <div>
            <Link to="/admin/products" style={{ textDecoration: "none" }}>
              {products && (
                <DashboardCard
                  title="Products"
                  amount={products.length}
                  image={productsImg}
                />
              )}
            </Link>
            <Link to="/admin/orders" style={{ textDecoration: "none" }}>
              {orders && (
                <DashboardCard
                  title="Orders"
                  amount={orders.length}
                  image={orderImg}
                />
              )}
            </Link>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              {users && (
                <DashboardCard
                  title="Users"
                  amount={users.length}
                  image={usersImg}
                />
              )}
            </Link>
          </div>
        </div>
        <div className="charts">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
