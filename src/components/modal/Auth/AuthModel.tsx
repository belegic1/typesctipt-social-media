import React, { useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
    Flex,
  Text
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModal';
import AuthInputs from './AuthInputs';
import OAuthButton from './OAuthButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import ResetPassword from './ResetPassword';

const AuthModel = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user])
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={modalState.open}
        onClose={closeModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === 'login'
              ? 'Login'
              : modalState.view === 'signup'
              ? 'Sign up'
              : 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
                      justifyContent="center"
                      pb={6}
                  >
                      <Flex direction={'column'} align='center' justify='center' width='70%'>
                          <OAuthButton />
                          <Text fontWeight={700} color='gray.500'>OR</Text>
                         {modalState.view === 'resetPassword'? <ResetPassword />: <AuthInputs />}
                          {/* <ResetPassword /> */}
                      </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModel;
