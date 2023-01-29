import React from 'react';
import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { User } from 'firebase/auth';
type SearchInputProps = {
  user?: User | null;
};
const SearchInput: React.FC<SearchInputProps> = ({user}) => {
  return (
    <Flex flexGrow={1} maxWidth={user? "auto": "600px"} mr={2} align='center'>
      <InputGroup>
        <InputLeftElement pointerEvents="none" mb={1}>
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Reddit"
          fontSize={'10pt'}
          _placeholder={{ color: 'gray.500' }}
                  _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                  _focus={{
                      outline: "none",
                      border: "1px solid",
                      borderColor: "blue.500"
                  }}
                  height='34px'
                  bg='gray.50'
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
