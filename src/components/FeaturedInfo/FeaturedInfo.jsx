import "./FeaturedInfo.css";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

export default function FeaturedInfo() {
  return (
    <div className="featured-container">
      <div className="featured-item">
        <span className="featured-title">Revenue</span>
        <div className="featured-money-container">
          <span className="featured-money">$2,125</span>
          <span className="feature-money-rate">
            -11.4
            <ArrowDownwardOutlinedIcon className="featured-icon negative" />
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
