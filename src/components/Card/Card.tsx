import React from 'react';
import classNames from 'classnames';
import Text from '../Text';
import styles from './Card.module.scss';
import { useMediaQuery } from '@utils/useMediaQuery';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Слот для изображения в правом верхнем углу */
  imageSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  imageSlot,
}) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const cardClass = classNames(styles['card'], className);

  return (
    <div className={cardClass} onClick={onClick}>
      <div className={styles['card__header']}>
        {imageSlot && <div className={styles['card__image-slot']}>{imageSlot}</div>}
        <img src={image} alt="Card image" className={styles['card__image']} />
      </div>
      <div className={styles['card__body']}>
        <div className={styles['card__frame']}>
          {captionSlot && (
            <Text
              className={styles['card__caption']}
              view={isMobile ? 'p-14' : 'p-16'}
              weight="medium"
              color="secondary"
              maxLines={1}
            >
              {captionSlot}
            </Text>
          )}
          <Text
            className={styles['card__title']}
            view={isMobile ? 'p-16' : isTablet ? 'p-18' : 'p-20'}
            weight="bold"
            color="primary"
            maxLines={1}
          >
            {title}
          </Text>
          <Text
            className={styles['card__subtitle']}
            view={isMobile ? 'p-14' : 'p-16'}
            weight="normal"
            color="secondary"
            maxLines={isMobile ? 2 : isTablet ? 2 : 3}
          >
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={styles['card__footer']}>
            {contentSlot && (
              <div className={styles['card__content-wrapper']}>
                <Text
                  view={isMobile ? 'p-16' : 'p-20'}
                  weight="bold"
                  color="accent"
                  className={styles['card__content']}
                >
                  {contentSlot}
                </Text>
              </div>
            )}
            {actionSlot && (
              <div className={styles['card__action-wrapper']}>
                <div className={styles['card__action']}>{actionSlot}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
