import CreateCommunityModal from '@/components/modal/CreateCommunity/CreateCommunityModal'
import { Flex, Menu, MenuItem, Icon } from '@chakra-ui/react'
import React from 'react'
import { GrAdd } from "react-icons/gr"
import {useState} from 'react'

const Communities = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
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
    </>
  );
}

export default Communities