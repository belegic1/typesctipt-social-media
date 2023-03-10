import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const PageLayout: React.FC = ({ children }) => {
  return (
    <Flex justify={'center'} p="16px 0px">
      <Flex width="95%"  justify={'center'} maxWidth="860px">
        <Flex
          direction={'column'}
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}
        >
          {children[0]}
        </Flex>
        <Box display={{ base: 'none', md: 'flex' }} flexDirection='column'  flexGrow={1} >
          {children[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout