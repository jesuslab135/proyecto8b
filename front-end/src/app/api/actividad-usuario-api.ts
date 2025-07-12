import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const ACTIVIDAD_ENDPOINT = `${API_URL}/api/actividad-usuario`;

export async function fetchActividadUsuario() {
  const token = localStorage.getItem('token');
  const res = await fetch(ACTIVIDAD_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener actividad de usuario');
  return data;
}

export async function getActividadUsuarioById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ACTIVIDAD_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener actividad');
  return data;
}

export async function createActividadUsuario(input: {
  usuario_id: number;
  tipo_actividad: string;
  objeto_id: number;
  contexto: string;
  fecha?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(ACTIVIDAD_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear actividad');
  return data;
}

export async function updateActividadUsuario(id: number, input: {
  usuario_id?: number;
  tipo_actividad?: string;
  objeto_id?: number;
  contexto?: string;
  fecha?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ACTIVIDAD_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar actividad');
  return data;
}

export async function deleteActividadUsuario(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ACTIVIDAD_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar actividad');
  return data;
}
