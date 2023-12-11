import { Link } from "react-router-dom";
import "./Product.css";
import Chart from "../../components/Chart/Chart";
import PublishIcon from "@mui/icons-material/Publish";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { editProduct, getProducts } from "../../Redux/ProductSlice";
import useUserRequests from "../../Utils/useUserRequests";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Utils/Firebase";

export default function Product() {
  const { error, fulfilled } = useSelector((state) => state.Product);
  const [showSuccessMessage, setShowSuccessMessage] = useState("init");

  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    price: "",
    inStock: true,
  });
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const dispatch = useDispatch();
  const [productStats, setProductStats] = useState([]);
  const { userRequests } = useUserRequests();
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.Product.products?.find((p) => p.id === productId)
  );

  useEffect(() => {
    if (fulfilled) {
      setUpdatedProduct({
        title: "",
        price: "",
        inStock: true,
      });
    }
  }, [fulfilled]);
  useEffect(() => {
    async function fetchProductStats() {
      try {
        const res = await userRequests.get(
          "/orders/income?productId=" + productId,
          {
            withCredentials: true,
          }
        );
        const list = res.data.sort((a, b) => {
          return a.month - b.month;
        });
        list.map((item) => {
          setProductStats((prev) => [
            ...prev,
            { name: Months[item.month - 1], Sales: item.totalIncome },
          ]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProductStats();
  }, []);

  useEffect(() => {
    if (!product) {
      dispatch(getProducts());
    }
  }, []);
  const [file, setFile] = useState();

  function handleChange(e) {
    setUpdatedProduct((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "inStock" && e.target.value === "true"
          ? true
          : e.target.name === "inStock" && e.target.value === "false"
          ? false
          : e.target.name === "price"
          ? parseInt(e.target.value) || 0
          : e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      setShowSuccessMessage("start");

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          // Handle unsuccessful uploads
          console.log("Error uploading image", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newUpdatedProduct = {
              ...updatedProduct,
              img: downloadURL,
            };
            //   console.log(newUpdatedProduct);
            dispatch(
              editProduct({
                newProduct: newUpdatedProduct,
                userRequests,
                productId,
              })
            )
              .then(() => {
                setShowSuccessMessage("uploaded");
                setTimeout(() => {
                  setShowSuccessMessage("init");
                }, 500);
              })
              .catch((error) => {
                console.error("Error deleting user:", error);
              });
          });
        }
      );
    } else {
      //  console.log(updatedProduct);
      setShowSuccessMessage("start");
      dispatch(
        editProduct({ newProduct: updatedProduct, userRequests, productId })
      )
        .then(() => {
          setShowSuccessMessage("uploaded");
          setTimeout(() => {
            setShowSuccessMessage("init");
          }, 500);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  }
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
          {productStats.length >= 1 ? (
            <Chart
              data={productStats}
              datakey={"Sales"}
              title="Sales Performance"
            />
          ) : (
            "There's No Sales Data"
          )}
        </div>

        <div className="product-top-right">
          <div className="product-info-top">
            <img
              src={product?.img}
              alt="product image"
              className="product-info-img"
            />
            <span className="product-name">{product?.name}</span>
          </div>
          <div className="product-info-bottom">
            <div className="product-info-item">
              <span
                className="product-info-key"
                style={{ paddingRight: "10px" }}
              >
                ID:
              </span>
              <span className="product-info-value">{product?.id}</span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key">Price:</span>
              <span className="product-info-value">{product?.price}</span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key" style={{ fontSize: "15px" }}>
                Monthly Revenue:
              </span>
              <span className="product-info-value">
                {productStats.length > 1
                  ? "$" + productStats[1]?.Sales
                  : productStats.length === 1
                  ? "$" + productStats[0]?.Sales
                  : "no data"}
              </span>
            </div>
            <div className="product-info-item">
              <span className="product-info-key">In Stock:</span>
              <span className="product-info-value">
                {product?.stock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="product-form-left">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={product?.name}
              required
              value={updatedProduct.title}
              onChange={handleChange}
            />
            <label style={{ marginTop: "5px" }}>Price</label>
            <input
              name="price"
              type="number"
              placeholder={product?.price}
              required
              value={updatedProduct.price.toString()}
              onChange={handleChange}
            />
            <label style={{ marginTop: "5px" }}>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              value={updatedProduct.inStock}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="product-form-right">
            <div className="product-upload">
              <img
                src={product?.img}
                alt="product image"
                className="product-upload-img"
              />
              <label htmlFor="file">
                <PublishIcon className="upload-icon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="product-form-btn">Update</button>
          </div>
        </form>
        {showSuccessMessage === "start" && (
          <p style={{ color: "blue", textAlign: "center", fontSize: "22px" }}>
            Loading...
          </p>
        )}
        {showSuccessMessage === "uploaded" && (
          <p style={{ color: "green", textAlign: "center", fontSize: "22px" }}>
            Product has been Updated successfully
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "22px" }}>
            Error try again later...
          </p>
        )}
      </div>
    </div>
  );
}
