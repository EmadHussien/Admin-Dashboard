import "./Sidebar.css";
import LineStyleOutlinedIcon from "@mui/icons-material/LineStyleOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const slicedURL = location.pathname.slice(1);
  const [activeListItem, setactiveListItem] = useState(slicedURL || "Home");

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Dashboard</h3>
          <ul className="sidebar-list">
            <Link to={"/"} className="sidebar-links">
              <li
                className={`sidebar-list-item ${
                  activeListItem === "Home" ? "active" : ""
                }`}
                onClick={() => setactiveListItem("Home")}
              >
                <LineStyleOutlinedIcon className="sidebar-icon" /> Home
              </li>
            </Link>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Analytics2" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Analytics2")}
            >
              <TimelineOutlinedIcon className="sidebar-icon" /> Analytics
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Sales" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Sales")}
            >
              <TrendingUpOutlinedIcon className="sidebar-icon" /> Sales
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-list">
            <Link to={"/users"} className="sidebar-links">
              <li
                className={`sidebar-list-item ${
                  activeListItem === "users" ? "active" : ""
                }`}
                onClick={() => setactiveListItem("users")}
              >
                <PermIdentityOutlinedIcon className="sidebar-icon" /> Users
              </li>
            </Link>
            <Link to={"/products"} className="sidebar-links">
              <li
                className={`sidebar-list-item ${
                  activeListItem === "products" ? "active" : ""
                }`}
                onClick={() => setactiveListItem("products")}
              >
                <StorefrontOutlinedIcon className="sidebar-icon" /> Products
              </li>
            </Link>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Transactions" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Transactions")}
            >
              <AttachMoneyOutlinedIcon className="sidebar-icon" /> Transactions
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Reports1" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Reports1")}
            >
              <BarChartIcon className="sidebar-icon" /> Reports
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <h3 className="sidebar-title">Notifications</h3>
          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                activeListItem === "Mail" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Mail")}
            >
              <MailOutlineIcon className="sidebar-icon" /> Mail
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Feedback" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Feedback")}
            >
              <DynamicFeedIcon className="sidebar-icon" /> Feedback
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Messages" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Messages")}
            >
              <ChatBubbleOutlineIcon className="sidebar-icon" /> Messages
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <h3 className="sidebar-title">Staff</h3>
          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                activeListItem === "Manage" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Manage")}
            >
              <WorkOutlineIcon className="sidebar-icon" /> Manage
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Analytics1" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Analytics1")}
            >
              <TimelineOutlinedIcon className="sidebar-icon" /> Analytics
            </li>
            <li
              className={`sidebar-list-item ${
                activeListItem === "Reports2" ? "active" : ""
              }`}
              onClick={() => setactiveListItem("Reports2")}
            >
              <ReportIcon className="sidebar-icon" /> Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
