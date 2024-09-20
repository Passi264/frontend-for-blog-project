import { Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Bar = () => {
  return (
    <StyledWrapper>
        <Box width='100%'>
            {/* <Flex width='100%' align='left'>
                <Box width='4dvw' height='5dvh'>
                    
                </Box>
                <Flex align='left'>
                    <Heading fontSize='1dvw'>Your Posts</Heading>
                </Flex>
            </Flex> */}
        </Box>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  

`;

export default Bar;
