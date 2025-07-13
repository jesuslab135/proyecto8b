// src/app/api/experiencia-usuario-api.ts
import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const EXPERIENCIA_ENDPOINT = `${API_URL}/api/experiencia-usuario`;

export async function fetchExperienciaUsuario() {
  const token = localStorage.getItem('token');
  const res = await fetch(EXPERIENCIA_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener experiencias');
  return data;
}

export async function getExperienciaUsuarioById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EXPERIENCIA_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener experiencia');
  return data;
}

export async function createExperienciaUsuario(input: {
  usuario_id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(EXPERIENCIA_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear experiencia');
  return data;
}

export async function updateExperienciaUsuario(id: number, input: Partial<{
  usuario_id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EXPERIENCIA_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar experiencia');
  return data;
}

export async function deleteExperienciaUsuario(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EXPERIENCIA_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar experiencia');
  return data;
}
