// src/app/api/universidades-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const UNIVERSIDADES_ENDPOINT = `${API_URL}/api/universidades`;

export async function fetchUniversidades() {
  const token = localStorage.getItem('token');
  const res = await fetch(UNIVERSIDADES_ENDPOINT, {
    headers: {
      'Authorization': `${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener universidades');
  return data;
}

export async function createUniversidad(input: {
  nombre: string;
  dominio_correo: string;
  logo_url?: string | null;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(UNIVERSIDADES_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear universidad');
  return data;
}

export async function updateUniversidad(id: number, input: {
  nombre?: string;
  dominio_correo?: string;
  logo_url?: string | null;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${UNIVERSIDADES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar universidad');
  return data;
}

export async function deleteUniversidad(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${UNIVERSIDADES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar universidad');
  return data;
}
