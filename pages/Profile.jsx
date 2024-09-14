import {useState, useEffect} from "react"
import { getPosts } from "../src/api"
import * as jwt_decode from "jwt-decode";
import { BlogCard } from "../components/BlogCard";
import { Grid, GridItem, SimpleGrid, Box, VStack, Avatar, Flex, Tag, Heading, Text, ButtonGroup, Button, Divider, Badge } from "@chakra-ui/react";
import { format } from 'date-fns'

export function Profile(){
    const [num,setPost] = useState([])
    const [user,setUser] = useState({})

    const [joinDate, setDate] = useState()



    useEffect(()=>{
        const token = sessionStorage.getItem("User")
        const decodeUser = jwt_decode.jwtDecode(token)
        const action = async function loadPosts(decodeUser){
            const allPosts = await getPosts()
            const filteredpost= allPosts?.filter((post)=>post.author == decodeUser._id)
            setPost(filteredpost)
            setUser(decodeUser)
            console.log(user)
            const readableDate = new Date(decodeUser?.joinDate);
            if (!isNaN(readableDate.getTime())) {
                setDate(format(readableDate, 'd MMM yyyy'));
            } else {
                console.warn('Invalid join date');
            }

        }
        action(decodeUser)
    }, [])
    return(
        <Grid templateColumns='repeat(6, 1fr)' gap='1dvw' >
            <GridItem colSpan='2' p='1.5dvw' >
                <VStack align='center' py='3dvh' px='2dvw' >
                        <Flex align='center' >
                            <Avatar size='xl' name={user.name} src={user?.image} />
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
            </GridItem>
            <GridItem colSpan='4' p='1.5dvw' >
                <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' >
                    {num.map( (e, index) => {
                        return(
                            <BlogCard post={e} index={index} />
                    )})}
                </SimpleGrid>
            </GridItem>
        </Grid>
    )
}