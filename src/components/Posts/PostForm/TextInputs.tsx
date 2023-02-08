import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  loading: boolean;
  handleCreatePost: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const TextInputs:React.FC<TextInputsProps> = ({textInputs, onChange, loading, handleCreatePost}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        borderRadius={4}
        fontSize="10pt"
        placeholder="Title"
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          border: '1px solid',
          borderColor: 'black',
          bg: 'white',
        }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        borderRadius={4}
        fontSize="10pt"
        placeholder="Description"
        height='100px'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          border: '1px solid',
          borderColor: 'black',
          bg: 'white',
        }}
      />
      <Flex justify={'flex-end'} >
        <Button disabled={!textInputs.title || !textInputs.body} isLoading={loading} height='34px' padding='0px 30px' onClick={handleCreatePost}>Post</Button>
      </Flex>
    </Stack>
  );
}

export default TextInputs