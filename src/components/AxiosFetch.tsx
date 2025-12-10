import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axios';
import { usersApi } from '../services/api';
import type { User } from '../services/api';

const AxiosFetch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    // Создаем новый AbortController для этого запроса
    abortControllerRef.current = new AbortController();
    const controller = abortControllerRef.current;
    
    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      // Добавляем искусственную задержку 2 секунды для демонстрации AbortController
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 2000);
        controller.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
      
      const response = await axiosInstance.get<User[]>('users', {
        signal: controller.signal,
      });
      setUsers(response.data);
      // Сбрасываем кэш RTK Query при загрузке через Axios
      dispatch(usersApi.util.resetApiState());
      setLoading(false);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        setError('Запрос был отменен');
        console.log('Запрос отменен пользователем');
      } else {
        setError('Ошибка при загрузке данных');
        console.error('Ошибка:', err);
      }
      setLoading(false);
    }
  };

  const cancelFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="axios-fetch">
      <h2>Загрузка через Axios с AbortController</h2>
      <div className="axios-controls">
        <button 
          onClick={fetchUsers} 
          disabled={loading}
          className="btn-fetch"
        >
          {loading ? 'Загрузка...' : 'Загрузить пользователей'}
        </button>
        <button 
          onClick={cancelFetch} 
          disabled={!loading}
          className="btn-abort"
        >
          Отменить загрузку
        </button>
      </div>

      {error && <div className="axios-error">{error}</div>}

      {users.length > 0 && (
        <div className="axios-results">
          <h3>Загружено пользователей: {users.length}</h3>
          <div className="users-list">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="user-item">
                <strong>{user.name}</strong> - {user.email}
              </div>
            ))}
            {users.length > 5 && (
              <div className="more-users">... и еще {users.length - 5}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AxiosFetch;
