import { useEffect, useState } from "react";
import "./NewProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import useUserRequests from "../../Utils/useUserRequests";
import { createProduct } from "../../Redux/ProductSlice";

export default function NewProduct() {
  const { isLoading, error, fulfilled } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
  const { userRequests } = useUserRequests();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    inStock: true,
    size: "",
    categories: "",
    color: "",
  });
  const [file, setFile] = useState();
  function handleChange(e) {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "inStock" && e.target.value === "true"
          ? true
          : e.target.name === "inStock" && e.target.value === "false"
          ? false
          : e.target.name === "price"
          ? parseInt(e.target.value) || 0
          : e.target.name === "color"
          ? e.target.value.split(",")
          : e.target.name === "size"
          ? e.target.value.split(",")
          : e.target.name === "categories"
          ? e.target.value.split(",")
          : e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        // Handle unsuccessful uploads
        console.log("Error uploading image", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...productData,
            img: downloadURL,
          };
          //dispatch createProduct
          dispatch(createProduct({ product, userRequests }));
        });
      }
    );
  }
  useEffect(() => {
    if (fulfilled) {
      setProductData({
        title: "",
        description: "",
        price: "",
        inStock: true,
        size: "",
        categories: "",
        color: "",
      });
      setFile('');
    }
  }, [fulfilled]);
  return (
    <div className="new-product">
      <h1 className="addProductTitle">New Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-flex">
          <div>
            <div className="add-product-item">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <div className="add-product-item">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={productData?.title}
                placeholder="Jake Guitar Vintage"
                required
              />
            </div>
            <div className="add-product-item">
              <label>Description</label>
              <textarea
                style={{
                  resize: "none",
                  width: "300px",
                  height: "150px",
                  padding: "10px",
                }}
                name="description"
                onChange={handleChange}
                value={productData?.description}
                placeholder="This shirt is perfect for music enthusiasts."
                required
              />
            </div>

            <div className="add-product-item">
              <label>In Stock</label>
              <select
                name="inStock"
                id="idStock"
                onChange={handleChange}
                value={productData.inStock}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          <div>
            <div className="add-product-item">
              <label>Price</label>
              <input
                type="number"
                placeholder="$60"
                name="price"
                value={productData.price.toString()}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-product-item">
              <label>Colors (red, blue, yellow)</label>
              <input
                type="text"
                placeholder="red, blue, yellow"
                name="color"
                value={productData.color}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-product-item">
              <label>Categories (Shirts, Loungwear, Jackets)</label>
              <input
                type="text"
                placeholder="Shirts, Loungwear, Jackets"
                name="categories"
                value={productData.categories}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-product-item">
              <label>Sizes (XS, SM,M,L,XL)</label>
              <input
                type="text"
                placeholder="XS, SM, M, L, XL"
                onChange={handleChange}
                value={productData.size}
                name="size"
                required
              />
            </div>
          </div>
        </div>
        <button className="add-product-btn">Create</button>
      </form>
      {isLoading && (
        <p style={{ color: "blue", textAlign: "center", fontSize: "22px" }}>
          Loading...
        </p>
      )}
      {fulfilled && (
        <p style={{ color: "green", textAlign: "center", fontSize: "22px" }}>
          Product has been added successfully
        </p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "22px" }}>
          Error try again later...
        </p>
      )}
    </div>
  );
}
