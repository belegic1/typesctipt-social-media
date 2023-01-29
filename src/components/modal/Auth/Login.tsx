import React, { useState } from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useSetAuthModalView } from '@/hooks/recoil';
import AuthIput from './AuthIput';
import { auth } from '@/firebase/clientApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASSE_ERRORS } from '@/firebase/errors';
type LoginProps = {};
const Login: React.FC<LoginProps> = () => {
  const { setAuthModalView } = useSetAuthModalView();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
      <Button
        isLoading={loading}
        width="100%"
        height="36px"
        my={2}
        type="submit"
      >
        Login
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot password?
        </Text>
        <Text
          onClick={() => setAuthModalView('resetPassword')}
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
        >
          Reset
        </Text>
      </Flex>
      {error && (
        <Text color="red.500" fontSize="9pt" textAlign="center">
          {FIREBASSE_ERRORS[error?.message as keyof typeof FIREBASSE_ERRORS]}
        </Text>
      )}
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr="1">
          New here?{' '}
          <Text
            as="span"
            fontWeight={700}
            cursor="pointer"
            color="blue.500"
            onClick={() => setAuthModalView('signup')}
          >
            Sign up
          </Text>
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
