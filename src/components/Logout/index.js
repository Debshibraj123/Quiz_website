import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";



const Logout = () => {

   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="logout">
      <button className="animated-border-buttons" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
