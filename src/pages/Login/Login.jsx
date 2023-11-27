import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "../../Redux/AuthSlice";

import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    dispatch(getToken(user));

    /* try {
      const res = await axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/auth/login",
        user,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setMsg("");
        /*         dispatch(addUser({ ...res.data }));
          navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        setMsg(
          "Login failed. Please double check your credentials and try again."
        );
      }
    } */
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
              color: "red",
              marginBottom: "20px",
              width: "80%",
              fontSize: "14px",
            }}
          >
            {msg}
          </p>
        </form>
      </div>
    </div>
  );
}
