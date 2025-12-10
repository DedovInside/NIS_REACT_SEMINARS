import { useGetUsersQuery } from '../services/api';
import type { User } from '../services/api';

interface UserListProps {
  onEdit: (user: User) => void;
}

const UserList = ({ onEdit }: UserListProps) => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) {
    return <div className="loading">Загрузка пользователей...</div>;
  }

  if (isError) {
    return <div className="error">Ошибка загрузки: {error.toString()}</div>;
  }

  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      <div className="users-grid">
        {users?.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-email">{user.email}</p>
            </div>
            <button onClick={() => onEdit(user)} className="btn-edit">
              Редактировать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
