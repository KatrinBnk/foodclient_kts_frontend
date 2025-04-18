import React from 'react';
import styles from './Poster.module.scss';
import PosterImage from '/assets/poster.png';
import Text from '@components/Text';
import { useMediaQuery } from '@utils/useMediaQuery';

const Poster: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <div className={styles['poster']}>
      <img src={PosterImage} alt="Recipes banner" />
      <div className={styles['poster__overlay']}>
        <Text view={isMobile ? 'p-16' : 'p-20'} color="primary">
          Find the perfect food and{' '}
          <Text tag="a" view={isMobile ? 'p-16' : 'link'}>
            drink ideas
          </Text>{' '}
          for every occasion, from{' '}
          <Text tag="a" view={isMobile ? 'p-16' : 'link'}>
            weeknight dinners
          </Text>{' '}
          to{' '}
          <Text tag="a" view={isMobile ? 'p-16' : 'link'}>
            holiday feasts
          </Text>
          .
        </Text>
      </div>
    </div>
  );
};

export default Poster;
