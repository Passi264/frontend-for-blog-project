import React, { useState, useEffect, useContext } from 'react'
import { hasUserLikedPost, getLikesForPost, unlikePost, likePost } from '../../src/api'
import DataContext from '../../src/DataContext'
import { Box, Checkbox, Flex, Text, useToast } from '@chakra-ui/react'
import LikeInput from './LikeInput'

const LikeBox = ({postid}) => {

    const {user} = useContext(DataContext)

    const toast = useToast()
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(postid){
            const fetchingLikes = async() => {
                const { likeCount } = await getLikesForPost(postid)
                setLikeCount(likeCount)
            }
            fetchingLikes()
        }
    }, [postid])

    useEffect(() => {
        if(postid && user){
            const fetchingLikeStatus = async() => {
                const data = await hasUserLikedPost(user._id, postid)
                console.log(data.liked)
                setLiked(liked.liked)
            }
            fetchingLikeStatus()
        }
        else{
            setLiked(false)
        }
    }, [user, postid])

    const handlinglike = async () => {
        if(user){
            try{
                setLoading(true)
                if(liked){
                    const unlike = await unlikePost(user._id, postid)
                }
                if(!liked){
                    const liking = await likePost(user._id, postid)
                }
            }
            finally{
                setLoading(false)
            }
        }
        else{
            const push = toast({
                title: 'Please Log in to Like',
                description: "You cannot like a post without logging in",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
    <Flex align='center' gap='.5rem' bg='gray.100' p='.5rem 1rem' borderRadius='.5rem' >
        <LikeInput disabled={loading} like={liked} func={ handlinglike } />
        <Box>
            <Text>{likeCount}</Text>
        </Box>
    </Flex>
  )
}

export default LikeBox
