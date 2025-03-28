import React from 'react';
import styles from './FoodInfo.module.scss';

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
    <div className={styles.foodInfo}>
      <img src={imageUrl} alt={imageAlt} />
      <div className={styles.list}>
        {info.map((item) => (
          <div
            key={item.label}
            className={styles.item}
            style={{
              gridColumn: item.gridColumn,
              gridRow: item.gridRow,
            }}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.data}>{item.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodInfo;
