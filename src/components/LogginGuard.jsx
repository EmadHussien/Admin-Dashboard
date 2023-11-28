/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function LogginGuard({ children }) {
  const { token } = useSelector((state) => state.Auth);
  return token ? children : <Navigate to="/login" />;
}
