import { useState } from "react";
import { createChallenge } from "../src/api";

export function CreateChallenge(){
    const [challenge,setChallenge] = useState({
        name: "",
        description:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        const feed = await createChallenge(challenge)
        console.log(feed)
    }
    function handleClick(e){
        setChallenge({...challenge, [e.target.name]: e.target.value})
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>Enter your challenge</label>
            <input type="text" onChange={handleClick} placeholder="enter ur challenge" required name="name"></input>
            <label>Enter your description</label>
            <input type="text" onChange={handleClick} placeholder="enter ur description" required name="description"></input>
            <button type="submit">Click here for creating ur challenge</button>
        </form>
        </>
    )
}