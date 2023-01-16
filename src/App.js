import { Box, Container } from '@mui/system'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Finalscreen from './components/Finalscreen'
import Questions from './components/Questions'
import Settings from './components/Settings'
import Signup from './components/Signup'
import Login from './components/Login'
import { Navigate } from 'react-router-dom'
import Protected from './components/Protected'
import Logout from './components/Logout'
import Loading from './components/Loading'


const App = () => {

  const user = localStorage.getItem('token');
  
  return (

    <div className='containerX'>
   <Container>
    <div>
     <Routes>

         <Route exact path='/' element={<Loading />} />
         <Route exact path="/signup" element={<Signup/>} />
         <Route exact path="/login" element={ <Login/>} />
         <Route path='/home' element={user == null? <Login/>  : <Settings/>} />
         <Route exact path='/questions' element={user == null? <Login/>  : <Questions/> }/>
         <Route exact path='/score' element={user == null? <Login/>  : <Finalscreen/>} />
        </Routes>  
      </div>
      </Container>
    </div>

  )
}

export default App

