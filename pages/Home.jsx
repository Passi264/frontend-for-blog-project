import { getChallenges, getPosts } from "../src/api"
import {useState,useEffect, useRef} from "react"
import { BlogCard } from "../components/BlogCard"
import { Heading, Box, Text, VStack, Input, Button, Flex, Grid, Card, CardHeader, CardBody, CardFooter, Badge } from "@chakra-ui/react"
import { Typewriter } from 'react-simple-typewriter'
import { useRevalidator } from "react-router-dom"

export function Home(){
    const [post,setPost] = useState([])
    const colorSchemes = [
        'pink', 'blue', 'green', 'teal', 'red', 
        'orange', 'yellow', 'purple', 'cyan', 'gray'
    ];

    useEffect(()=>{
        async function LoadAllPosts(){
            const data = await getChallenges()
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setPost(() => data)
        }
        LoadAllPosts()
    }
    ,[])

return(
    <Box>
        <VStack px='1dvw' py='6dvh' align='center' justify='center'>
            <Heading fontWeight='600' as='h1' fontSize='10dvh' textAlign='center'>
                Put Your Pen to the Test
            </Heading>
            <Heading fontWeight='500' bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' as='h4'  fontSize='10dvh' textAlign='center'>
                <Typewriter
                        words={['Join Our Community','Explore Challenges',' Submit Your Work','Earn Points and Feedbacks', 'Climb the Rankings', 'Connect and Grow']}
                        loop={true}
                        cursor
                        cursorStyle='_'
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />
            </Heading>
            <Box py='6dvh'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Flex gap='' align='center'>
                        <Input color='blue.400' borderRightRadius='0' borderLeftRadius='1.5dvw' py='2.4dvh'  htmlSize='40' placeholder="Just an email away..." type="email" />
                        <Button bgGradient='linear(to-r, #7928CA, #FF0080)' borderLeftRadius='0' color='white' borderRightRadius='1.5dvw' py='2.5dvh' px='2dvw' type="submit"  >Subscribe</Button>
                    </Flex>
                </form>
                <Text py='1dvh' fontSize='.8dvw' color='#FF0080' textAlign='center'>Never Miss a Challenge - Subscribe to Our Newsletter</Text>
            </Box>
        </VStack>
        <VStack align='left'>
            <Heading>
                Trending Challenges
            </Heading>
            <Flex py='3dvh' px='2dvw' gap='1dvw' flexWrap='wrap'>
                    {post.map((post, index)=>{  
                        const colorScheme = colorSchemes[index % colorSchemes.length]
                    return(
                        <Badge key={index} colorScheme={colorScheme} p='1dvh 1dvw' borderRadius='1.5dvw' fontSize='1dvw' fontWeight='500' ><i className="fa-solid fa-hashtag"></i> {post.title}</Badge>
                    )
                })}
            </Flex>
        </VStack>
    </Box>
        // <div className="posts">
        // </div>
        
 )
}