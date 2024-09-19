import { useContext, useState } from "react";
import { loginUser } from "../src/api";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Center, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import DataContext from "../src/dataContext";


export function LoginAccount() {
    const { updateLog } = useContext(DataContext)
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
            
            console.log("LoginUser response:", feed);  // Debug log for response

            if (feed) {
                console.log("Login successful, storing user and navigating to /Home");
                sessionStorage.setItem("User", feed);  // Store user data in session storage
                updateLog()
                navigate("/Home");  // Navigate to Home after successful login
            } else {
                console.log("Login failed: Incorrect credentials or issue with login");
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);  // Log any errors from the login attempt
            alert("An error occurred during login. Please try again.");
        }
    }

    function handleClick(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
        // Debug input changes
    }

    return (
        <>
        <form onSubmit={handleSubmit} >
            <Card width='50dvw' boxShadow='none' borderRadius='1dvw' px='2dvw' size='lg'>
                <CardBody py='2dvh'>
                    <Box py='1dvh'>
                        <FormControl>
                            <FormLabel>
                                Username or Email
                            </FormLabel>
                            <Input type="text" required onChange={handleClick} name="email" placeholder="blackdino@snail.com" />
                        </FormControl>
                    </Box>
                    <Box py='1dvh'>
                        <FormControl>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <Input type="password" required onChange={handleClick} name="password" placeholder="ilovethatsnail" />
                        </FormControl>
                    </Box>
                    <Box py='2dvh'>
                        <Center>
                            <Button boxShadow='md' px='5dvh' type="submit">Log in</Button>
                        </Center>
                    </Box>
                </CardBody>
            </Card>
        </form>


            {/* <form onSubmit={handleSubmit}>
                <label>Enter your email</label>
                <input 
                    type="text" 
                    onChange={handleClick} 
                    placeholder="enter your email" 
                    required 
                    name="email"
                />
                
                <label>Enter your password</label>
                <input 
                    type="password" 
                    onChange={handleClick} 
                    placeholder="enter your password" 
                    required 
                    name="password"
                />
                
                <button type="submit">Click here to login</button>
            </form> */}
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