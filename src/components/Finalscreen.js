import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import Logout from "./Logout";
import { motion } from "framer-motion";
import "./finalscreen.css";

const FinalScreen = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);
  
  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleAmountChange(50));
    navigate("/");
  };

  return (
    <div className="container">
    <motion.div className="main">
      <Logout />
      <motion.h1 className="head" variant="h3" fontWeight="bold" mb={3}>
        Your Final Score Is = {score}
      </motion.h1>
      <button className="animated-border-button" onClick={handleBackToSettings}>
        Restart
      </button>
    </motion.div>
    </div>
  );
};

export default FinalScreen;
