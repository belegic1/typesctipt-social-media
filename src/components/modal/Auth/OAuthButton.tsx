import React, {useEffect} from 'react'
import { Flex, Button, Image, Text } from '@chakra-ui/react'
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASSE_ERRORS } from '@/firebase/errors';
import {  doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
const OAuthButton = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);
 
  const createUserDocument = async (user: User) => {
     const userDocRef = doc(firestore, "users", user.uid)
     await setDoc(
       userDocRef,JSON.parse(JSON.stringify(user))
     );
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred])
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