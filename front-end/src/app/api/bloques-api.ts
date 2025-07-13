// src/app/api/bloques-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const BLOQUES_ENDPOINT = `${API_URL}/api/bloques`;

export async function fetchBloques() {
  const token = localStorage.getItem('token');
  const res = await fetch(BLOQUES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener bloques');
  return data;
}

export async function getBloqueById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BLOQUES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener bloque');
  return data;
}

export async function createBloque(input: {
  pagina_id?: number;
  tipo: string;
  contenido: any;
  orden?: number;
  creado_por?: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(BLOQUES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear bloque');
  return data;
}

export async function updateBloque(id: number, input: Partial<{
  pagina_id?: number;
  tipo?: string;
  contenido?: any;
  orden?: number;
  creado_por?: number;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BLOQUES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar bloque');
  return data;
}

export async function deleteBloque(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BLOQUES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar bloque');
  return data;
}
