import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Flex, Box, Text, Collapse } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getImage } from "../src/api"
export function BlogCard({post, index, color, image}){

    const [img, setImg] = useState()

    const dateCreated = new Date(post.dateCreated);
    const presentData = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = presentData - dateCreated;

    // Convert milliseconds to days
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);




    useEffect( () => {
      async function getImg(){
      const data = await getImage(post?.imageId)
      console.log(data)
      setImg(data.data)
      }
      getImg()
    }
    ,[])

    return(
        <Card key={index} size='md'  background="rgba(255, 255, 255, 0.2)" borderRadius="16px" boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" backdropFilter="blur(5px)" border="1px solid rgba(255, 255, 255, 0.3)">
          <CardBody>
            <Image borderRadius='16px' style={{ width: '100%', height: 'auto', maxHeight: '200px' }} objectFit='cover' src={img}/>
            <Flex align='center' gap='.5dvw' py='2dvh'>
              <Badge colorScheme="green" fontSize='.7dvw' borderRadius='16px' px='.5dvw' size='lg'>{differenceInDays > 0 ? `${differenceInDays} Days ago` : 'New'}</Badge>
              <Box fontWeight='300'  colorScheme="yellow" fontSize='.7dvw' borderRadius='16px' px='.5dvw' size='lg' >{dateCreated.toDateString()}</Box>
            </Flex>
            <Collapse startingHeight={34}>
              <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' as='h3' fontSize='1.5dvw' fontWeight='600' pb='1dvh' textTransform='capitalize'>{post.title}</Heading>
            </Collapse>
            <Collapse startingHeight={50}>
              <Text fontSize='1dvw'>{post.description}</Text>
            </Collapse>
          </CardBody>
          <CardFooter>
            <Link to={`/ReadBlog/${post._id}`}>
              <Button>Read More</Button>
            </Link>
          </CardFooter>
        </Card>

    )
}