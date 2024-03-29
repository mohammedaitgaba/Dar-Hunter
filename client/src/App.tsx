import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Home from "./views/pages/Home"
import Post from "./views/pages/SinglePost";
import Navbar from "./components/global/Navbar"
import Footer from "./components/global/Footer"
import AccountUser from "./views/user/DushboardUser"
import ProtectedRoutes from "./utils/protected/ProtectedUserRoutes";
import AddPost from "./views/Post/AddPost";
import UpdatePost from "./views/pages/UpdatePost";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={[<Home/>, <Footer/>]}/>
        <Route path="/posts/:id" element={[<Post/>, <Footer/>]}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/AddPost" element={[<AddPost/>, <Footer/>]}/>
          <Route path="/updatePost/:id" element={[<UpdatePost/>, <Footer/>]}/>
          <Route path="/account/*" element={<AccountUser/>}/>
        </Route>     
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default App