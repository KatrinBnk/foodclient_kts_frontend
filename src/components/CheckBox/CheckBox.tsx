import React from 'react';
import classNames from 'classnames';
import CheckIcon from '@components/Icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const checkBoxClass = classNames(
    styles.checkbox,
    { [styles['checkbox--disabled']]: disabled },
    { [styles['checkbox--checked']]: checked },
    className
  );

  const iconColor = disabled ? 'primary' : 'brand';

  return (
    <div className={checkBoxClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {checked && <CheckIcon className={styles.checkbox__icon} color={iconColor} />}
    </div>
  );
};

export default CheckBox;
