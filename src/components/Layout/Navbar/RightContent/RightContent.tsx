import React from 'react';
import {Flex, Button} from "@chakra-ui/react"
import AuthButtons from './AuthButtons';
import AuthModel from '@/components/modal/Auth/AuthModel';
import { signOut, User } from "firebase/auth";
import { auth } from '@/firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';
type RightContentProps = {
  user?: User | null;
}

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModel />
      <Flex justify='center' align='center'>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  )
}

export default RightContent