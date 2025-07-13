// src/app/api/hilos-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const HILOS_ENDPOINT = `${API_URL}/api/hilos`;

export async function fetchHilos() {
  const token = localStorage.getItem('token');
  const res = await fetch(HILOS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener hilos');
  return data;
}

export async function getHiloById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${HILOS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener hilo');
  return data;
}

export async function createHilo(input: {
  foro_id: number;
  titulo: string;
  contenido: string;
  creador_id: number;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(HILOS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear hilo');
  return data;
}

export async function updateHilo(id: number, input: Partial<{
  foro_id: number;
  titulo: string;
  contenido: string;
  creador_id: number;
  creado_en: Date;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${HILOS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar hilo');
  return data;
}

export async function deleteHilo(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${HILOS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar hilo');
  return data;
}
