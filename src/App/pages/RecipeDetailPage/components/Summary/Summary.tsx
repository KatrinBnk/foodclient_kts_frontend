import React from 'react';
import styles from './Summary.module.scss';

interface SummaryProps {
  text: string;
}

//TODO: попытки обработать если всречен html внутри summary
const parseSimpleHtml = (text: string): React.ReactNode[] => {
  // Разбиваем текст на параграфы
  return text
    .split('</p>')
    .map((paragraph, index) => {
      const cleanParagraph = paragraph.replace('<p>', '').trim();
      if (!cleanParagraph) return null;

      // Обрабатываем текст внутри параграфа
      const processText = (content: string): React.ReactNode[] => {
        // Сначала ищем ссылки
        const parts: React.ReactNode[] = [];
        const linkRegex = /<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(content)) !== null) {
          // Добавляем текст до ссылки
          if (match.index > lastIndex) {
            const textBeforeLink = content.slice(lastIndex, match.index);
            // Обрабатываем жирный текст в части до ссылки
            parts.push(...processBoldText(textBeforeLink));
          }

          // Добавляем ссылку
          parts.push(
            <a
              key={`link-${match.index}`}
              href={match[1]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {match[2]}
            </a>
          );

          lastIndex = linkRegex.lastIndex;
        }

        // Добавляем оставшийся текст после последней ссылки
        if (lastIndex < content.length) {
          const remainingText = content.slice(lastIndex);
          parts.push(...processBoldText(remainingText));
        }

        return parts;
      };

      // Обработка жирного текста
      const processBoldText = (text: string): React.ReactNode[] => {
        const boldParts = text.split(/<\/?b>/);
        return boldParts.map((part, boldIndex) => {
          return boldIndex % 2 === 1 ? <strong key={`bold-${boldIndex}`}>{part}</strong> : part;
        });
      };

      return <p key={`p-${index}`}>{processText(cleanParagraph)}</p>;
    })
    .filter(Boolean);
};

const Summary: React.FC<SummaryProps> = ({ text }) => {
  return <div className={styles.summary}>{parseSimpleHtml(text)}</div>;
};

export default Summary;
