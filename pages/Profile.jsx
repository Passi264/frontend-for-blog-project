import {useState, useEffect, useContext} from "react"
import { getPosts } from "../src/api"
import * as jwt_decode from "jwt-decode";
import { BlogCard } from "../components/BlogCard";
import { Grid, GridItem, SimpleGrid, Box, VStack, Avatar, Flex, Tag, Heading, Text, ButtonGroup, Button, Divider, Badge, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { format } from 'date-fns'
import DataContext from "../src/DataContext";

export function Profile(){

    const {posts,user} = useContext(DataContext)

    const [joinDate, setDate] = useState()


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
                <VStack bg='gray.100' borderRadius='1.5dvw' align='left'  py='1dvh' px='2dvw' >
                        <Heading textAlign='left' fontWeight='600' fontSize='1.4dvw'>Notifications</Heading>

                </VStack>
            </GridItem>
            <GridItem colSpan='4' p='1.5dvw' >
                <Tabs  variant='soft-rounded' colorScheme='green' >
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
                            <>
                            </>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GridItem>
        </Grid>
    )
}