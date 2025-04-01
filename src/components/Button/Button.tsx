import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Text from '@components/Text';

export type ButtonProps = {
    /** Текст кнопки */
    children: React.ReactNode;
    /** Состояние загрузки */
    loading?: boolean;
    /** Состояние блокировки */
    disabled?: boolean;
    /** Дополнительный класс */
    className?: string;
    /** Обработчик клика */
    onClick?: React.MouseEventHandler;
};

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  loading = false,
                                                  disabled = false,
                                                  className,
                                                  onClick,
                                              }) => {
    const buttonClasses = classNames(
      styles['button'],
      {
          [styles['button--loading']]: loading,
          [styles['button--disabled']]: disabled,
      },
      className
    );

    return (
      <button
        type="button"
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
      >
        <Text view="button" color="button-text">{children}</Text>
      </button>
    );
};

export default Button;