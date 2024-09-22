import { Card, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Box, SimpleGrid } from "@chakra-ui/react"
import { CreateAccount } from "../components/Login/signup/CreateAccount"
import { LoginAccount } from "../components/Login/signin/LoginAccount"
import { useState } from "react"
import SignUp from "../components/Login/signup/SignUp"
export function Landing(){

    return(
        <SimpleGrid templateColumns='repeat(2, 1fr)'>
            <SignUp />
        </SimpleGrid>
            // <Flex py='7rem' align='center' justify='center'>
            //     <Box p='2dvh 2dvw' boxShadow='dark-lg' borderRadius='1dvw'>
            //             <Tabs isFitted variant='enclosed' >
            //                 <TabList>
            //                     <Tab bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'>Already a User?</Tab>
            //                     <Tab bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >Create an Account</Tab>
            //                 </TabList>
            //                 <TabPanels>
            //                     <TabPanel >
            //                         <LoginAccount />
            //                     </TabPanel>
            //                     <TabPanel>
            //                         <CreateAccount />
            //                     </TabPanel>
            //                 </TabPanels>
            //             </Tabs>
            //     </Box>
            // </Flex>
    )
}