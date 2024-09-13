import { getChallenges, getPost, getPosts } from "../src/api"
import {useState,useEffect, useRef} from "react"
import { BlogCard } from "../components/BlogCard"
import { Heading, Box, Text, VStack, Input, Button, Flex, Grid, Card, CardHeader, CardBody, CardFooter, Badge, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, Progress, Skeleton, AvatarGroup, Avatar } from "@chakra-ui/react"
import { Typewriter } from 'react-simple-typewriter'
import BrandSlider from "../components/Slider"
import Loader from "../components/Loader"

export function Home(){
    const [post,setPost] = useState()
    const [blogs, setBlogs] = useState()
    const colorSchemes = [
        'pink', 'blue', 'green', 'teal', 'red', 
        'orange', 'yellow', 'purple', 'cyan', 'gray'
    ];

    useEffect(()=>{
        async function LoadAllPosts(){
            const data = await getChallenges()
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setPost( () => data)

            const blogData = await getPosts()
            blogData.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setBlogs(() => blogData)
        }
        LoadAllPosts()
    }
    ,[])

return(
    <Box>
        <VStack px='1dvw' py='15dvh' align='center' justify='center'>
            <Heading fontWeight='300' as='h1' fontSize='10dvh' textAlign='center'>
                Put Your Pen to the Test
            </Heading>
            <Heading fontWeight='500' bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' as='h4'  fontSize='10dvh' textAlign='center'>
                <Typewriter
                        words={['Join Our Community','Explore Challenges',' Submit Your Work','Earn Points', 'and Feedbacks', 'Climb the Rankings', 'Connect and Grow']}
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
            <Box py='2dvh'>
                <VStack>
                    <AvatarGroup size='xl' py='1dvh' max={10}>
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                    </AvatarGroup>
                    <Text bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontSize='1.5dvw' fontWeight='500' textAlign='center' py='1dvh'>Join the ranks of users who've worked with top tier companies!</Text>
                </VStack>
            </Box>
        </VStack>
        <VStack align='left' px='1dvw' py='4dvh' >
            <Heading >
                Trending Challenges
            </Heading>
            <Flex py='3dvh' gap='1dvw' flexWrap='wrap' >
                    {post ? post.map((post, index)=>{  
                        const colorScheme = colorSchemes[index % colorSchemes.length]
                    return(
                        <Badge key={index} colorScheme={colorScheme} p='1dvh 1dvw' borderRadius='1.5dvw' fontSize='1dvw' fontWeight='500' ><i className="fa-solid fa-hashtag"></i> {post.title}</Badge>
                    )
                }) : <Flex py='3dvh' gap='1dvw' flexWrap='wrap'>
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                     <Skeleton p='1dvh 1dvw' width='17dvw' height='5dvh' borderRadius='1.5dvw' />
                </Flex> }
            </Flex>
        </VStack>
        <VStack  align='left' px='1dvw' py='4dvh'>
<Heading>
    Community's Favourite
</Heading>
<Box>
<Flex py='3dvh' px='1dvw' gap='1dvw' flexWrap='nowrap' overflow='scroll'>
    {blogs ? blogs.map( (e, index) => (
        <BlogCard post={e} index={index} />
    )) : <Flex py='3dvh' gap='1dvw' flexWrap='nowrap' overflow='scroll'>
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
    <Skeleton p='1dvh 1dvw' width='30dvw' height='20dvh' borderRadius='1.5dvw' />
</Flex> }
</Flex>
</Box>
</VStack> 
    </Box>
        // <div className="posts">
        // </div>
        
 )
}