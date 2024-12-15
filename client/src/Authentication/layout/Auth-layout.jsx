import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"
// import Footer from "../component/Footer"

const AuthLayout = () => {
  return (
    <>
     <Navbar />
     <>
      <Outlet />
     </>
     {/* <Footer /> */}
    </>
  )
}

export default AuthLayout