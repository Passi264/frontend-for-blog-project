import { Card, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Box, SimpleGrid, Text, Button } from "@chakra-ui/react"
import { CreateAccount } from "../components/Login/signup/CreateAccount"
import { LoginAccount } from "../components/Login/signin/LoginAccount"
import { useState } from "react"
import SignUp from "../components/Login/signup/SignUp"
export function Landing(){


    const [accountHolder, setAccountHolder] = useState(true)

    const handleFlip = () => setAccountHolder(!accountHolder)

    return(
        <SimpleGrid templateColumns='repeat(2, 1fr)'>
            <Box py={accountHolder ? '5rem' : '2.5rem'}>
                {accountHolder ? <LoginAccount /> : <SignUp />}
                {accountHolder ? <Text textAlign='center'>Don't have an account? &nbsp; <Button colorScheme="pink" onClick={handleFlip} variant='link'>Create an account</Button></Text> : <Text onClick={handleFlip} textAlign='center'>Already have an account? &nbsp; <Button colorScheme="pink" variant='link'>Log in</Button></Text> }
            </Box>
            
        </SimpleGrid>
    )
}