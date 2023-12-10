import "./WidgetSm.css";
import { useEffect, useState } from "react";
/* import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
 */
// eslint-disable-next-line react/prop-types
export default function WidgetSm({ usersData }) {
  const [latsetUsers, setLatestUsers] = useState([
    {
      _id: 1,
      username: "EmadHussien98",
    },
    {
      _id: 2,
      username: "EmadHussien98",
    },
    {
      _id: 3,
      username: "EmadHussien98",
    },
    {
      _id: 4,
      username: "EmadHussien98",
    },
    {
      _id: 5,
      username: "EmadHussien98",
    },
    {
      _id: 6,
      username: "EmadHussien98",
    },
    {
      _id: 7,
      username: "EmadHussien98",
    },
  ]);
  useEffect(() => {
    setLatestUsers(usersData);
  }, [usersData]);

  return (
    <div className="widgetSm-container">
      <h3 className="widgetSm-title">New Joined Members</h3>
      <ul className="widgetSm-list">
        {latsetUsers &&
          latsetUsers.map((user) => {
            return (
              <li className="widgetSm-listItem" key={user._id}>
                <img
                  src={
                    user.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt="user image"
                  className="widgetSm-img"
                />
                <div className="widgetSm-user">
                  <span className="widgetSm-username">{user.username}</span>
                  <span className="widgetSm-jobtitle"> Customer </span>
                </div>
                {/*    <Link className="widgetSm-button" to={`/user/${user._id}`}>
                  <VisibilityIcon className="widgetSm-icon" /> Display
                </Link> */}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
