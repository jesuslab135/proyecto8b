// src/app/api/foros-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const FOROS_ENDPOINT = `${API_URL}/api/foros`;

export async function fetchForos() {
  const token = localStorage.getItem('token');
  const res = await fetch(FOROS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener foros');
  return data;
}

export async function getForoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener foro');
  return data;
}

export async function createForo(input: {
  nombre: string;
  descripcion?: string | null;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(FOROS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const {id, ...data} = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear foro');
  return data;
}

export async function updateForo(id: number, input: {
  nombre?: string;
  descripcion?: string | null;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar foro');
  return data;
}

export async function deleteForo(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar foro');
  return data;
}
