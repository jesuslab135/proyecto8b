import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const USERS_ENDPOINT = `${API_URL}/api/users`;

export async function fetchUsers() {
  const token = localStorage.getItem('token');
  const res = await fetch(USERS_ENDPOINT, {
    method: 'GET',
    headers: {
      'Authorization': token!,
      'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to fetch users');
  return data;
}

export async function getUserById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': token!,
      'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to get user');
  return data;
}

export async function createUser(user: {
  email: string;
  password: string;
  role?: string;
  name?: string;
  address?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(USERS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to create user');
  return data;
}

export async function updateUser(id: number, updates: {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
  address?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to update user');
  return data;
}

export async function deleteUser(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token!,
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to delete user');
  return data;
}
