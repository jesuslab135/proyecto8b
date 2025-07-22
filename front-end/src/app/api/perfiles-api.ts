import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const PERFILES_ENDPOINT = `${API_URL}/api/perfiles`;

export async function fetchPerfiles() {
  const token = localStorage.getItem('token');
  const res = await fetch(PERFILES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener perfiles');
  return data;
}

export async function getPerfilById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PERFILES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener perfil');
  return data;
}

export async function createPerfil(input: {
  usuario_id: number;
  cv_url: string;
  skills: string;
  historial_participacion: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(PERFILES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear perfil');
  return data;
}

export async function updatePerfil(id: number, input: {
  usuario_id?: number;
  cv_url?: string;
  skills?: string;
  historial_participacion?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PERFILES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar perfil');
  return data;
}

export async function deletePerfil(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PERFILES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar perfil');
  return data;
}
