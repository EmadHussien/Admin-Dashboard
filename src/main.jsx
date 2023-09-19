import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserList from "./pages/UserList/UserList";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
import User from "./pages/User/User";
import NewUser from "./pages/New User/NewUser";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/New Product/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/user/:userId",
        element: <User />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/new-product",
        element: <NewProduct />,
      },
    ],
  },

  {
    path: "*",
    element: <div>Error</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
