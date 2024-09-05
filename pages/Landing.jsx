import { CreateAccount } from "../components/CreateAccount"
import { LoginAccount } from "../components/LoginAccount"
import { useState } from "react"
export function Landing(){
    const [view,setView] = useState(0)
    return(
        <>
        {!view?
            <>
                <LoginAccount/>
                <button onClick={()=>setView(!view)}>Click to login account</button>
            </> : 
            <>
                <CreateAccount/>
                <button onClick={()=>setView(!view)}>Click to create account</button>
            </>
        }
        </>
    )
}