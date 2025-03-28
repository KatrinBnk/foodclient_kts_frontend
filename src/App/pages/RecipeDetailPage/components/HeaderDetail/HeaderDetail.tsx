import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderDetail.module.scss';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';

interface HeaderProps {
  title: string;
}

const HeaderDetail: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.backButton}>
        <ArrowLeftIcon width={32} height={32} color="brand" />
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default HeaderDetail;
