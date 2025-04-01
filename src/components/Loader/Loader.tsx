import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер лоадера */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  /** Цвет лоадера */
  color?: string;
};

export const Loader: React.FC<LoaderProps> = ({
                                                size = 'l',
                                                className,
                                                color
                                              }) => {
  const loaderClasses = classNames(
    styles['loader'], // Блок
    styles[`loader--size-${size}`], // Модификатор (например, loader--size-s)
    className
  );

  const style = color ? { '--color-loader': color } as React.CSSProperties : undefined;

  return (
    <div
      className={loaderClasses}
      style={style}
      data-testid="loader"
    />
  );
};

export default Loader;