import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    };

    const containerClass = classNames(
      styles['input'],
      {
        [styles['input--with-icon']]: !!afterSlot,
        [styles['input--disabled']]: disabled,
      },
      className
    );

    return (
      <div className={containerClass}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          className={styles['input__element']}
          {...props}
        />
        {afterSlot && <div className={styles['input__after-slot']}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
