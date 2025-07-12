import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

export async function fetchUsers() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json' // (opcional, pero recomendable)
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || 'Failed to fetch users');
  }

  return data;
}
