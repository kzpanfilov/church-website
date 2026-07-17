import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/client';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await login(username, password);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/admin');
    } catch {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="login-form">
      <h2>&#128274; Вход в админ-панель</h2>
      {error && <p style={{ color: '#c62828', textAlign: 'center', marginBottom: 16 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 12 }}>
          Войти
        </button>
      </form>
    </div>
  );
}
