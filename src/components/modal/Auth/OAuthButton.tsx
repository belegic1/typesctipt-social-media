import React from 'react'
import {Flex, Button, Image} from '@chakra-ui/react'
const OAuthButton = () => {
  return (
      <Flex  direction='column' width='100%' mb={4}>
          <Button variant='oauth' mb={2}>
              <Image mr={4} src='/images/googlelogo.png' alt='google-auth' height='20px' />
              Continue with Google
          </Button>
          <Button variant='oauth'>Continue with Facebook</Button>
    </Flex>
  )
}

export default OAuthButton