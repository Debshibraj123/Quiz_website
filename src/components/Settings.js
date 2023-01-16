import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SelectField from "./SelectField";
import TextFieldComp from "./TextFieldComp";
import useAxios from "../hooks/useAxios";
import './setting.css';

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box color="success"  mt={40} ml={70}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Some Went Wrong!
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <div className="seting">
      <h1 className="quizHead">My Quiz App</h1>
    <form onSubmit={handleSubmit} className="form">

      <SelectField options={response.trivia_categories} label="Category" className="select" />

      <SelectField options={difficultyOptions} label="Difficulty" className="select" />

      <SelectField options={typeOptions} label="Type" className="select"/>

      <TextFieldComp className="select"/>
      <div className="screen">
        <button className="buttons" type="submit">
          Get Started
        </button>
      </div>
    </form>
    </div>
  );
};

export default Settings;
