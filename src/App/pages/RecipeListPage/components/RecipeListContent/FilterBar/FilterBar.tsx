import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks';
import SearchBar from './SearchBar';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import styles from './FilterBar.module.scss';
import { useDebouncedCallback } from '@utils/useDebouncedCallback.ts';

const FilterBar: React.FC = () => {
  const { recipeStore, categoryStore } = useStore();
  const [pendingCategories, setPendingCategories] = React.useState<number[]>(
    categoryStore.selectedIds
  );
  const [searchQuery, setSearchQuery] = React.useState(recipeStore.searchQuery);

  useEffect(() => {
    categoryStore.initialize();
  }, [categoryStore]);

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

  return (
    <div className={styles.filterBar}>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <MultiDropdown
        className={styles.filterBar__categories}
        options={categoryStore.categoryOptions}
        value={categoryStore.categoryOptions.filter((option) =>
          pendingCategories.includes(parseInt(option.key, 10))
        )}
        onChange={handleCategoryChange}
        onClose={handleDropdownClose}
        getTitle={(value) => (value.length ? `Categories: ${value.length}` : 'Categories')}
      />
    </div>
  );
};

export const FilterBarComponent = observer(FilterBar);
export default FilterBarComponent;
