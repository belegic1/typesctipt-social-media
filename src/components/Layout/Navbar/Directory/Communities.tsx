import CreateCommunityModal from '@/components/modal/CreateCommunity/CreateCommunityModal'
import { Flex, Menu, MenuItem, Icon, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { GrAdd } from "react-icons/gr"
import {useState} from 'react'
import { useRecoilValue } from 'recoil'
import { communityState } from '@/atoms/CommunitiesAtom'
import MenuListItem from './MenuListItem'
import { FaReddit } from 'react-icons/fa'

const Communities = () => {

  const mySnippets = useRecoilValue(communityState).mySnippets;
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontWeight={500} color="gray.500" fontSize="7pt">
          MODERATING
        </Text>
        {
          mySnippets.filter(snippet => snippet.isModerator).map((snippet) => (
            <MenuListItem key={snippet.communityId} icon={FaReddit} displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`} iconColor="brand.100"
              imageURL={snippet.imageURL}
            />
          ))
        }
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontWeight={500} color="gray.500" fontSize="7pt">
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize={'10pt'}
          _hover={{
            bg: 'gray.100',
          }}
          onClick={() => setOpen(true)}
        >
          <Flex fontSize={16} align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create community
          </Flex>
        </MenuItem>
        {
          mySnippets.map((snippet) => (
            <MenuListItem key={snippet.communityId} icon={FaReddit} displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`} iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          ))
        }
      </Box>
    </>
  );
}

export default Communities