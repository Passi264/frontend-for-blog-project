import {Link} from "react-router-dom"
import { pageData } from "./pagedata"
import { useNavigate } from "react-router-dom"
export function Navbar(){
  const navigate= useNavigate()
  function handleLogout(){
    sessionStorage.removeItem("User")
    navigate("./")
  }
  return(
        <div className="navbar">
          {pageData.map((page)=>{
            return(
                <Link className="navitem" to={page.path}><button>{page.name}</button></Link>
            )
          }
        )}
        <button onClick={handleLogout}>LOG OUT</button>
        </div>
    )
    }