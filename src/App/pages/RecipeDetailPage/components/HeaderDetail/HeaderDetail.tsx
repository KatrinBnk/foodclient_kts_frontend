import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderDetail.module.scss';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';
import Text from '@components/Text';

interface HeaderDetailProps {
  title: string;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles['header-detail']}>
      <a href="#" onClick={handleBackClick} className={styles['header-detail__back-button']}>
        <ArrowLeftIcon
          className={styles['header-detail__back-button-icon']}
          width={32}
          height={32}
          color="brand"
        />
      </a>
      <Text view="title" tag="h1" weight="bold" className={styles['header-detail__title']}>
        {title}
      </Text>
    </div>
  );
};

export default HeaderDetail;
