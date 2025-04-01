import React from 'react';
import styles from './Summary.module.scss';
import parse from 'html-react-parser';
import Text from '@components/Text';

interface SummaryProps {
  text: string;
}

const Summary: React.FC<SummaryProps> = ({ text }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === 'p') {
        return (
          <Text view="p-16" className={styles.paragraph}>
            {domNode.children.map((child: any, index: number) => {
              if (child.type === 'text') {
                return child.data;
              }
              if (child.name === 'a') {
                return (
                  <Text key={index} view="link" tag="a" color="primary" href={child.attribs.href}>
                    {child.children[0].data}
                  </Text>
                );
              }
              if (child.name === 'b') {
                return (
                  <Text key={index} view="p-16" weight="bold">
                    {child.children[0].data}
                  </Text>
                );
              }
              return child;
            })}
          </Text>
        );
      }
      return domNode;
    },
  };

  return <div className={styles.summary}>{parse(text, options)}</div>;
};

export default Summary;
