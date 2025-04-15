import React from 'react';
import styles from './NeededProducts.module.scss';
import LadleIcon from '@components/Icons/LadleIcon';
import ClocheIcon from '@components/Icons/ClocheIcon';
import Text from '@components/Text';
import Input from '@components/Input';
import { Ingradient, Equipment } from '@types';
import { useStore } from '@stores/hooks';

interface NeededProductsProps {
  ingredients: Ingradient[];
  equipment: Equipment[];
}

const NeededProducts: React.FC<NeededProductsProps> = ({ ingredients, equipment }) => {
  const { recipeDetailsStore } = useStore();

  return (
    <>
      <div className={styles['servings-control']}>
        <Text view="p-24" tag="h2" weight="bold">
          Servings
        </Text>
        <Input
          type="number"
          min="1"
          value={recipeDetailsStore.servings.toString()}
          onChange={(value) => recipeDetailsStore.setServings(Number(value))}
          className={styles['servings-input']}
        />
      </div>

      <div className={styles['needed-products']}>
        <div className={styles['needed-products__ingredients']}>
          <div className={styles['needed-products__header']}>
            <Text
              view="p-24"
              tag="h2"
              weight="bold"
              className={styles['needed-products__ingredients-title']}
            >
              Ingredients
            </Text>
          </div>
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
                  {Number(ingredient.amount.toFixed(2))} {ingredient.unit}
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
    </>
  );
};

export default NeededProducts;
