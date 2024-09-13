import { useState } from "react";
import { createUser } from "../src/api";
import { Button, Card, CardBody, CardFooter, Center, FormControl, FormLabel, Input, Box, Grid, SimpleGrid } from "@chakra-ui/react";

export function CreateAccount(){
    const [user,setUser] = useState({
        name: "",
        email:"",
        password:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        const feed = await createUser(user)
        console.log(feed)
        if (feed.data.message == "the email is taken"){
            alert("account cannot be created")
        }
        else{
            "not created"
        }
    }
    function handleClick(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(

        <form onSubmit={handleSubmit} >
            <Card width='50dvw' boxShadow='none' borderRadius='1dvw' px='2dvw' size='lg'>
                <CardBody py='2dvh'>
                    <SimpleGrid templateColumns='repeat(2, 1fr)' gap='1dvw'>
                        <Box py='1dvh'>
                            <FormControl>
                                <FormLabel>
                                    Your Name
                                </FormLabel>
                                <Input type="text" required onChange={handleClick} name="name" placeholder="Black Dino" />
                            </FormControl>
                        </Box>
                        <Box py='1dvh'>
                            <FormControl>
                                <FormLabel>
                                Your Email
                                </FormLabel>
                                <Input type="email" required onChange={handleClick} name="email" placeholder="blackdino@snail.com" />
                            </FormControl>
                        </Box>
                    </SimpleGrid>
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
                            <Button boxShadow='md' px='5dvh' type="submit">Sign up</Button>
                        </Center>
                    </Box>
                </CardBody>
            </Card>
        </form>

        // <>
        // <form onSubmit={handleSubmit}>
        //     <label>Enter your name</label>
        //     <input type="text" onChange={handleClick} placeholder="enter ur name" required name="name"></input>
        //     <label>Enter your email</label>
        //     <input type="text" onChange={handleClick} placeholder="enter ur email" required name="email"></input>
        //     <label>Enter your password</label>
        //     <input type="password" onChange={handleClick} placeholder="enter ur password" required name="password"></input>
        //     <button type="submit">Click here for creating ur account</button>
        // </form>
        // </>
    )
}