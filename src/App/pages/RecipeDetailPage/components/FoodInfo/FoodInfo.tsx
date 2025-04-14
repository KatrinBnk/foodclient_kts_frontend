import React from 'react';
import styles from './FoodInfo.module.scss';
import Text from '@components/Text';

interface FoodInfoItem {
  label: string;
  data: string;
  gridColumn: number;
  gridRow: number;
}

interface FoodInfoProps {
  imageUrl: string;
  imageAlt: string;
  info: FoodInfoItem[];
}

const FoodInfo: React.FC<FoodInfoProps> = ({ imageUrl, imageAlt, info }) => {
  return (
    <div className={styles['food-info']}>
      <img src={imageUrl} alt={imageAlt} />
      <div className={styles['food-info__list']}>
        {info.map((item) => (
          <div
            key={item.label}
            className={styles['food-info__item']}
            style={{
              gridColumn: item.gridColumn,
              gridRow: item.gridRow,
            }}
          >
            <Text view="p-16" color="primary" className={styles['food-info__label']}>
              {item.label}
            </Text>
            <Text view="p-16" weight="medium" color="accent" className={styles['food-info__data']}>
              {item.data}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodInfo;
