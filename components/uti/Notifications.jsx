import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Bar from './NotificationBar'

const Notifications = () => {
  return (
    <VStack py='2dvh' align='left' px='2dvw'>
        <Heading>Notifications</Heading>
        <VStack>
            <Bar />
        </VStack>
    </VStack>
  )
}

export default Notifications
