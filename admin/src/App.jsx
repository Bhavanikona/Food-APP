import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import Order from './Pages/Orders/Order'
import List from './Pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const App = () => {
  const url="https://food-app-admin-ytp0.onrender.com";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr></hr>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Order url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
