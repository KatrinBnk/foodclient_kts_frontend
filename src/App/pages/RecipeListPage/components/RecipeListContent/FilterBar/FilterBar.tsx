import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import CheckBox from '@components/CheckBox';
import Text from '@components/Text';
import Switcher from '@components/Switcher';
import Button from '@components/Button';
import ToastNotification from '@components/ToastNotification';
import styles from './FilterBar.module.scss';
import { useDebouncedCallback } from '@utils/useDebouncedCallback.ts';
import { weightGoalOptions, totalTimeOptions, WeightGoal, TotalTime } from './constants';
import { MEDIAN_VALUES } from '@configs/medianValies';

const FilterBar: React.FC = () => {
  const { recipeStore, categoryStore } = useStore();
  const navigate = useNavigate();
  const [pendingCategories, setPendingCategories] = React.useState<number[]>(
    categoryStore.selectedIds
  );
  const [searchQuery, setSearchQuery] = React.useState(recipeStore.searchQuery);
  const [weightGoal, setWeightGoal] = React.useState<WeightGoal>('neutral');
  const [totalTime, setTotalTime] = React.useState<TotalTime>('medium');
  const [showNoRecipesToast, setShowNoRecipesToast] = useState(false);

  useEffect(() => {
    categoryStore.initialize();
  }, [categoryStore]);

  useEffect(() => {
    const { calories } = recipeStore;
    if (calories.max === MEDIAN_VALUES.CALORIE_CONTENT) {
      setWeightGoal('low');
    } else if (calories.min === MEDIAN_VALUES.CALORIE_CONTENT) {
      setWeightGoal('high');
    } else {
      setWeightGoal('neutral');
    }

    const { totalTime: totalTimeRange } = recipeStore;
    if (totalTimeRange.max === MEDIAN_VALUES.TOTAL_TIME) {
      setTotalTime('quick');
    } else if (totalTimeRange.min === MEDIAN_VALUES.TOTAL_TIME) {
      setTotalTime('long');
    } else {
      setTotalTime('medium');
    }
  }, [recipeStore]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const debouncedFetchRecipes = useDebouncedCallback(() => {
    if (searchQuery !== recipeStore.searchQuery) {
      recipeStore.setSearchQuery(searchQuery);
    }
  }, 500);

  React.useEffect(() => {
    debouncedFetchRecipes();
  }, [searchQuery, debouncedFetchRecipes]);

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const categoryIds = selectedOptions.map((option) => parseInt(option.key, 10));
    setPendingCategories(categoryIds);
  };

  const handleDropdownClose = () => {
    if (JSON.stringify(pendingCategories) !== JSON.stringify(categoryStore.selectedIds)) {
      categoryStore.setSelectedIds(pendingCategories);
      recipeStore.setSelectedCategories(pendingCategories);
    }
  };

  const handleVegetarianChange = (checked: boolean) => {
    recipeStore.setIsVegetarian(checked);
  };

  const handleWeightGoalChange = (goal: WeightGoal) => {
    setWeightGoal(goal);
    switch (goal) {
      case 'low':
        recipeStore.setCalories({ max: MEDIAN_VALUES.CALORIE_CONTENT });
        break;
      case 'high':
        recipeStore.setCalories({ min: MEDIAN_VALUES.CALORIE_CONTENT });
        break;
      default:
        recipeStore.setCalories({});
    }
  };

  const handleTotalTimeChange = (time: TotalTime) => {
    setTotalTime(time);
    switch (time) {
      case 'quick':
        recipeStore.setTotalTime({ max: MEDIAN_VALUES.TOTAL_TIME });
        break;
      case 'long':
        recipeStore.setTotalTime({ min: MEDIAN_VALUES.TOTAL_TIME });
        break;
      default:
        recipeStore.setTotalTime({});
    }
  };

  const handleRandomRecipe = () => {
    const recipes = recipeStore.recipes;
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      navigate(`/recipe/${recipes[randomIndex].documentId}`);
    } else {
      setShowNoRecipesToast(true);
    }
  };

  return (
    <>
      <div className={styles['filter-bar']}>
        <SearchBar value={searchQuery} onChange={handleSearch} />
        <div className={styles['filter-bar__params']}>
          <div className={styles['filter-bar__vegetarian']}>
            <label className={styles['filter-bar__vegetarian-label']}>
              <Text view="p-18" tag="span">
                Only vegetarian
              </Text>
              <CheckBox checked={recipeStore.isVegetarian} onChange={handleVegetarianChange} />
            </label>
          </div>
          <Switcher<WeightGoal>
            options={weightGoalOptions}
            value={weightGoal}
            onChange={handleWeightGoalChange}
            className={styles['filter-bar__weight-goal']}
          />
          <MultiDropdown
            className={styles['filter-bar__categories']}
            options={categoryStore.categoryOptions}
            value={categoryStore.categoryOptions.filter((option) =>
              pendingCategories.includes(parseInt(option.key, 10))
            )}
            onChange={handleCategoryChange}
            onClose={handleDropdownClose}
            getTitle={(value) => (value.length ? `Categories: ${value.length}` : 'Categories')}
          />
          <Switcher<TotalTime>
            options={totalTimeOptions}
            value={totalTime}
            onChange={handleTotalTimeChange}
            className={styles['filter-bar__total-time']}
          />
          <Button onClick={handleRandomRecipe} className={styles['filter-bar__random']}>
            Random recipe
          </Button>
        </div>
      </div>
      {showNoRecipesToast && (
        <ToastNotification
          message="There are no recipes available, update the search parameters."
          type="error"
          duration={3000}
          onClose={() => setShowNoRecipesToast(false)}
        />
      )}
    </>
  );
};

export const FilterBarComponent = observer(FilterBar);
export default FilterBarComponent;
