import { getChallenges, getPost } from "../src/api"
import {useContext, useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Box, Center, Divider, Flex, Grid, GridItem, Heading, Image, SimpleGrid, Tag, Text } from "@chakra-ui/react"
import parse from 'html-react-parser'
import Loader from "../components/Loader"
import DataContext from "../src/dataContext"
import { BlogCard } from "../components/BlogCard"
export function ReadBlog(){

    const {posts, fliker} = useContext(DataContext)

    const [post,setPost]= useState()
    const [challenge, setChallenge] = useState()
    const dateCreated = new Date(post?.dateCreated)

    const challengePost = posts?.filter(e => e?.challengeId === post?.challengeId && e?._id !== post?._id).sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime()).slice(0,3)

    let params = useParams()
    let id = params.id

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[location])


    useEffect(()=>{
        async function postcoming(){
            const data = await getPost(id)
            console.log(data)
            setPost(data)
        }

        postcoming()
    },[fliker] )

    useEffect(()=>{

        const getChall = async() => {
            let list = await getChallenges()
            if(list && post?.challengeId){
                let selectedChall = list?.filter(e => e?._id === post?.challengeId )
                setChallenge(() => selectedChall[0]?.title)

                console.log(list, selectedChall)
                console.log(challenge)
            }
        }

        if(post){
            getChall()
        }
    },[post])
     
    return(

        post ? 
        <Box py='6dvh' px='5dvw'>
            <Grid templateColumns='repeat(6, 1f)'  >
                <GridItem colSpan='6'>
                    <Center>
                        <Flex gap='1dvw'>
                            {challenge ? <Tag fontSize='1dvw'  colorScheme="blue" borderRadius='1dvw' p='.5dvh .8dvw' textTransform='capitalize' ><i className="fa-solid fa-hashtag"></i> {`  ${challenge}`}</Tag> : null}
                            <Tag fontSize='1dvw' colorScheme="pink" borderRadius='1dvw' p='.5dvh .8dvw' >{ dateCreated ? dateCreated?.toDateString() : '' }</Tag>
                        </Flex>
                    </Center>
                </GridItem>
                <GridItem colSpan='6'> 
                    <Box px='8dvw' py='2dvh'>
                        <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' textAlign='center' fontWeight='400' fontSize='5dvw'>{post?.title}</Heading>
                        <Text py='2dvh' px='4dvw' textAlign='center' >{post?.description}</Text>
                    </Box>
                </GridItem>
                <GridItem colSpan='6'>
                    <Box px='8dvw'>
                        <Image  width='100%' height='35dvh' borderRadius='1dvw' objectFit='cover' src={post?.image?.data} />
                    </Box>
                </GridItem>
                <GridItem colSpan='6'>
                    <Box py='4dvh' px='8dvw'>
                        {parse(post ? post.content : '')}
                    </Box>
                    <Divider />
                </GridItem>
                <GridItem py='5dvh' colSpan='6'>
                    {challengePost ? <Heading as='h4' bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontSize='2.5dvw' fontWeight='500'>Read Similar Posts...</Heading> : null }
                    { challengePost ? 
                    <SimpleGrid py='3dvh' spacing={8} templateColumns='repeat(auto-fill, minmax(25dvw, 1fr))' >
                        {challengePost?.map( (e, index) => {
                        return(
                            <BlogCard post={e} key={index} />
                    )})} 
                    </SimpleGrid> : null}
                </GridItem>
            </Grid>
        </Box> : 
        <Box py='6dvh' px='5dvw'>
            <Center>
                <Loader />
            </Center>
        </Box>

    )
}