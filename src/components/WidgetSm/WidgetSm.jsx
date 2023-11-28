import "./WidgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useUserRequests from "../../Utils/useUserRequests";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const { userRequests } = useUserRequests();
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
  ]);
  useEffect(() => {
    async function getLatest5Users() {
      try {
        const res = await userRequests.get(
          "/users?new=true",
          {},
          {
            withCredentials: true,
          }
        );
        setLatestUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getLatest5Users();
  }, []);

  return (
    <div className="widgetSm-container">
      <h3 className="widgetSm-title">New Joined Members</h3>
      <ul className="widgetSm-list">
        {latsetUsers &&
          latsetUsers.map((user) => {
            return (
              <li className="widgetSm-listItem" key={user._id}>
                <img
                  src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="user image"
                  className="widgetSm-img"
                />
                <div className="widgetSm-user">
                  <span className="widgetSm-username">{user.username}</span>
                  <span className="widgetSm-jobtitle"> Customer </span>
                </div>
                <Link className="widgetSm-button" to={`/user/${user._id}`}>
                  <VisibilityIcon className="widgetSm-icon" /> Display
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
