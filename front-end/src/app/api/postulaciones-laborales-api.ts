import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const POSTULACIONES_LABORALES_ENDPOINT = `${API_URL}/api/postulaciones-laborales`;

export async function fetchPostulacionesLaborales() {
  const token = localStorage.getItem('token');
  const res = await fetch(POSTULACIONES_LABORALES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las postulaciones laborales');
  return data;
}

export async function getPostulacionesLaboralesById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_LABORALES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las postulaciones laborales');
  return data;
}

export async function createPostulacionesLaborales(input: {
  id: number;
  usuario_id: number;
  mensaje: string;
  estado: string;
  fecha: Date;
  oferta_laboral_id: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(POSTULACIONES_LABORALES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear una postulacion laboral');
  return data;
}

export async function updatePostulacionesLaborales(id: number, input: {
  id: number;
  usuario_id: number;
  mensaje: string;
  estado: string;
  fecha: Date;
  oferta_laboral_id: number;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_LABORALES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar la postulacion laboral');
  return data;
}

export async function deletePostulacionesLaborales(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${POSTULACIONES_LABORALES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar la postulacion laboral');
  return data;
}
