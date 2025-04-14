import React from 'react';
import styles from './NeededProducts.module.scss';
import LadleIcon from '@components/Icons/LadleIcon';
import ClocheIcon from '@components/Icons/ClocheIcon';
import { Ingradient, Equipment } from '@/types';
import Text from '@components/Text';

interface NeededProductsProps {
  ingredients: Ingradient[];
  equipment: Equipment[];
}

//NOTE: Как должен вести себя, если текст слишком длинный (не влез на одну строку)?

const NeededProducts: React.FC<NeededProductsProps> = ({ ingredients, equipment }) => {
  return (
    <div className={styles['needed-products']}>
      <div className={styles['needed-products__ingredients']}>
        <Text
          view="p-24"
          tag="h2"
          weight="bold"
          className={styles['needed-products__ingredients-title']}
        >
          Ingredients
        </Text>
        <div className={styles['needed-products__ingredients-list']}>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles['needed-products__ingredients-item']}>
              <span className={styles['needed-products__ingredients-item-icon']}>
                <ClocheIcon width={24} height={16} color="brand" />
              </span>
              <Text
                view="p-16"
                tag="span"
                weight="medium"
                color="accent"
                className={styles['needed-products__ingredients-item-amount']}
              >
                {ingredient.amount} {ingredient.unit}
              </Text>
              <Text
                view="p-16"
                tag="span"
                color="primary"
                className={styles['needed-products__ingredients-item-name']}
              >
                {ingredient.name}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['needed-products__divider']} />

      <div className={styles['needed-products__equipment']}>
        <Text
          view="p-24"
          tag="h2"
          weight="bold"
          className={styles['needed-products__equipment-title']}
        >
          Equipment
        </Text>
        <div className={styles['needed-products__equipment-list']}>
          {equipment.map((item, index) => (
            <div key={index} className={styles['needed-products__equipment-item']}>
              <span className={styles['needed-products__equipment-item-icon']}>
                <LadleIcon width={24} height={24} color="brand" />
              </span>
              <Text
                view="p-16"
                tag="span"
                color="primary"
                className={styles['needed-products__equipment-item-name']}
              >
                {item.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeededProducts;
