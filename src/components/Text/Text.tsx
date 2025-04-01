import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-24' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'link';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span' | 'a';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'button-text';
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** URL для ссылки */
  href?: string;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-16',
  tag: Tag = 'p',
  weight = 'normal',
  children,
  color = 'primary',
  maxLines,
  href,
}) => {
  const classes = classNames(
    styles.text,
    {
      [styles[`text--${view}`]]: view,
      [styles[`text--${weight}`]]: weight,
      [styles[`text--${color}`]]: color,
      [styles['text--max-lines']]: maxLines,
    },
    className
  );

  const style = maxLines ? ({ '--max-lines': maxLines } as React.CSSProperties) : undefined;

  return (
    <Tag className={classes} style={style} href={href}>
      {children}
    </Tag>
  );
};

export default Text;
