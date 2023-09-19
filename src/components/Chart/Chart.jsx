/* eslint-disable react/prop-types */
import "./Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, datakey, grid }) {
  return (
    <div className="chart">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={"name"} stroke="#5550bd" />
          <Line type={"monotone"} dataKey={datakey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid strokeDasharray={"5 5"} stroke="#e0dfdf" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
