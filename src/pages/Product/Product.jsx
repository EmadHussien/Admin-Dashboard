import { Link } from "react-router-dom";
import "./Product.css";
import Chart from "../../components/Chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";

export default function Product() {
  return (
    <div className="product">
      <div className="product-title-container">
        <h1 className="product-title">Product</h1>
        <Link to="/new-product" className="product-add-btn">
          Create
        </Link>
      </div>
      <div className="product-top">
        <div className="product-top-left">
          <Chart
            data={productData}
            datakey={"Sales"}
            title="Sales Performance"
          />
        </div>

        <div className="product-top-right">
          <div className="product-info-top">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="product-info-img"
            />
            <span className="product-name">Apple Airpods</span>
          </div>
          <div className="product-info-bottom">
            <div className="product-info-item">
              <span className="product-info-key">ID:</span>
              <span className="product-info-value">123</span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key">Sales:</span>
              <span className="product-info-value">5123</span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key">Active:</span>
              <span className="product-info-value">Yes</span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key">In Stock:</span>
              <span className="product-info-value">No</span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <form className="product-form">
          <div className="product-form-left">
            <label>Product Name</label>
            <input type="text" placeholder="Apple AirPod" />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="product-form-right">
            <div className="product-upload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="product-upload-img"
              />
              <label htmlFor="file">
                <PublishIcon className="upload-icon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="product-form-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
