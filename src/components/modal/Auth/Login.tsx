import React, { useState } from 'react'
import { Input, Button, Flex , Text} from "@chakra-ui/react"
import { useSetAuthModalView } from '@/hooks/recoil'
import AuthIput from './AuthIput'
type LoginProps = {} 
const Login: React.FC<LoginProps> = () => {
    const {setAuthModalView} = useSetAuthModalView()
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
  }
  console.log({loginForm});
  return (
    <form>
      <AuthIput
        type='email' placeholder='email' name='email' onChange={onChange}
      />
      <AuthIput
        type='password' placeholder='password' name='password' onChange={onChange}
      />
      <Button width="100%" height="36px" my={2} type="submit">
        Login
          </Button>
          <Flex fontSize='9pt' justifyContent='center' ><Text mr='1'>
              New here? <Text as='span' fontWeight={700} cursor='pointer' color='blue.500' onClick={() => setAuthModalView("signup")}>Sign up</Text>
          </Text>
              
          </Flex>
    </form>
  );
}

export default Login