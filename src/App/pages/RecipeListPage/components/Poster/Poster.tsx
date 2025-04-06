import React from 'react';
import styles from './Poster.module.scss';
import PosterImage from '/assets/poster.png';

const Poster: React.FC = () => {
  return (
    <div className={styles['poster']}>
      <img src={PosterImage} alt="Recipes banner" />
      <div className={styles['poster__overlay']}>
        Find the perfect food and <a>drink ideas</a> for every occasion, from{' '}
        <a>weeknight dinners</a> to <a>holiday feasts</a>.
      </div>
    </div>
  );
};

export default Poster;
