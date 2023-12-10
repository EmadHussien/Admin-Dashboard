/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./WidgetLg.css";
import { format } from "timeago.js";

const Button = ({ type }) => {
  return <button className={"widgetLg-button " + type}>{type}</button>;
};

export default function WidgetLg({ ordersData }) {
  const [orders, setOrders] = useState([
    {
      _id: 1,
      username: "EmadHussien98",
      amount: 500,
      status: "Approved",
    },
    {
      _id: 2,
      username: "EmadHussien98",
      amount: 500,
      status: "Pending",
    },
    {
      _id: 3,
      username: "EmadHussien98",
      amount: 500,
      status: "Pending",
    },
    {
      _id: 4,
      username: "EmadHussien98",
      amount: 500,
      status: "Pending",
    },
    {
      _id: 5,
      username: "EmadHussien98",
      amount: 500,
      status: "Pending",
    },
    {
      _id: 6,
      username: "EmadHussien98",
      amount: 500,
      status: "Pending",
    },
  ]);

  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);

  return (
    <div className="widgetLg-container">
      <h3 className="widgetLg-title">Latest transcations</h3>
      <table className="widgetLg-table">
        <thead>
          <tr className="widgetLg-tr">
            <th className="widgetLg-th">Customer</th>
            <th className="widgetLg-th">Date</th>
            <th className="widgetLg-th">Amount</th>
            <th className="widgetLg-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr className="widgetLg-tr" key={order._id}>
                  <td className="widgetLg-user">
                    <img
                      src={
                        order.userImg ||
                        "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                      }
                      alt="user image"
                      className="widgetLg-img"
                    />
                    <span className="widgetLg-username">
                      {order.username || "Susan Carol"}
                    </span>
                  </td>
                  <td className="widgetLg-date">{format(order.createdAt)}</td>
                  <td className="widgetLg-amount">${order.amount}</td>
                  <td className="widgetLg-status">
                    <Button type={order.status} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
