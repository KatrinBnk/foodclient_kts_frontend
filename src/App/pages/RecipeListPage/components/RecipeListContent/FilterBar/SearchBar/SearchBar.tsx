import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './SearchBar.module.scss';
import Input from '@components/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter dishes"
        className={styles.searchBar__input}
      />
    </div>
  );
};

export const SearchBarComponent = observer(SearchBar);
export default SearchBarComponent;
