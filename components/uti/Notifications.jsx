import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Bar from './NotificationBar'

const Notifications = () => {
  return (
    <VStack py='1.9dvh' align='left' px='1dvw'>
        <Heading fontSize='1.7dvw' fontWeight='600' px='.2dvw' >Notifications</Heading>
        <VStack align='center' px='.2dvw' py='.8dvh'>
            <Bar />
            <Bar />
            <Bar />
        </VStack>
    </VStack>
  )
}

export default Notifications
