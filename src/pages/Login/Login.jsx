import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../Redux/AuthSlice";
import "./Login.css";

export default function Login() {
  const { token, isLoading, error, isAdmin } = useSelector(
    (state) => state.Auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isAdmin) {
      navigate("/");
    }
  }, [token]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    dispatch(LogIn(user));
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Login();
  }
  return (
    <div className="Container">
      <div className="Wrapper">
        <h1 className="Title">SIGN IN</h1>
        <p>username: Admin</p>
        <p>password: admin</p>
        <form className="Form" onSubmit={handleSubmit}>
          <input
            className="Input"
            placeholder="username"
            onChange={handleChange}
            name="username"
            value={user.username}
            required
          />
          <input
            className="Input"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={user.password}
            required
            type="password"
          />
          <button className="Button">LOGIN</button>
          <p
            style={{
              color: token && isAdmin ? "green" : isLoading ? "blue" : "red",
              marginBottom: "20px",
              width: "80%",
              fontSize: "14px",
            }}
          >
            {isLoading ? "Loading..." : ""}
            {token && isAdmin ? "Login Successed" : ""}
            {error || (token && !isAdmin && !isLoading)
              ? "Login failed. Please double check your credentials and try again."
              : ""}
          </p>
        </form>
      </div>
    </div>
  );
}
