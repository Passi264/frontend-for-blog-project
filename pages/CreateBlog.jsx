import { createPost } from "../src/api"
import {useState, useRef} from "react"

export function CreateBlog(){
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const [content,setContent] = useState()
    const [file, setFile] = useState()
    const inputFile = useRef(null)
    const Max_Size = 15000000
    async function handleClick(){
        let object={
            title:title,
            description:description,
            content:content,
            author:null,
            dateCreated: new Date(),
            file: file
        }
        await createPost(object)
    }
    function handleFile(e){
        const file = e.target.files[0]
        console.log(file)
        const fileExtension = file.name.substring(file.name.lastIndexOf("."))
        if ( fileExtension!= ".jpg" && fileExtension != ".png" && fileExtension!= ".jpeg" ){
            alert("file not supported")
            inputFile.current.value=""
            inputFile.current.type = "file"
            return
        }
        if (file.size> Max_Size){
            alert("size exceeded")
            inputFile.current.value=""
            inputFile.current.type = "file"
            return
        }
        setFile(file)
    }
    return(
        <>
        <form onSubmit={handleClick}>
             <label>Enter the title</label>
             <input type="text" onChange={(e)=>setTitle(e.target.value)} maxLength={50} required placeholder="enter the title"></input>
             <label>Enter the description</label>
             <input type="text" onChange={(e)=>setDescription(e.target.value)} maxLength={100} required placeholder="enter the description"></input>
             <label>Enter the content</label>
             <textarea onChange={(e)=>setContent(e.target.value)} maxLength={100000} required placeholder="enter the content"></textarea>
             <label>insert header image</label>
             <input type="file" onChange={handleFile} required ref={inputFile}></input>
             <button type="submit">CLICK HERE TO CREATE YOUR POST</button>
        </form>
        </>
    )
}