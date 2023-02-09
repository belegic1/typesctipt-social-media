import AuthButtons from '@/components/Layout/Navbar/RightContent/AuthButtons';
import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

type CommentInputPros = {
  comment: string;
  setComment: (value: string) => void;
  user: User;
  loading: boolean;
  onCreateComment: (commentText: string) => void;
};
const CommentInput:React.FC<CommentInputPros> = ({
  comment,
  setComment,
  user,
  loading,
  onCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{' '}
            <span style={{ color: '#3182CE' }}>
              {user?.email?.split('@')[0]}
            </span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            // bg='red'
            pb={10}
            _placeholder={{ color: 'gray.500' }}
            _focus={{
              outline: 'none',
              bg: 'white',
              border: '1px solid black',
            }}
          />
          <Flex
            position="absolute"
            zIndex={1}
            left="1px"
            right={'1px'}
            bottom="1px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
            // bg='blue'
          >
            <Button
              height="26px"
              disabled={!comment.length}
              isLoading={loading}
              onClick={() => onCreateComment(comment)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default CommentInput;
