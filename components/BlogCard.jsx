import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Flex, Box, Text, Collapse,Tag, useToast, Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getImage, getLikesForPost, getUserLikes, likePost, unlikePost } from "../src/api"
import DataContext from "../src/DataContext"
import LikeInput from "./uti/LikeInput"
import LikeBox from "./uti/LikeBox"

export function BlogCard({ post }) {
  const { user} = useContext(DataContext);

  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  const dateCreated = new Date(post.dateCreated);
  const presentData = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = presentData - dateCreated;

  // Convert milliseconds to days
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);


  useEffect(() => {
    const fetchLikesAndImage = async () => {
      try {
        const imgData = await getImage(post?.imageId);
        setImg(imgData?.data);

      } catch (error) {
        console.error(error);
        setError("Error fetching likes or image.");
      }
    };

    fetchLikesAndImage();
  }, [post, user]);

  return (
    <Card size='md' background="rgba(255, 255, 255, 0.2)" borderRadius="16px" boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" backdropFilter="blur(5px)" border="1px solid rgba(255, 255, 255, 0.3)">
      <CardBody>
        <Image borderRadius='16px' style={{ width: '100%', height: '24dvh' }} objectFit='cover' alt="AWS 20k requests Exhausted" src={img}/>
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
              {/* <Tag onClick={likingPost} as={Button} disabled={isLoading} p='1dvw' display='flex' alignItems='center' gap='.5dvw' >
                {
                  isLoading ? <Spinner /> : (
                    <>
                      <LikeInput like={like} />
                      <Text fontSize='1.1dvw' fontWeight='400'>{likes}</Text>
                    </>
                  )
                }
              </Tag> */}
              <LikeBox postid={post._id} />
              <Tag as={Button} p='1dvw' ><i className="fa-regular fa-comment"></i></Tag>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
}