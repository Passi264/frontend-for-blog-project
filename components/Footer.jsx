import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box width='100%' px='1dvw' py='4dvh'>
        <Box pb='2dvh'>
            <Flex>
                <Flex>
                    
                </Flex>
                <Flex>
                    
                </Flex>
                <Flex>
                    
                </Flex>
            </Flex>
        </Box>
        <Box>
            <Flex justify='space-between' color='gray.400'>
                <Flex gap='1.2dvw'>
                    <Text>
                        © 2024 CopyWriting 
                    </Text>
                    <Text>
                        Terms
                    </Text>
                    <Text>
                        Privacy 
                    </Text>
                    <Text>
                        Cookies 
                    </Text>
                </Flex>
                <Flex gap='1.2dvw'>
                    <Text>
                        Jobs
                    </Text>
                    <Text>
                        Freelancers
                    </Text>
                    <Text>
                        Tags
                    </Text>
                    <Text>
                        Places
                    </Text>
                    <Text>
                        Resources
                    </Text>
                    <Text>
                         Places
                    </Text>
                </Flex>
            </Flex>
        </Box>
    </Box>
  )
}

export default Footer
