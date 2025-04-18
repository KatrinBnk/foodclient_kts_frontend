import Text from '@components/Text';
import classNames from 'classnames';
import styles from './Switcher.module.scss';

export interface SwitcherOption<T extends string> {
  value: T;
  label: string;
}

interface SwitcherProps<T extends string> {
  options: SwitcherOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

const Switcher = <T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SwitcherProps<T>) => {
  const activeIndex = options.findIndex((option) => option.value === value);

  return (
    <div className={classNames(styles.switcher, className)}>
      <div className={styles.switcher__switch}>
        {options.map((option) => (
          <div
            key={option.value}
            className={classNames(styles.switcher__option, {
              [styles['switcher__option_active']]: option.value === value,
            })}
            onClick={() => onChange(option.value)}
          >
            <Text
              view="p-14"
              tag="span"
              color={option.value === value ? 'button-text' : 'secondary'}
            >
              {option.label}
            </Text>
          </div>
        ))}
        <div
          className={classNames(styles.switcher__slider, {
            [styles[`switcher__slider_position-${activeIndex}`]]: true,
          })}
        />
      </div>
      {label && (
        <Text view="p-14" tag="span" className={styles.switcher__label}>
          {label}
        </Text>
      )}
    </div>
  );
};

export default Switcher;
