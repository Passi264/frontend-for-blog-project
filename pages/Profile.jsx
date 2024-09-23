import {useState, useEffect, useContext} from "react"
import { BlogCard } from "../components/BlogCard";
import { Grid, GridItem, SimpleGrid, Box, VStack, Avatar, Flex, Tag, Heading, Text, ButtonGroup, Button, Divider, Badge, Tabs, TabList, Tab, TabPanels, TabPanel, Center } from "@chakra-ui/react";
import { format } from 'date-fns'
import DataContext from "../src/dataContext";
import Heart from "../components/uti/Heart";
import Notifications from "../components/uti/Notifications";
import { useNavigate } from "react-router-dom";

export function Profile(){

    const {posts, user, userLikes, login} = useContext(DataContext)

    const naviagte = useNavigate()

    const [joinDate, setDate] = useState()

    useEffect(()=>{
        const token = sessionStorage.getItem("User")
        if(!token){
            naviagte('/login')
        }
    },[login])

    useEffect(()=>{
        if(user){
        const readableDate = new Date(user?.joinDate);
            if (!isNaN(readableDate.getTime())) {
                setDate(format(readableDate, 'd MMM yyyy'));
            } else {
                console.warn('Invalid join date');
            }}
    }, [user])
    

    return(
        <Grid templateColumns='repeat(6, 1fr)' gap='1dvw' >
            <GridItem colSpan='2' p='1.5dvw'  >
                <VStack align='center' py='1dvh' px='2dvw' >
                        <Flex align='center' >
                            <Avatar size='xl' name={user?.name} src={user?.image} />
                        </Flex>
                        <Box>
                            <Flex py='.5dvh' align='center' justify='center'>
                                <Heading textAlign='center' fontWeight='500' fontSize='1.5dvw' as='h4' textTransform='capitalize' >{user?.name}</Heading>
                            </Flex>
                            <Flex justify='center'>
                                <Text fontSize='.9dvw'>Joined on: {joinDate}</Text>
                            </Flex>
                            <Flex py='1.5dvh' justify='center' >
                                <ButtonGroup size='sm' colorScheme="cyan" >
                                    <Button color='white' leftIcon={<i className="fa-regular fa-pen-to-square"></i>}>
                                        Update
                                    </Button>
                                    <Button colorScheme="red" leftIcon={<i className="fa-solid fa-trash"></i>}>
                                        Delete Account
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Box>
                        <Divider />
                        <Box py='1.5dvh'>
                            <Flex py='1dvh' justify='space-between'>
                                <Text  fontWeight='500'>Your Email: <Tag  colorScheme="green" >{user?.email}</Tag></Text>
                                <Text fontWeight='500'>Your ID: <Tag  colorScheme="cyan" >{user?._id}</Tag> </Text>
                            </Flex>
                        </Box>
                        <Divider />
                </VStack>
                <Notifications />
            </GridItem>
            <GridItem colSpan='4' p='1.5dvw' >
                <Tabs isLazy variant='soft-rounded' colorScheme='green' >
                    <TabList>
                        <Tab>Your Posts</Tab>
                        <Tab>Liked Posts</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p='0' py='2dvh' >
                            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'  >
                                {posts?.filter((post)=>post.author == user._id)?.map( (e, index) => {
                                    return(
                                        <BlogCard post={e} key={index} />
                                )})}
                            </SimpleGrid>
                        </TabPanel>
                        <TabPanel p='0' py='2dvh' >
                            
                            {userLikes?.length > 0 ? 
                                (<SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'  >
                                    {userLikes.map((e, index) => (
                                        <BlogCard post={e} key={index} />
                                    ))}
                                    </SimpleGrid>
                                ) : (
                                    <Box py='10dvh'>
                                        <Center flexDirection='column'>
                                            <Text fontSize='2dvw'>Opps!!! No Liked Posts Found...</Text> 
                                            <Heart />
                                        </Center>
                                    </Box>
                            )}
                            
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GridItem>
        </Grid>
    )
}