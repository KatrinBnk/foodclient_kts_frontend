import React, { useEffect, useState } from 'react';
import styles from './ToastNotification.module.scss';
import Text from '@components/Text';

export interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
      <Text tag="p" view="p-14" color="button-text">
        {message}
      </Text>
    </div>
  );
};

export default ToastNotification;
