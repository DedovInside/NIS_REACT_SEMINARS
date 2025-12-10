import { useState } from 'react';
import { useAddUserMutation } from '../services/api';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await addUser({ name, email }).unwrap();
      setName('');
      setEmail('');
      alert('Пользователь успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      alert('Ошибка при добавлении пользователя');
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
