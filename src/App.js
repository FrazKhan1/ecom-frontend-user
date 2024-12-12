import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./layouts/auth";
import User from "./layouts/user";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector((state) => state.loader);
  console.log("loading", loading);
  const styleForSpiiner = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "9999",
    backgroundColor: "rgba(0,0,0,0.74)",
  };

  return (
    <>
      {loading && (
        <div className="spinner" style={styleForSpiiner}>
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="user/*" element={<User />} />
        <Route path="/" element={<Navigate to="/user/home" />} />
      </Routes>
    </>
  );
};

export default App;
