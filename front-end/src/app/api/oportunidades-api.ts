import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const OPORTUNIDADES_ENDPOINT = `${API_URL}/api/oportunidades`;

export async function fetchOportunidades() {
  const token = localStorage.getItem('token');
  const res = await fetch(OPORTUNIDADES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las oportunidades');
  return data;
}

export async function getOportunidadesById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las oportunidades');
  return data;
}

export async function createOportunidades(input: {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  universidad_id: number;
  fecha_limite: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(OPORTUNIDADES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear una oportunidad');
  return data;
}

export async function updateOportunidades(id: number, input: {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  universidad_id: number;
  fecha_limite: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar la oportunidad');
  return data;
}

export async function deleteOportunidades(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OPORTUNIDADES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar la oportunidad');
  return data;
}
