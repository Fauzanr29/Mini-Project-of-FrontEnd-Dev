import React from "react";
import Header from "./component/header";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/Register"
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';


// Main Aplikasi

// SPA --> single page application 
  // --> konsep [1 index html return banyak page]

const PrivateRoute = () => {
  const auth = sessionStorage.getItem('access_token');

  if(!auth){

    // Kalau tidak ada token re-direct ke path '/' --> login
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />

      {/* Outlet = children */}
      <Outlet />
    </>
  )
}

const App = () =>{
  return (
  <>
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        

        {/* Private Routes */}
        <Route element={<PrivateRoute/>}>
          <Route index path="/dashboard" element={<Dashboard/>} />
          
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<>Not Found</>} />
        
      </Routes>
    </BrowserRouter>
  </>)
}

export default App;