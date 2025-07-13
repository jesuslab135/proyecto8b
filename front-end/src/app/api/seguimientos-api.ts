// src/app/api/seguimientos-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const SEGUIMIENTOS_ENDPOINT = `${API_URL}/api/seguimientos`;

export async function fetchSeguimientos() {
  const token = localStorage.getItem('token');
  const res = await fetch(SEGUIMIENTOS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener seguimientos');
  return data;
}

export async function getSeguimientoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${SEGUIMIENTOS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener seguimiento');
  return data;
}

export async function createSeguimiento(input: {
  seguidor_id: number;
  seguido_usuario_id?: number;
  seguido_proyecto_id?: number;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(SEGUIMIENTOS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear seguimiento');
  return data;
}

export async function updateSeguimiento(id: number, input: {
  seguidor_id?: number;
  seguido_usuario_id?: number;
  seguido_proyecto_id?: number;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${SEGUIMIENTOS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar seguimiento');
  return data;
}

export async function deleteSeguimiento(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${SEGUIMIENTOS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar seguimiento');
  return data;
}
