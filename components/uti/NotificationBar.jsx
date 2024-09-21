import { Flex, Heading, Box, Avatar, Text, Divider } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Bar = ({user}) => {
  return (
    <StyledWrapper >
        <Box className="blur" width='100%' >
            <Flex width='100%' align='center' py='.5dvh' gap='.5dvw' >
                <Box width='4dvw' >
                    <Avatar boxShadow='xl' name="DK" size='md' />
                </Box>
                <Box >
                    <Heading textAlign='left' fontWeight='500' fontSize='1.2dvw'>You got a like!</Heading>
                    <Text fontSize='1dvw'>{!user ? 'This is where you will see the notification' : `Your Post has been Liked by ${user?.name} `}</Text>
                </Box>
            </Flex>
        </Box>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .blur{
    background: rgba(255, 0, 167, 0);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

`;

export default Bar;
