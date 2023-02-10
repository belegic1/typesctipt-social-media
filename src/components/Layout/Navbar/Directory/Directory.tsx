import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Icon,
  Text,
  Image,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { User } from 'firebase/auth';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { MdOutlineLogout } from 'react-icons/md';
import { auth } from '@/firebase/clientApp';
import { signOut } from 'firebase/auth';
import { IoSparkles } from 'react-icons/io5';
import { useSetAuthModalView } from '@/hooks/recoil';
import { TiHome } from "react-icons/ti";
import Communities from './Communities';
import useDirectory from '@/hooks/useDirectory';
type UserMenuProps = {
  user?: User | null;
};
const UserMenu = () => {
  const { setAuthModalIsOpen } = useSetAuthModalView();
  const {directoryState, toggleMenuOPen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        ml={{base: 0, md:2}}
        _hover={{
          outline: '1px solid',
          outlineColor: 'gray.200',
        }}
        onClick={toggleMenuOPen}
      >
        <Flex align="center" justify='space-between' width={{base: 'auto', lg:'200px'}}>
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? <Image
              borderRadius="full" boxSize={'24px'} mr={2}
              src={directoryState.selectedMenuItem.imageURL}
            /> : <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={directoryState.selectedMenuItem.icon} color={directoryState.selectedMenuItem.iconColor} />}
            <Flex display={{base: "none", lg: "flex"}}>
              <Text fontSize='10pt' fontWeight={600}>{directoryState.selectedMenuItem.displayText}</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
