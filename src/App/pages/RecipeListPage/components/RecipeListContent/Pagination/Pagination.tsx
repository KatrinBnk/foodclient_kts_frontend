import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    pages.push(1);

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (right < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.pagination__button, styles['pagination__button--prev'], {
          [styles['pagination__button--disabled']]: currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className={styles['pagination__icon--prev']} />
      </button>

      <div className={styles.pagination__pages}>
        {pages.map((page, index) =>
          typeof page === 'string' ? (
            <span key={`ellipsis-${index}`} className={styles.pagination__ellipsis}>
              {page}
            </span>
          ) : (
            <button
              key={page}
              className={classNames(styles.pagination__page, {
                [styles['pagination__page--active']]: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={classNames(styles.pagination__button, styles['pagination__button--next'], {
          [styles['pagination__button--disabled']]: currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowLeftIcon className={styles['pagination__icon--next']} />
      </button>
    </div>
  );
};

export default Pagination;
