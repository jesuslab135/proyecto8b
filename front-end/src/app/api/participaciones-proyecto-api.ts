// src/app/api/oportunidades-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const PARTPROY_ENDPOINT = `${API_URL}/api/participaciones-proyecto`;

export async function fetchParticipacionesProyectos() {
  const token = localStorage.getItem('token');
  const res = await fetch(PARTPROY_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener participaciones de proyectos');
  return data;
}

export async function getParticipacionProyectoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PARTPROY_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener participaciones de proyectos');
  return data;
}

export async function createParticipacionProyecto(input: {
  proyecto_id: number;
  usuario_id: number;
  rol_id: number;
  estado: string;
  invitado_por: number;
  fecha_invitacion?: Date; // ISO string
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(PARTPROY_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear participaciones de proyectos');
  return data;
}

export async function updateParticipacionProyecto(id: number, input: Partial<{
  proyecto_id: number;
  usuario_id: number;
  rol_id: number;
  estado: string;
  invitado_por: number;
  fecha_invitacion?: Date; // ISO string
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PARTPROY_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar participacion de proyecto');
  return data;
}

export async function deleteParticipacionProyecto(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PARTPROY_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar participacion de proyecto');
  return data;
}
