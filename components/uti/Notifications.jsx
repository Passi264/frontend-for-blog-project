import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Bar from './NotificationBar'

const Notifications = () => {
  return (
    <VStack py='2dvh' align='left' px='1dvw'>
        <Heading>Notifications</Heading>
        <VStack align='left' py='1.2dvh'>
            <Bar />
            <Bar />
            <Bar />
        </VStack>
    </VStack>
  )
}

export default Notifications
