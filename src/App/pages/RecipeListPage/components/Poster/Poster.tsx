import React from 'react';
import styles from './Poster.module.scss';
import PosterImage from '/assets/poster.png';
import Text from '@components/Text';

const Poster: React.FC = () => {
  return (
    <div className={styles['poster']}>
      <img src={PosterImage} alt="Recipes banner" />
      <div className={styles['poster__overlay']}>
        <Text view="p-20" color="primary">
          Find the perfect food and{' '}
          <Text tag="a" view="link">
            drink ideas
          </Text>{' '}
          for every occasion, from{' '}
          <Text tag="a" view="link">
            weeknight dinners
          </Text>{' '}
          to{' '}
          <Text tag="a" view="link">
            holiday feasts
          </Text>
          .
        </Text>
      </div>
    </div>
  );
};

export default Poster;
