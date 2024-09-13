import { Card, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Box } from "@chakra-ui/react"
import { CreateAccount } from "../components/CreateAccount"
import { LoginAccount } from "../components/LoginAccount"
import { useState } from "react"
export function Landing(){
    
    return(
            <Flex height='100dvh' align='center' justify='center'>
                <Box p='2dvh 2dvw' boxShadow='dark-lg' borderRadius='1dvw'>
                        <Tabs isFitted variant='enclosed' >
                            <TabList>
                                <Tab bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'>Already a User?</Tab>
                                <Tab bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >Create an Account</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel >
                                    <LoginAccount />
                                </TabPanel>
                                <TabPanel>
                                    <CreateAccount />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                </Box>
            </Flex>
    )
}