import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { Flex, Icon } from '@chakra-ui/react';

const icons = [
  {
    component: BsArrowUpRightCircle,
    fontSize: 22,
    visible: { base: 'none', md: 'flex' },
  },
  {
    component: IoFilterCircleOutline,
    fontSize: 22,
    visible: { base: 'none', md: 'flex' },
  },
  {
    component: IoVideocamOutline,
    fontSize: 22,
    visible: { base: 'none', md: 'flex' },
  },
  {
    component: BsChatDots,
    fontSize: 20,
    visible: {},
  },
  {
    component: IoNotificationsOutline,
    fontSize: 20,
    visible: {},
  },
  {
    component: GrAdd,
    fontSize: 20,
    visible: { base: 'none', md: 'flex' },
  },
];
const Icons = () => {
  return (
    <Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        {icons.slice(0, 3).map((icon, i) => (
            <Flex
                display={icon.visible}
            key={i}
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            fontSize={icon.fontSize}
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={icon.component} />
          </Flex>
        ))}
      </Flex>
      <>
        {icons.slice(3).map((icon, i) => (
            <Flex
                display={icon.visible}
            key={i}
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            fontSize={icon.fontSize}
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={icon.component} />
          </Flex>
        ))}
      </>
    </Flex>
  );
};

export default Icons;
