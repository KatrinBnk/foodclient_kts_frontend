import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderDetail.module.scss';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';
import Text from '@components/Text';

interface HeaderDetailProps {
  title: string;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({ title }) => {
  return (
    <div className={styles['header-detail']}>
      <Link to="/" className={styles['header-detail__back-button']}>
        <ArrowLeftIcon
          className={styles['header-detail__back-button-icon']}
          width={32}
          height={32}
          color="brand"
        />
      </Link>
      <Text view="title" tag="h1" weight="bold" className={styles['header-detail__title']}>
        {title}
      </Text>
    </div>
  );
};

export default HeaderDetail;
