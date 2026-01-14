import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import './UnreadMessages.css';

const UnreadMessages: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [count, setCount] = useState<number | null>(null);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    // Случайное число 1-10 при монтировании
    const random = Math.floor(Math.random() * 10) + 1;
    setCount(random);

    // Форматирование даты с учётом текущей локализации
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);

    setDate(formattedDate);
  }, [i18n.language]);

  if (count === null) return null;

  return (
    <div className="unread-messages">
      <div className="message-card">
        <div className="message-icon">
          <EmailIcon sx={{ fontSize: 32 }} />
          <span className="message-count-badge">{count}</span>
        </div>

        <div className="message-content">
          <p className="message-text">
            {t('unreadMessages', { count })}
          </p>
          <p className="message-date">
            {t('lastMessageDate', { date })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnreadMessages;
