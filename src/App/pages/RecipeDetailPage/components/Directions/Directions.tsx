import React from 'react';
import styles from './Directions.module.scss';
import { Direction } from '@/types';

interface DirectionsProps {
  directions: Direction[];
}

const Directions: React.FC<DirectionsProps> = ({ directions }) => {
  return (
    <div className={styles.directions}>
      <h2 className={styles.directions__title}>Directions</h2>
      <div className={styles.directions__list}>
        {directions.map((direction, index) => (
          <div key={direction.id} className={styles.directions__step}>
            <span className={styles.directions__step__number}>Step {index + 1}</span>
            <p className={styles.directions__step__description}>{direction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directions;
