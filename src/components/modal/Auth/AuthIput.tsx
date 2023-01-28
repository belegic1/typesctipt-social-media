import React from 'react'
import {Input } from "@chakra-ui/react"
type AuthInputProps = {
    type: string,
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthIput:React.FC<AuthInputProps> = ({type, placeholder, name, onChange}) => {
  return (
    <Input
      required
      name={name}
      placeholder={placeholder}
      type={type}
      mb={2}
      onChange={onChange}
      fontSize="10pt"
      _placeholder={{ color: 'gray.500' }}
      _hover={{
        bg: 'white',
        border: '1px solid',
        borderColor: 'blue.500',
      }}
      _focus={{
        outline: 'none',
        bg: 'white',
        border: '1px solid',
        borderColor: 'blue.500',
      }}
      bg="gray.50"
    />
  );
}

export default AuthIput