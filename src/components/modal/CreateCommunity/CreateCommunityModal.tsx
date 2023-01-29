import {useState} from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex
} from '@chakra-ui/react';
import React from 'react';
import CheckboxTypeInput from "./CheckboxTypeInput";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};
const checkboxes = [
  {
  name: "public",
  bigText: "Public",
    smallText: "Anyone can view, post,and comment to this community.",
  icon: BsFillPersonFill
},
  {
  name: "restricted",
  bigText: "Restricted",
    smallText: "Anyone can view this community but only approved users can post",
  icon: BsFillEyeFill
},
  {
  name: "private",
  bigText: "Private",
    smallText: "Only approved users can view and submit to this community",
    icon: HiLockClosed
},
]
const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth)
  const [communityName, setCommunityName] = useState("")
  const [communityType, setCommunityType] = useState('public')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateCommunity = async () => {
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (format.test(communityName) || communityName.length < 3) {
      setError("Community name must be at least 3 characters long and cannot contain special characters")
      return;
    }
    setLoading(true)
    try {
          const communityDocRef = doc(firestore, 'communities', communityName);
          const communityDoc = await getDoc(communityDocRef);
          if (communityDoc.exists()) {
            throw new Error("Community with this name already exists.")
          }

          await setDoc(communityDocRef, {
            creatorId: user?.uid,
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            privacyType: communityType,
          });
      setLoading(false)
      setCommunityName("")
    } catch (error:unknown) {
      if (error instanceof Error) {
        setError(error.message)
        setLoading(false)
      }
    }

  }
  return (
    <Modal size='lg' isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection={'column'}
          fontSize={15}
          padding={3}
        >
          Create community
        </ModalHeader>
        <Box px={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection={'column'} padding="10px 0px">
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text color="gray.500" fontSize={11}>
              Community names including capitalization cannot be changedS
            </Text>
            <Text
              position={'relative'}
              top="24px"
              left="10px"
              color="gray.400"
              width="20px"
            >
              /r
            </Text>
            <Input
              maxLength={21}
              position="relative"
              size="small"
              pl="22px"
              onChange={(e) => {
                setCommunityName(e.target.value);
              }}
              value={communityName}
            />
            <Text fontSize="9pt">
              {21 - communityName?.length} characters remianing
            </Text>
            {error && <Text fontSize='9pt' color='red'>{error} pt={ 1}</Text>}
          </ModalBody>
          <Box my={4}>
            <Text fontWeight={600} fontSize={15}>
              Community Type
            </Text>
            <Stack spacing={2}>
              {checkboxes.map((checkbox) => (
                <CheckboxTypeInput
                  key={checkbox.name}
                  communityType={communityType}
                  name={checkbox.name}
                  setComunityType={setCommunityType}
                  bigText={checkbox.bigText}
                  smallText={checkbox.smallText}
                  icon={checkbox.icon}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px' >
          <Button variant='outlined' height='30px' mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button isLoading={loading} height='30px' onClick={handleCreateCommunity}>
            Create community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
