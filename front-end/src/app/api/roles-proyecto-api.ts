// src/app/api/roles-proyecto-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const ROLES_ENDPOINT = `${API_URL}/api/roles-proyecto`;

export async function fetchRolesProyecto() {
  const token = localStorage.getItem('token');
  const res = await fetch(ROLES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener roles de proyecto');
  return data;
}

export async function getRolProyectoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener rol');
  return data;
}

export async function createRolProyecto(input: {
  nombre: string;
  puede_editar?: boolean;
  puede_comentar?: boolean;
  puede_subir_archivos?: boolean;
  puede_validar?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(ROLES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear rol');
  return data;
}

export async function updateRolProyecto(id: number, input: {
  nombre?: string;
  puede_editar?: boolean;
  puede_comentar?: boolean;
  puede_subir_archivos?: boolean;
  puede_validar?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar rol');
  return data;
}

export async function deleteRolProyecto(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ROLES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar rol');
  return data;
}
