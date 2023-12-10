import "./FeaturedInfo.css";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { useEffect, useState } from "react";
import useUserRequests from "../../Utils/useUserRequests";

export default function FeaturedInfo() {
  const { userRequests } = useUserRequests();
  const [revenue, setRevenue] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    async function fetchIncome() {
      try {
        const res = await userRequests.get("/orders/income", {
          withCredentials: true,
        });
        const list = res.data.sort((a, b) => {
          return a.month - b.month;
        });
        setRevenue(list[1].totalIncome);
        setPercentage(
          (res.data[1].totalIncome / res.data[0].totalIncome) * 100 - 100
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchIncome();
  }, []);
  return (
    <div className="featured-container">
      <div className="featured-item">
        <span className="featured-title">Revenue</span>
        <div className="featured-money-container">
          <span className="featured-money">${revenue}</span>
          <span className="feature-money-rate">
            %
            {Math.floor(percentage) > 0
              ? Math.floor(percentage)
              : Math.floor(percentage) * -1}
            {percentage > 0 ? (
              <ArrowUpwardOutlinedIcon className="featured-icon" />
            ) : (
              <ArrowDownwardOutlinedIcon className="featured-icon negative" />
            )}
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>

      <div className="featured-item">
        <span className="featured-title">Sales</span>
        <div className="featured-money-container">
          <span className="featured-money">$4,525</span>
          <span className="feature-money-rate">
            -2.5
            <ArrowDownwardOutlinedIcon className="featured-icon negative" />
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>

      <div className="featured-item">
        <span className="featured-title">Cost</span>
        <div className="featured-money-container">
          <span className="featured-money">$5,125</span>
          <span className="feature-money-rate">
            +21.4
            <ArrowUpwardOutlinedIcon className="featured-icon" />
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>
    </div>
  );
}
