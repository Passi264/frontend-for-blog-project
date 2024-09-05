import { getPost } from "../src/api"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getImage } from "../src/api"
export function ReadBlog(){
    const [post,setPost]= useState([])
    let params = useParams()
    let id=params.id

    const navigate= useNavigate()

    useEffect(()=>{
        async function postcoming(){
        const data = await getPost(id)
        console.log(data)
        setPost(data)
        }
        postcoming()
    },[] )
        
    const date= new Date(post.dateCreated)
       
    return(
        <>
        <button onClick={()=>navigate(-1)}> Go back </button>
        <h1>{post.title}</h1>
        <h2>{post.description}</h2>
        <img src={post.image?.data}></img>
        <h3>{date.toString().slice(4,16)}</h3>
        <p>{post.content}</p>

        </>
    )
}