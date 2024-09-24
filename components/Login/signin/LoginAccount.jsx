import { useContext, useEffect, useRef, useState } from "react";
import { loginUser } from "../../../src/api";
import { useNavigate } from "react-router-dom";
import { Button, VStack, FormControl, FormLabel, Input, Box, Flex, Heading, Text } from "@chakra-ui/react";
import DataContext from "../../../src/DataContext";


export function LoginAccount() {
    const { updateLog } = useContext(DataContext)
    const userRef = useRef()
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    
    useEffect(()=>{
        userRef.current.focus()
    },[])


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
                navigate("/");  // Navigate to Home after successful login
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
        <section>
                <Box py='2rem' px='1rem'>
                    <Box py='1rem'>
                        <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'  fontSize='2rem' fontWeight='600'>Log in</Heading>
                        <Text fontSize='1rem' fontWeight='300' >Welcome back, looks like a begin to something great.</Text>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <VStack gap='2rem' py='1rem'>
                            <FormControl>
                                 <FormLabel>
                                    Email or Username
                                </FormLabel>
                                 <Input ref={userRef}  variant={user.email ? 'filled' : 'flushed'} type="text" required onChange={handleClick} name="email"  />
                             </FormControl>

                             <FormControl>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <Input type="password"  variant={user.password ? 'filled' : 'flushed'} required onChange={handleClick} name="password"  />
                            </FormControl>
                            <Button colorScheme="pink" width='100%' type='submit' isDisabled={false}>Sign in</Button>
                        </VStack>
                    </form>
                </Box>
        </section>
    );
}

