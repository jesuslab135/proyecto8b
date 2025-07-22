// src/app/api/tokens-iniciales-acceso-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const ENDPOINT = `${API_URL}/api/tokens-iniciales-acceso`;

export async function fetchTokensInicialesAcceso() {
  const token = localStorage.getItem('token');
  const res = await fetch(ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener tokens');
  return data;
}

export async function getTokenInicialAccesoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener token');
  return data;
}

export async function createTokenInicialAcceso(input: {
  usuario_id: number;
  token_acceso: string;
  usado?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear token');
  return data;
}

export async function updateTokenInicialAcceso(id: number, input: {
  token_acceso?: string;
  usado?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar token');
  return data;
}

export async function deleteTokenInicialAcceso(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar token');
  return data;
}
