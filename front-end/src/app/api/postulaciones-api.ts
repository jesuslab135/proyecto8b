// src/app/api/oportunidades-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const POSTULACIONES_ENDPOINT = `${API_URL}/api/postulaciones`;

export async function fetchPostulaciones() {
  const token = localStorage.getItem('token');
  const res = await fetch(POSTULACIONES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener postulaciones');
  return data;
}

export async function getPostulacionById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener postulacion');
  return data;
}

export async function createPostulacion(input: {
  usuario_id: number;
  oportunidad_id: number;
  mensaje: string;
  estado: string;
  fecha?: Date; // ISO string
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(POSTULACIONES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const {id, fecha, ...data} = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear postulacion');
  return data;
}

export async function updatePostulacion(id: number, input: Partial<{
  titulo: string;
  descripcion: string;
  tipo: string;
  universidad_id: number;
  fecha_limite: string;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar postulacion');
  return data;
}

export async function deletePostulacion(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar postulacion');
  return data;
}
