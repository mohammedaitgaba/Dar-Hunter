import React from 'react'
import { Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const {user}= useSelector((state:any)=>state.auth)    
    return (
    user?.LoggedUser? <Outlet /> : <Navigate to="/"/>
  )
}

export default ProtectedRoutes