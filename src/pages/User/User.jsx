import {
  CalendarToday,
  LocationSearching,
  MailOutlined,
  PhoneAndroid,
} from "@mui/icons-material";
import "./User.css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="user">
      <div className="user-top-container">
        <h1 className="user-title">Edit User</h1>

        <Link to="/new-user" className="user-add-btn">
          Create
        </Link>
      </div>
      <div className="user-container">
        <div className="user-view">
          <div className="user-view-top">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="user-view-img"
            />
            <div className="user-view-top-title">
              <span className="user-view-username">Anna Becker</span>
              <span className="user-view-jobtitle">Software Engineer</span>
            </div>
          </div>
          <div className="user-view-bottom">
            <span className="user-view-bottom-title">Account Details</span>
            <div className="user-view-info">
              <PermIdentityOutlinedIcon className="user-view-icon" />
              <span className="user-view-info-title">annabeck99</span>
            </div>
            <div className="user-view-info">
              <CalendarToday className="user-view-icon" />
              <span className="user-view-info-title">10.12.1999</span>
            </div>
            <span className="user-view-bottom-title">Contact Details</span>
            <div className="user-view-info">
              <PhoneAndroid className="user-view-icon" />
              <span className="user-view-info-title">+1 123 456 67</span>
            </div>
            <div className="user-view-info">
              <MailOutlined className="user-view-icon" />
              <span className="user-view-info-title">annabeck99@gmail.com</span>
            </div>
            <div className="user-view-info">
              <LocationSearching className="user-view-icon" />
              <span className="user-view-info-title">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="user-edit">
          <span className="user-edit-title">Edit</span>
          <form action="" className="user-edit-from">
            <div className="user-edit-left">
              <div className="user-edit-item">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  className="user-edit-input"
                  placeholder="annabeck99"
                />
              </div>

              <div className="user-edit-item">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  className="user-edit-input"
                  placeholder="Anna Becker"
                />
              </div>
              <div className="user-edit-item">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="user-edit-input"
                  placeholder="annabeck99@gmail.com"
                />
              </div>
              <div className="user-edit-item">
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  className="user-edit-input"
                  placeholder="+1 123 456 67"
                />
              </div>
              <div className="user-edit-item">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  className="user-edit-input"
                  placeholder="New York | USA"
                />
              </div>
            </div>
            <div className="user-edit-right">
              <div className="user-edit-upload">
                <img
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="user-edit-img"
                />
                <label htmlFor="file">
                  <PublishIcon className="upload-icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="user-edit-btn">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
