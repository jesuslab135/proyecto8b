// src/app/api/relaciones-bloques-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const RELACIONES_ENDPOINT = `${API_URL}/api/relaciones-bloques`;

export async function fetchRelacionesBloques() {
  const token = localStorage.getItem('token');
  const res = await fetch(RELACIONES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener relaciones de bloques');
  return data;
}

export async function getRelacionBloqueById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RELACIONES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener relación');
  return data;
}

export async function createRelacionBloque(input: {
  bloque_padre_id: number;
  bloque_hijo_id: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(RELACIONES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear relación');
  return data;
}

export async function updateRelacionBloque(id: number, input: {
  bloque_padre_id?: number;
  bloque_hijo_id?: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RELACIONES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar relación');
  return data;
}

export async function deleteRelacionBloque(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RELACIONES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar relación');
  return data;
}
