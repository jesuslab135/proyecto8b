import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const VALIDACIONES_ENDPOINT = `${API_URL}/api/proyectos-validaciones`;

export async function fetchValidaciones() {
  const token = localStorage.getItem('token');
  const res = await fetch(VALIDACIONES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener validaciones');
  return data;
}

export async function getValidacionById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VALIDACIONES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener validación');
  return data;
}

export async function createValidacion(input: {
  proyecto_id: number;
  admin_id: number;
  comentarios?: string;
  estado: string;
  fecha_validacion?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(VALIDACIONES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear validación');
  return data;
}

export async function updateValidacion(id: number, input: Partial<{
  proyecto_id: number;
  admin_id: number;
  comentarios?: string;
  estado: string;
  fecha_validacion?: string;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VALIDACIONES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar validación');
  return data;
}

export async function deleteValidacion(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${VALIDACIONES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar validación');
  return data;
}
