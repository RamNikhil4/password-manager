import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';


import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/footer';

function App() {
  

  return (
    <>
    <Navbar/>
    <div className='min-h-[87vh]'> <Manager/></div>
    
    <Footer/>
    </>
  )
}

export default App
