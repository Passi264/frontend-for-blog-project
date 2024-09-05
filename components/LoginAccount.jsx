import { useState } from "react";
import { loginUser } from "../src/api";
import { useNavigate } from "react-router-dom";
import { Home } from "../pages/Home";
import axios from "axios";
export function LoginAccount(){
    const navigate= useNavigate()
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        const feed = await loginUser(user)
        if (feed){
            // sessionStorage.setItem("User",feed)
            navigate("/Home")
        } else{
            alert("login failed")
        }

        // if (feed){
        //     // sessionStorage.setItem("User",feed)
        //     // navigate("/Home")
        // } else{
        //     alert("login failed")
        // }

    }
    function handleClick(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>Enter your email</label>
            <input type="text" onChange={handleClick} placeholder="enter ur email" required name="email"></input>
            <label>Enter your password</label>
            <input type="password" onChange={handleClick} placeholder="enter ur password" required name="password"></input>
            <button type="submit">Click here to login</button>
        </form>
        </>
    )
}