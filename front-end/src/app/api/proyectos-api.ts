import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const PROYECTOS_ENDPOINT = `${API_URL}/api/proyectos`;

export async function fetchProyectos() {
  const token = localStorage.getItem('token');
  const res = await fetch(PROYECTOS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener proyectos');
  return data;
}

export async function getProyectoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PROYECTOS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener proyecto');
  return data;
}

export async function createProyecto(input: {
  nombre: string;
  descripcion: string;
  creador_id: number;
  universidad_id: number;
  estado_verificacion: string;
  vista_publica?: boolean;
  creado_en?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(PROYECTOS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear proyecto');
  return data;
}

export async function updateProyecto(id: number, input: Partial<{
  nombre: string;
  descripcion: string;
  creador_id: number;
  universidad_id: number;
  estado_verificacion: string;
  vista_publica: boolean;
  creado_en: string;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PROYECTOS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar proyecto');
  return data;
}

export async function deleteProyecto(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PROYECTOS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar proyecto');
  return data;
}
