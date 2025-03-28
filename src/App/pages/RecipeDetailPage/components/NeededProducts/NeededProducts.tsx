import React from 'react';
import styles from './NeededProducts.module.scss';
import LadleIcon from '@components/Icons/LadleIcon';
import ClocheIcon from '@components/Icons/ClocheIcon';
import { Ingradient, Equipment } from '@/types';

interface NeededProductsProps {
  ingredients: Ingradient[];
  equipment: Equipment[];
}

//NOTE: Как должен вести себя, если текст слишком длинный (не влез на одну строку)?

const NeededProducts: React.FC<NeededProductsProps> = ({ ingredients, equipment }) => {
  return (
    <div className={styles.neededProducts}>
      <div className={styles.ingredients}>
        <h2 className={styles.ingredients__title}>Ingredients</h2>
        <div className={styles.ingredients__list}>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredients__item}>
              <span className={styles.ingredients__item__icon}>
                <ClocheIcon width={24} height={16} color="brand" />
              </span>
              <span className={styles.ingredients__item__amount}>
                {ingredient.amount} {ingredient.unit}
              </span>
              <span className={styles.ingredients__item__name}>{ingredient.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.equipment}>
        <h2 className={styles.equipment__title}>Equipment</h2>
        <div className={styles.equipment__list}>
          {equipment.map((item, index) => (
            <div key={index} className={styles.equipment__item}>
              <span className={styles.equipment__item__icon}>
                <LadleIcon width={24} height={24} color="brand" />
              </span>
              <span className={styles.equipment__item__name}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeededProducts;
