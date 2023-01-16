import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion'
import './styles.css'
const Loading = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 100);

    if (count === 100) {
      clearInterval(intervalId);
      navigate('/login');
    }

    return () => clearInterval(intervalId);
  }, [count, navigate]);

  return (
    <AnimatePresence>
    <motion.div  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={{duration:2}}
        className='loader'>
      <p className='loading-text'>Loading... {count}%</p>
    </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
