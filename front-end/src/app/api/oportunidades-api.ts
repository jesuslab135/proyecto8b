// src/app/api/oportunidades-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const OPORTUNIDADES_ENDPOINT = `${API_URL}/api/oportunidades`;

export async function fetchOportunidades() {
  const token = localStorage.getItem('token');
  const res = await fetch(OPORTUNIDADES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener oportunidades');
  return data;
}

export async function getOportunidadById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener oportunidad');
  return data;
}

export async function createOportunidad(input: {
  titulo: string;
  descripcion: string;
  tipo: string;
  universidad_id: number;
  fecha_limite: string; // ISO string
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(OPORTUNIDADES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear oportunidad');
  return data;
}

export async function updateOportunidad(id: number, input: Partial<{
  titulo: string;
  descripcion: string;
  tipo: string;
  universidad_id: number;
  fecha_limite: string;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar oportunidad');
  return data;
}

export async function deleteOportunidad(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar oportunidad');
  return data;
}
