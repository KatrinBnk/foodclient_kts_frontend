import React from 'react';
import styles from './Directions.module.scss';
import { Direction } from '@/types';
import Text from '@components/Text';

interface DirectionsProps {
  directions: Direction[];
}

const Directions: React.FC<DirectionsProps> = ({ directions }) => {
  return (
    <div className={styles['directions']}>
      <Text view="p-20" tag="h2" weight="bold" className={styles['directions__title']}>
        Directions
      </Text>
      <div className={styles['directions__list']}>
        {directions.map((direction, index) => (
          <div key={direction.id} className={styles['directions__step']}>
            <Text view="p-16" weight="bold" className={styles['directions__step__number']}>
              Step {index + 1}
            </Text>
            <Text view="p-14" className={styles['directions__step__description']}>
              {direction.description}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directions;
