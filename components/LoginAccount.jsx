import { useState } from "react";
import { loginUser } from "../src/api";
import { useNavigate } from "react-router-dom";

export function LoginAccount() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        
        console.log("Form submitted with user:", user);  // Debug log

        try {
            const feed = await loginUser(user);
            
            console.log("Login response:", feed);  // Debug log for loginUser response

            if (feed) {
                console.log("Login successful, navigating to /Home");  // Debug successful login
                navigate("/Home");
            } else {
                console.log("Login failed, invalid credentials");  // Debug failed login
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);  // Log the error
            alert("An error occurred during login. Please try again.");
        }
    }

    function handleClick(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log("Input changed:", { [e.target.name]: e.target.value });  // Debug input changes
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter your email</label>
                <input type="text" onChange={handleClick} placeholder="enter your email" required name="email" />
                <label>Enter your password</label>
                <input type="password" onChange={handleClick} placeholder="enter your password" required name="password" />
                <button type="submit">Click here to login</button>
            </form>
        </>
    );
}




// import { useState } from "react";
// import { loginUser } from "../src/api";
// import { useNavigate } from "react-router-dom";
// import { Home } from "../pages/Home";
// import axios from "axios";
// export function LoginAccount(){
//     const navigate= useNavigate()
//     const [user,setUser] = useState({
//         email:"",
//         password:""
//     })
//     async function handleSubmit(e) {
//         e.preventDefault();
        
//         try {
//             const feed = await loginUser(user);
            
//             if (feed) {
//                 // sessionStorage.setItem("User", JSON.stringify(feed)); // Optional: Store user data in session storage
//                 navigate("/Home");
//             } else {
//                 alert("Login failed. Please check your credentials.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("An error occurred during login. Please try again.");
//         }
    
    

//         // if (feed){
//         //     // sessionStorage.setItem("User",feed)
//         //     // navigate("/Home")
//         // } else{
//         //     alert("login failed")
//         // }

//     }
//     function handleClick(e){
//         setUser({...user, [e.target.name]: e.target.value})
//     }

//     return(
//         <>
//         <form onSubmit={handleSubmit}>
//             <label>Enter your email</label>
//             <input type="text" onChange={handleClick} placeholder="enter ur email" required name="email"></input>
//             <label>Enter your password</label>
//             <input type="password" onChange={handleClick} placeholder="enter ur password" required name="password"></input>
//             <button type="submit">Click here to login</button>
//         </form>
//         </>
//     )
// }