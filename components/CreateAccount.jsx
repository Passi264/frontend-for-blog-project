import { useState } from "react";
import { createUser } from "../src/api";

export function CreateAccount(){
    const [user,setUser] = useState({
        name: "",
        email:"",
        password:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        const feed = await createUser(user)
        console.log(feed)
        if (feed.data.message == "the email is taken"){
            alert("account cannot be created")
        }
        else{
            "not created"
        }
    }
    function handleClick(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>Enter your name</label>
            <input type="text" onChange={handleClick} placeholder="enter ur name" required name="name"></input>
            <label>Enter your email</label>
            <input type="text" onChange={handleClick} placeholder="enter ur email" required name="email"></input>
            <label>Enter your password</label>
            <input type="password" onChange={handleClick} placeholder="enter ur password" required name="password"></input>
            <button type="submit">Click here for creating ur account</button>
        </form>
        </>
    )
}