import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const FOROS_ENDPOINT = `${API_URL}/api/foros`;

export async function fetchForos() {
  const token = localStorage.getItem('token');
  const res = await fetch(FOROS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener los foros');
  return data;
}

export async function getForosById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener los foros');
  return data;
}

export async function createForos(input: {
  id: number;
  nombre: string;
  descripcion: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(FOROS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear un foro');
  return data;
}

export async function updateForos(id: number, input: {
  id: number;
  nombre: string;
  descripcion: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar foro');
  return data;
}

export async function deleteForos(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${FOROS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar el foro');
  return data;
}
