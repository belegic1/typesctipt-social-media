import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from "./Directory/Directory"
import useDirectory from '@/hooks/useDirectory';
import { defaultMenuItem } from '@/atoms/directoryMenuAtom';
const Navbar: React.FC = () => {
  const {onSelectMenuItem, toggleMenuOPen} = useDirectory()
  const [user, error, loading] = useAuthState(auth);
  return (
    <Flex
      bg="white" height="44px" padding="6px 12px" justify={{
      md: "space-between",
    }}>
      <Flex align="center" width={{ base: "40px", md: 'auto' }} mr={{ base: 0, md: 2 }}
        cursor='pointer'
        onClick={() => {
          onSelectMenuItem(defaultMenuItem)
          toggleMenuOPen()
        }}
      >
        <Image alt="logo" src="/images/redditFace.svg" height="30px" />
        <Image
          alt="logo text"
          src="/images/redditText.svg"
          height="46px"
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
