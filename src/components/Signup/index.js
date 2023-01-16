import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };



  const container = {
    hidden: { y: "-100vh" },
    show: {
    y: "0",
    transition: {
    
    duration: 2,
    },
    },
    };

  const left = 
  {
    hidden: { x:"-100vw" },
    show: {
      x:0,
      transition: {
        duration:1.6,
        delay:0.5
      }
    }
  }

  const right = 
  {
    hidden: { x:"100vw" },
    show: {
      x:0,
      transition: {
        duration:1.6,
        delay:0.5
      }
    }
  }

  return (

    <motion.div variants={container}  initial="hidden" animate="show"
     className={styles.signup_container}>

      <motion.div className={styles.signup_form_container}>

        <motion.div variants={left} initial="hidden" animate="show" className={styles.left}>
          <motion.h1 className={styles.heading}>Welcome Back</motion.h1>
          <Link to="/login">
            <button type="button" className={styles.button}>
              Sign in
            </button>
          </Link>
        </motion.div>
        <motion.div variants={right} initial="hidden" animate="show" className={styles.right}>
          <motion.form 
            className={styles.form_container}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            
            <h1 className={styles.hdngs}>Create Account</h1>
            
            
            <motion.input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <motion.input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <motion.input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <motion.input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.button}>
              Sing Up
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>

  );
};

export default Signup;
