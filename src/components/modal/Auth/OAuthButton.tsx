import React from 'react'
import { Flex, Button, Image, Text } from '@chakra-ui/react'
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { auth } from '@/firebase/clientApp';
import { FIREBASSE_ERRORS } from '@/firebase/errors';
const OAuthButton = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
 
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
        variant="oauth"
        mb={2}
      >
        <Image
          mr={4}
          src="/images/googlelogo.png"
          alt="google-auth"
          height="20px"
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Facebook</Button>
      {error && (
        <Text color='red.50'fontSize='9pt' textAlign='center'>
          {FIREBASSE_ERRORS[error.message as keyof typeof FIREBASSE_ERRORS]}
        </Text>
      )}
    </Flex>
  );
}

export default OAuthButton