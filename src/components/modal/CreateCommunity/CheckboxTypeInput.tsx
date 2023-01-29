import { Checkbox, Flex, Text, Icon } from '@chakra-ui/react';
import React from 'react'
import { IconType } from 'react-icons';

type CheckboxTypeInputProps = {
  name: string;
  bigText: string;
  smallText: string;
  communityType: string;
  setComunityType: (value: string) => void;
  icon: IconType;
};

const CheckboxTypeInput: React.FC<CheckboxTypeInputProps> = ({
  name,
  bigText,
  smallText,
  communityType,
  setComunityType,
  icon
}) => {
  return (
    <Checkbox
      onChange={() => setComunityType(name)}
      name={name}
      isChecked={communityType === name}
    >
      <Flex textAlign="center">
        <Icon as={icon} color='gray.500' mr={2}  />
        {' '}
        <Text fontSize="10pt" mr={1}>
          {bigText}
        </Text>
        <Text fontSize="8pt" color="gray.500" pt={0.5}>
          {smallText}
        </Text>
      </Flex>
    </Checkbox>
  );
};

export default CheckboxTypeInput