import { Navbar } from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Footer from "./Footer"
export function Layout(){
const navigate= useNavigate()
let obj = sessionStorage.getItem("User")
useEffect(()=>{
        if(!obj){
            navigate("./")
        }
    },[obj])

return(
    <>
       <Navbar/>
       <Outlet/>
       <Footer />
    </>
)
}