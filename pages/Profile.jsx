import {useState, useEffect} from "react"
import { getPosts } from "../src/api"
import * as jwt_decode from "jwt-decode";
import { BlogCard } from "../components/BlogCard";
import { Grid, GridItem, SimpleGrid, Box, VStack, Avatar, Flex, Tag, Heading, Text, ButtonGroup, Button, Divider } from "@chakra-ui/react";
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
            console.log(num)
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
        <Grid templateColumns='repeat(6, 1fr)'>
            <GridItem colSpan='2' boxShadow='lg' borderRadius='1dvw'>
                <VStack align='left' py='3dvh' px='2dvw' >
                        <Flex align='center' justify='space-between'>
                            <Avatar size='xl' name={user.name} src={user?.image} />
                            <Flex>
                                <Tag colorScheme='cyan' ><strong>ID</strong>: {user?._id}</Tag>
                            </Flex>
                        </Flex>
                        <Box>
                            <Flex py='.5dvh'>
                                <Heading fontWeight='500' fontSize='1.5dvw' as='h4' textTransform='capitalize' >{user?.name}</Heading>
                            </Flex>
                            <Flex>
                                <Text fontSize='.9dvw'>Joined on: {joinDate}</Text>
                            </Flex>
                            <Flex py='1.5dvh'>
                                <ButtonGroup size='sm' colorScheme="cyan" >
                                    <Button color='white' leftIcon={<i className="fa-regular fa-pen-to-square"></i>}>
                                        Update
                                    </Button>
                                    <Button colorScheme="red" leftIcon={<i className="fa-solid fa-trash"></i>}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Box>
                        <Divider />
                </VStack>
            </GridItem>
            <GridItem colSpan='4'>
                
            </GridItem>
        </Grid>


    //     <>
    //      <label>Name</label>
    //      <h2>{user.name}</h2>
    //      <label>Email</label>
    //      <h2>{user.email}</h2>
    //      <label>join date</label>
    //      <h2>{user.joinDate}</h2>
    //      {console.log(num)}
    //      {num.map((post)=>{
    //         return(
    //         <>
    //         <BlogCard post={post}/>
    //         </>
    //         )
    //      }
    //      )
    //      }
    //     </>
    )
}