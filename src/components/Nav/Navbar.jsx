import "./Navbar.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/AuthSlice";
export default function Navbar() {
  const [accordionVisible, setAccordionVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleAccordion = () => {
    setAccordionVisible(!accordionVisible);
  };
  const logout = () => {
    toggleAccordion();
    dispatch(logOut());
  };

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="nav-left">
          <Link className="logo" to="/">
            Dashboard
          </Link>
        </div>
        <div className="nav-right">
          <div className="icons-container">
            <NotificationsNoneOutlinedIcon />
            <span className="icon-badge">2</span>
          </div>
          <div className="icons-container">
            <LanguageOutlinedIcon />
          </div>
          <div className="icons-container">
            <SettingsOutlinedIcon />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile image"
            className="nav-avatar"
            onClick={toggleAccordion}
          />
          {accordionVisible && (
            <div className="accordion">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
