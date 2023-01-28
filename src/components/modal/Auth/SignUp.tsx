import React, { useState } from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useSetAuthModalView } from '@/hooks/recoil';
import AuthIput from './AuthIput';
const SignUp= () => {
  const { setAuthModalView } = useSetAuthModalView();
  const [signUpForm, setSignUpForm] = useState({
    email: '',
      password: '',
    confirmPassword: ""
  });
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log({signUpForm})
  return (
    <form>
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
        type="confirmPassword"
        placeholder="confirmPassword"
        name="confirmPassword"
        onChange={onChange}
      />
      <Button width="100%" height="36px" my={2} type="submit">
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
