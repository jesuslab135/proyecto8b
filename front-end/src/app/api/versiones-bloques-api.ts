// src/app/api/versiones-bloques-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const VERSIONES_ENDPOINT = `${API_URL}/api/versiones-bloques`;

export async function fetchVersionesBloques() {
  const token = localStorage.getItem('token');
  const res = await fetch(VERSIONES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener versiones de bloques');
  return data;
}

export async function getVersionBloqueById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VERSIONES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener versión de bloque');
  return data;
}

export async function createVersionBloque(input: {
  bloque_id: number;
  contenido: any;
  editado_por?: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(VERSIONES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear versión de bloque');
  return data;
}

export async function updateVersionBloque(id: number, input: Partial<{
  contenido: any;
  editado_por?: number;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VERSIONES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar versión de bloque');
  return data;
}

export async function deleteVersionBloque(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VERSIONES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar versión de bloque');
  return data;
}
