import { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '../services/api';
import type { User } from '../services/api';

interface EditUserFormProps {
  user: User | null;
  onClose: () => void;
}

const EditUserForm = ({ user, onClose }: EditUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await updateUser({ id: user.id, data: { name, email } }).unwrap();
      alert('Пользователь успешно обновлен!');
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      alert('Ошибка при обновлении пользователя');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Редактировать пользователя</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="edit-name">Имя:</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-email">Email:</label>
            <input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              disabled={isLoading}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isLoading}>
              Отмена
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
