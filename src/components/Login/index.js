import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { motion } from 'framer-motion'

const Login = () => {
	
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/home";
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

	return (
        
	    <motion.div initial={{ opacity:0, scale: 0}} animate={{opacity:1, scale:1}} transition={{duration:1, ease: [0, 0.9, 0.2, 1] }}  className={styles.formC}>
			<motion.div className={styles.login_form_container}>
				<motion.div initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:1.5,

				 }}   className={styles.left}>
					<form className={styles.form_container} autoComplete="off" onSubmit={handleSubmit}>

<h2 className={styles.hdnn}>Login To  Your Account</h2>
						
                  <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>

 
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
                     className={styles.input}
						/>
                  
						{error && <div className={styles.error_msg}>{error}</div>}
						
                  <button type="submit" className={styles.btn}>
							Sing In
						</button>
					</form>
				</motion.div>
				<motion.div initial={{x:"100vw"}} animate={{x:0}} transition={{duration:1.5}}  className={styles.right}>
					<h1 className={styles.heads}>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.button}>
							Sing Up
						</button>
					</Link>
				</motion.div>
			</motion.div>
			</motion.div>
	);
};

export default Login;