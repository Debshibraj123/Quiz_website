import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import "./question.css";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={40} ml={70}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  const nextQuestion = (e) => {
    const question = response.results[questionIndex];
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    }
    else{
      navigate("/score");
    }
  };

  const prevQuestion = (e) => {
    const question = response.results[questionIndex];
    if (questionIndex + 1 > 0 && questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex - 1);
      
    } else {
      navigate("/");
    }
  };

  const container = {
    hidden: { opacity:0 },
    show: {
      opacity:1,
      transition: {
        delayChildren: 0.5,
        duration:1

      }
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 2,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]}} className="question-box">
      <motion.h1 className="hding">Questions {questionIndex + 1}</motion.h1>
      <p className="para">{decode(response.results[questionIndex].question)}</p>
      {options.map((data, id) => (
        <motion.div className="options" key={id}>
          <button
            className="option"
            onClick={handleClickAnswer}
            variant="contained"
          >
            {decode(data)}
          </button>
        </motion.div>
      ))}
      <div className="prevNext">
        <button  onClick={prevQuestion}>Back</button>
        <button onClick={nextQuestion}>Next</button>
      </div>
      <div className="score">
        Score: {score} / {response.results.length}
      </div>
    </motion.div>
  );
};

export default Questions;
