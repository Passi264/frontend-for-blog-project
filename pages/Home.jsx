import { getPosts } from "../src/api"
import {useState,useEffect} from "react"
import { BlogCard } from "../components/BlogCard"
export function Home(){
    const [post,setPost] = useState([])
    useEffect(()=>{
        async function LoadAllPosts(){
            const data= await getPosts()
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setPost(data)
        }
        LoadAllPosts()
    }
    ,[post])

return(
        <div className="posts">
        {post.map((post)=>{
            return(
                <>
                <BlogCard post={post}/>
                </>
            )
        })}
        </div>
        
 )
}