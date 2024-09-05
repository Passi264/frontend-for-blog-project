import { Link } from "react-router-dom"
export function BlogCard({post}){
    const date= new Date(post.dateCreated)
    return(
        <div className="post">
          <Link to={`/ReadBlog/${post._id}`} >
            <button> Click to Read</button>
          </Link>
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>
                <h3>{date.toString().slice(4,16)}</h3>
        </div>


         
    )
}