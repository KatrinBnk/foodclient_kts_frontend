import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Input from '@/components/Input';
import styles from './MultiDropdown.module.scss';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  onClose?: () => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  onClose,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [localValue, setLocalValue] = useState<Option[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleOption = (option: Option) => {
    const isSelected = localValue.some((item) => item.key === option.key);
    const newValue = isSelected
      ? localValue.filter((item) => item.key !== option.key)
      : [...localValue, option];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setSearchValue(inputValue);
    setIsOpen(true);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      if (isOpen) {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <div
      className={classNames(styles.dropdown, className, {
        [styles.dropdown_disabled]: disabled,
        [styles.dropdown_open]: isOpen,
      })}
      ref={dropdownRef}
    >
      <Input
        value={searchValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={getTitle(localValue)}
        disabled={disabled}
        afterSlot={
          <div onClick={handleIconClick} className={styles.dropdown__arrow}>
            <ArrowLeftIcon />
          </div>
        }
      />
      {isOpen && !disabled && (
        <div className={styles.dropdown__options}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={classNames(styles.dropdown__option, {
                [styles['dropdown__option--selected']]: localValue.some(
                  (item) => item.key === option.key
                ),
              })}
              onClick={() => toggleOption(option)}
            >
              {option.value}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles.dropdown__empty}>Nothing found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
