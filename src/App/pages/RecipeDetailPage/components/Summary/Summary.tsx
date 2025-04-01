import React from 'react';
import styles from './Summary.module.scss';
import parse from 'html-react-parser';

interface SummaryProps {
  text: string;
}

const Summary: React.FC<SummaryProps> = ({ text }) => {
  return <div className={styles.summary}>{parse(text)}</div>;
};

export default Summary;
