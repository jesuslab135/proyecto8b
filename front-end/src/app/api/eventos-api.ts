// src/app/api/eventos-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos`;

export async function fetchEventos() {
  const token = localStorage.getItem('token');
  const res = await fetch(EVENTOS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener eventos');
  return data;
}

export async function getEventoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EVENTOS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener evento');
  return data;
}

export async function createEvento(input: {
  titulo: string;
  descripcion: string;
  tipo: string;
  creador_id: number;
  universidad_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  enlace_acceso?: string | null;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(EVENTOS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const {id, ...data} = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear evento');
  return data;
}

export async function updateEvento(id: number, input: Partial<{
  titulo: string;
  descripcion: string;
  tipo: string;
  creador_id: number;
  universidad_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  enlace_acceso: string | null;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EVENTOS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar evento');
  return data;
}

export async function deleteEvento(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EVENTOS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar evento');
  return data;
}