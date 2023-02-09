import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Icon,
  Text,
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
import { useResetRecoilState } from 'recoil';
import { communityState } from '@/atoms/CommunitiesAtom';
type UserMenuProps = {
  user?: User | null;
};
const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { setAuthModalIsOpen } = useSetAuthModalView();
  const resetCommunityState = useResetRecoilState(communityState)

  const logout = async () => {
    await signOut(auth)//
    // resetCommunityState()
  }
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        _hover={{
          outline: '1px solid',
          outlineColor: 'gray.200',
        }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize="8pt"
                  align="flex-start"
                  fontWeight={700}
                  mr={8}
                >
                  <Text>{user.displayName || user.email?.split('@')[0]}</Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.200" mr={1} as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />

            <MenuItem
              onClick={() => logout()}
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogout} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={(e) => {
              setAuthModalIsOpen(true);
            }}
            fontSize="10pt"
            fontWeight={700}
            _hover={{
              bg: 'blue.500',
              color: 'white',
            }}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log In/Sign Up
            </Flex>
          </MenuItem>
        )}

        {/* <MenuItem fontSize='10pt' fontWeight={700} _hover={{
                  bg: 'blue.500',
                    color: 'white'
        }}>
          <Flex align='center'>
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
              </MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
