import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const TAGGABLES_ENDPOINT = `${API_URL}/api/taggables`;

export async function fetchTaggables() {
  const token = localStorage.getItem('token');
  const res = await fetch(TAGGABLES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener taggables');
  return data;
}

export async function getTaggableById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${TAGGABLES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener taggable');
  return data;
}

export async function createTaggable(input: {
  tag_id: number;
  objeto_id: number;
  tipo_objeto: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(TAGGABLES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear taggable');
  return data;
}

export async function updateTaggable(id: number, input: {
  tag_id?: number;
  objeto_id?: number;
  tipo_objeto?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${TAGGABLES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar taggable');
  return data;
}

export async function deleteTaggable(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${TAGGABLES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar taggable');
  return data;
}
