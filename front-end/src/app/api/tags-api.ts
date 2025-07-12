// src/app/api/tags-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const TAGS_ENDPOINT = `${API_URL}/api/tags`;

export async function fetchTags() {
  const token = localStorage.getItem('token');
  const res = await fetch(TAGS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener tags');
  return data;
}

export async function createTag(input: { nombre: string }) {
  const token = localStorage.getItem('token');
  const res = await fetch(TAGS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear tag');
  return data;
}

export async function updateTag(id: number, input: { nombre?: string }) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${TAGS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar tag');
  return data;
}

export async function deleteTag(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${TAGS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar tag');
  return data;
}
