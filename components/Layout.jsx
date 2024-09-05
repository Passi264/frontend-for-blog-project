import { Navbar } from "./navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
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
    </>
)
}