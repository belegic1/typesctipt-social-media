import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight='60vh'
    >
      Sorry, That community does not exist or has ben banned
      <Link href='/'>
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  )
}

export default NotFound