import { getChallenges, getPost } from "../src/api"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getImage } from "../src/api"
import { Box, Center, Flex, Grid, GridItem, Heading, Image, Tag, Text } from "@chakra-ui/react"
import parse from 'html-react-parser'
export function ReadBlog(){

    const [post,setPost]= useState()
    const [challenge, setChallenge] = useState()
    const dateCreated = new Date(post?.dateCreated)

    let params = useParams()
    let id = params.id

    const navigate = useNavigate()


    useEffect(()=>{
        async function postcoming(){
            const data = await getPost(id)
            console.log(data)
            setPost(data)
        }

        postcoming()
    },[] )

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
        <Box py='6dvh' px='5dvw'>
            <Grid templateColumns='repeat(6, 1f)'  >
                <GridItem colSpan='6'>
                    <Center>
                        <Flex gap='1dvw'>
                            <Tag fontSize='1dvw'  colorScheme="blue" borderRadius='1dvw' p='.5dvh .8dvw' textTransform='capitalize' ><i className="fa-solid fa-hashtag"></i> {`  ${challenge}`}</Tag>
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
                    <Box py='2dvh' px='8dvw'>
                         {parse(post ? post.content : '')}
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}