/* eslint-disable react/prop-types */
import "./WidgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLg-button " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg-container">
      <h3 className="widgetLg-title">Latest transcations</h3>
      <table className="widgetLg-table">
        <tr className="widgetLg-tr">
          <th className="widgetLg-th">Customer</th>
          <th className="widgetLg-th">Date</th>
          <th className="widgetLg-th">Amount</th>
          <th className="widgetLg-th">Status</th>
        </tr>
        <tr className="widgetLg-tr">
          <td className="widgetLg-user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="user image"
              className="widgetLg-img"
            />
            <span className="widgetLg-username">Susan Carol</span>
          </td>
          <td className="widgetLg-date">12 Sep 2023</td>
          <td className="widgetLg-amount">$220.00</td>
          <td className="widgetLg-status">
            <Button type="Approved" />
          </td>
        </tr>

        <tr className="widgetLg-tr">
          <td className="widgetLg-user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="user image"
              className="widgetLg-img"
            />
            <span className="widgetLg-username">Susan Carol</span>
          </td>
          <td className="widgetLg-date">12 Sep 2023</td>
          <td className="widgetLg-amount">$220.00</td>
          <td className="widgetLg-status">
            <Button type="Pending" />
          </td>
        </tr>

        <tr className="widgetLg-tr">
          <td className="widgetLg-user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="user image"
              className="widgetLg-img"
            />
            <span className="widgetLg-username">Susan Carol</span>
          </td>
          <td className="widgetLg-date">12 Sep 2023</td>
          <td className="widgetLg-amount">$220.00</td>
          <td className="widgetLg-status">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLg-tr">
          <td className="widgetLg-user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="user image"
              className="widgetLg-img"
            />
            <span className="widgetLg-username">Susan Carol</span>
          </td>
          <td className="widgetLg-date">12 Sep 2023</td>
          <td className="widgetLg-amount">$220.00</td>
          <td className="widgetLg-status">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLg-tr">
          <td className="widgetLg-user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="user image"
              className="widgetLg-img"
            />
            <span className="widgetLg-username">Susan Carol</span>
          </td>
          <td className="widgetLg-date">12 Sep 2023</td>
          <td className="widgetLg-amount">$220.00</td>
          <td className="widgetLg-status">
            <Button type="Declined" />
          </td>
        </tr>
      </table>
    </div>
  );
}
