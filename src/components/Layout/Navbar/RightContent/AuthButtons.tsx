import React from 'react'
import { Button } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil";
import { authModalState } from '@/atoms/authModal';
import { useSetAuthModalView } from '@/hooks/recoil';
const AuthButtons = () => {
    const { setAuthModalIsOpen } = useSetAuthModalView();

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{
          base: '70px',
          md: '110px',
        }}
        mr={2}
        onClick={() => {
          setAuthModalIsOpen(true)
        }}
      >
        Log in
      </Button>
      <Button
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{
          base: '70px',
          md: '110px',
        }}
        mr={2}
        onClick={() => {
                    setAuthModalIsOpen(true);

        }}
      >
        Sign up
      </Button>
    </>
  );
}

export default AuthButtons