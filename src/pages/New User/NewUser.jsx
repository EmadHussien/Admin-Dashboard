import { useEffect, useState } from "react";
import "./NewUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../Redux/UserSlice";

export default function NewUser() {
  const { error, fulfilled } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [passErr, setPassErr] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState("init");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  function handleChange(e) {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    setPassErr("");
    e.preventDefault();
    if (user.password !== user.confirmedPassword) {
      setPassErr("Please enter matching passwords");
    } else {
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
            const newUser = {
              ...user,
              img: downloadURL,
            };
            dispatch(createUser(newUser))
              .then(() => {
                setShowSuccessMessage("uploaded");
                setTimeout(() => {
                  setShowSuccessMessage("init");
                }, 1000);
              })
              .catch((error) => {
                console.error("Error deleting user:", error);
              });
          });
        }
      );
    }
  }
  useEffect(() => {
    if (fulfilled) {
      setUser({ username: "", email: "", password: "", confirmedPassword: "" });
    }
  }, [fulfilled]);
  return (
    <div className="new-user">
      <h1 className="new-user-title">New User</h1>
      <form className="new-user-Form" onSubmit={handleSubmit}>
        <div className="add-product-item">
          <label>Image</label>
          <input
            type="file"
            id="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="new-user-item">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            required
            onChange={handleChange}
            name="username"
            value={user.username}
          />
        </div>
        <div className="new-user-item">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            required
            onChange={handleChange}
            value={user.email}
            name="email"
          />
        </div>
        <div className="new-user-item">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            onChange={handleChange}
            value={user.password}
            name="password"
          />
        </div>
        <div className="new-user-item">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="password"
            name="confirmedPassword"
            required
            onChange={handleChange}
            value={user.confirmedPassword}
          />
        </div>
        {passErr && (
          <p style={{ color: "red", margin: "10px 0" }}> {passErr} </p>
        )}
        <button className="new-user-button">Create</button>
        {showSuccessMessage === "start" && (
          <p style={{ color: "blue", textAlign: "center", fontSize: "22px" }}>
            Loading...
          </p>
        )}
        {showSuccessMessage === "uploaded" && (
          <p style={{ color: "green", textAlign: "center", fontSize: "22px" }}>
            New User has been added successfully
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "22px" }}>
            Username or Email is already taken
          </p>
        )}
        {/*  <div className="new-user-item">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="new-user-item">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="new-user-item">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="new-user-item">
          <label>Gender</label>
          <div className="new-user-gender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="new-user-item">
          <label>Active</label>
          <select className="new-user-select" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
 */}{" "}
      </form>
    </div>
  );
}
