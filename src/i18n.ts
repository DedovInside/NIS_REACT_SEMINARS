import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ресурсы с переводами
const resources = {
  ru: {
    translation: {
      unreadMessages_one: 'У вас {{count}} непрочитанное сообщение',
      unreadMessages_few: 'У вас {{count}} непрочитанных сообщения',
      unreadMessages_many: 'У вас {{count}} непрочитанных сообщений',
      unreadMessages_other: 'У вас {{count}} непрочитанных сообщений',
      lastMessageDate: '({{date}})',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    pluralSeparator: '_',
  });

export default i18n;
