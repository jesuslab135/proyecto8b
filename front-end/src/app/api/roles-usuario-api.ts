// src/app/api/roles-usuario-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const ROLES_USUARIO_ENDPOINT = `${API_URL}/api/roles-usuario`;

export async function fetchRolesUsuario() {
  const token = localStorage.getItem('token');
  const res = await fetch(ROLES_USUARIO_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener roles de usuario');
  return data;
}

export async function getRolUsuarioById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_USUARIO_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener rol');
  return data;
}

export async function createRolUsuario(input: { nombre: string }) {
  const token = localStorage.getItem('token');
  const res = await fetch(ROLES_USUARIO_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const {id, ...data} = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear rol');
  return data;
}

export async function updateRolUsuario(id: number, input: { nombre?: string }) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_USUARIO_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar rol');
  return data;
}

export async function deleteRolUsuario(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_USUARIO_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar rol');
  return data;
}
