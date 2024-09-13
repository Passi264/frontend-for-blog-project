import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
export function BlogCard({post, index}){
    const date= new Date(post.dateCreated)

    return(
        <Card key={index}  flexShrink='0' size='sm' width='30dvw' height='20dvh'  background="rgba(255, 255, 255, 0.2)" borderRadius="16px" boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" backdropFilter="blur(5px)" border="1px solid rgba(255, 255, 255, 0.3)">
          <CardHeader>
            <Heading as='h3' fontSize='2dvw'>{post.title}</Heading>
          </CardHeader>
          <CardBody>
            {post.description}
          </CardBody>
          <CardFooter>
            <Link to={`/ReadBlog/${post._id}`}>
              <Button>Read More</Button>
            </Link>
          </CardFooter>
        </Card>

    )
}