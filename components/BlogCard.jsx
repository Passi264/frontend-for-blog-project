import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Flex, Box, Text, Collapse,Tag, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getImage, getLikesForPost, getUserLikes, likePost, unlikePost } from "../src/api"
import DataContext from "../src/dataContext"
import LikeInput from "./uti/LikeInput"

export function BlogCard({post}){

  const {user, runFliker} = useContext(DataContext)

  const toast = useToast()

    const [likes, setLikes] = useState()
    const [like, setLike] = useState()
    const [img, setImg] = useState()
    const navigate = useNavigate()

    const dateCreated = new Date(post.dateCreated);
    const presentData = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = presentData - dateCreated;

    // Convert milliseconds to days
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);

    const likingPost = async () => {
      if (!user) return (
        toast({
          title: "Could not like the Post",
          description: "Please make sure you are logged in",
          status: "error",
          duration: 5000,
          isClosable: true
        })
      ); // 
      
      const updatedLikeStatus = !like;

      setLike(updatedLikeStatus);
      setLikes(prevLikes => updatedLikeStatus ? prevLikes + 1 : prevLikes - 1);
  
      
      try {
        if (updatedLikeStatus) {
          await likePost(user._id, post._id);
        } else {
          await unlikePost(user._id, post._id);
        }
      } catch (error) {
        console.error(error);
        setLike(!updatedLikeStatus);
        setLikes(prevLikes => updatedLikeStatus ? prevLikes - 1 : prevLikes + 1);
      }
      runFliker()
    };
  
    // useEffect(() => {
    //   setLike(() => userLikes?.some(e => e?._id === post?._id))
    //   console.log(userLikes?.some(e => e?._id === post?._id));
    // }, [])

    useEffect(() => {
      const fetchLikesAndImage = async () => {
        const { likeCount } = await getLikesForPost(post._id);
        setLikes(likeCount);
  
        const imgData = await getImage(post?.imageId);
        setImg(imgData?.data);
      };
      
      fetchLikesAndImage();
    }, [post, user]); // Run this effect when post or user changes

    useEffect(() => {
      const fetchLikes = async () => {
  
        const userLikes = await getUserLikes(user._id);
        setLike(userLikes?.some(e => e._id === post._id));

      };
      
      fetchLikes();
    },[])


    return(
        <Card  size='md' background="rgba(255, 255, 255, 0.2)" borderRadius="16px" boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" backdropFilter="blur(5px)" border="1px solid rgba(255, 255, 255, 0.3)">
          <CardBody>
            <Image borderRadius='16px' style={{ width: '100%', height: '24dvh' }} objectFit='cover' alt="Some Image" src={img}/>
            <Flex align='center' gap='.5dvw' py='2dvh'>
              <Badge colorScheme="green" fontSize='.7dvw' borderRadius='16px' px='.5dvw' size='lg'>{differenceInDays > 0 ? `${differenceInDays} Days ago` : 'New'}</Badge>
              <Box fontWeight='300'  fontSize='.7dvw' borderRadius='16px' px='.5dvw' size='lg' >{dateCreated.toDateString()}</Box>
            </Flex>
              <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' as='h3' fontSize='1.5dvw' fontWeight='600' pb='1dvh' textTransform='capitalize'>{post.title}</Heading>
              <Text fontSize='1dvw'>{post.description}</Text>
          </CardBody>
          <CardFooter>
            <Flex width='100%' justify='space-between'>
              <Button onClick={() => navigate(`/ReadBlog/${post._id}`)} >Read More</Button>
              <Flex gap='.5dvw' align='center'>
                  <Tag onClick={likingPost} as={Button} p='1dvw' display='flex' alignItems='center' gap='.5dvw' >
                    {
                      like == undefined ? "Loading..." :<> <LikeInput like={like} />
                      <Text fontSize='1.1dvw' fontWeight='400'>{likes}</Text> </>
                    }
                  </Tag>
                  <Tag as={Button} p='1dvw' ><i className="fa-regular fa-comment"></i></Tag>
              </Flex>
            </Flex>
          </CardFooter>
        </Card>

    )
}