import React, { useState, useEffect } from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useSetAuthModalView } from '@/hooks/recoil';
import AuthIput from './AuthIput';
import { auth, firestore } from '@/firebase/clientApp';
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import { FIREBASSE_ERRORS } from '@/firebase/errors';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
const SignUp = () => {
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const { setAuthModalView } = useSetAuthModalView();
  const [signUpForm, setSignUpForm] = useState({
    email: '',
      password: '',
    confirmPassword: ""
  });
  const [error, setError] = useState('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      setError("")
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Password doesn't match")
      return;
     }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const createUserDocument = async (user: User) => {
    await addDoc(collection(firestore, "users"),  JSON.parse(JSON.stringify(user)))
  }
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user)
    }
  }, [userCred])
  return (
    <form onSubmit={onSubmit}>
      <AuthIput
        type="email"
        placeholder="email"
        name="email"
        onChange={onChange}
      />
      <AuthIput
        type="password"
        placeholder="password"
        name="password"
        onChange={onChange}
      />
      <AuthIput
        type="password"
        placeholder="confirmPassword"
        name="confirmPassword"
        onChange={onChange}
      />
     {(error || userError) && <Text color="red.500" fontSize="9pt" textAlign="center">{error || FIREBASSE_ERRORS[userError?.message as keyof typeof FIREBASSE_ERRORS]}</Text>}
      <Button width="100%" height="36px" my={2} type="submit" isLoading={loading}>
        Sign up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr="1">
          Already a redditor?{' '}
          <Text
            as="span"
            fontWeight={700}
            cursor="pointer"
            color="blue.500"
            onClick={() => setAuthModalView('login')}
          >
            Login
          </Text>
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
