import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Home from "./views/pages/Home"
import Navbar from "./components/global/Navbar"
import Footer from "./components/global/Footer"
import AccountUser from "./views/user/DushboardUser"
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={[<Home/>, <Footer/>]}/>
        <Route path="/account/*" element={<AccountUser/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default App