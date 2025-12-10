import { useState } from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import AxiosFetch from './components/AxiosFetch';
import type { User } from './services/api';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Управление пользователями</h1>
        <p className="subtitle">RTK Query + Axios Demo</p>
      </header>

      <main className="app-main">
        <AddUserForm />
        <AxiosFetch />
        <UserList onEdit={setEditingUser} />
      </main>

      <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} />
    </div>
  );
}

export default App;
