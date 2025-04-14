import React from 'react';
import Icon, { IconProps } from '@components/Icons/Icon';

const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" fill="none" />
  </Icon>
);

export default CheckIcon;
