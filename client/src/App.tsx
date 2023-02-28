import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./views/pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AccountUser from "./views/pages/DushboardUser"
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
    </>
  )
}

export default App