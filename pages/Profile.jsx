import {useState, useEffect} from "react"
import { getPosts } from "../src/api"
import * as jwt_decode from "jwt-decode";
import { BlogCard } from "../components/BlogCard";
export function Profile(){
    const [num,setPost] = useState([])
    const [user,setUser] = useState({})
    
    useEffect(()=>{
        async function loadPosts(){
            const token = sessionStorage.getItem("User")
            const decodeUser = jwt_decode.jwtDecode(token)
            const allPosts = await getPosts()
            const filteredpost= allPosts.filter((post)=>post.author == decodeUser._id)
            setPost(filteredpost)
            setUser(decodeUser)
            console.log(num)
        }
        loadPosts()
    },[])
    return(
        <>
         <label>Name</label>
         <h2>{user.name}</h2>
         <label>Email</label>
         <h2>{user.email}</h2>
         <label>join date</label>
         <h2>{user.joinDate}</h2>
         {console.log(num)}
         {num.map((post)=>{
            return(
            <>
            <BlogCard post={post}/>
            </>
            )
         }
         )
         }
        </>
    )
}