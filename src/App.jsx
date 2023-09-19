import Navbar from "./components/Nav/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./app.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
