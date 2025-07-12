import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const ASISTENCIA_ENDPOINT = `${API_URL}/api/asistencias-eventos`;

export async function fetchAsistenciaEvento() {
  const token = localStorage.getItem('token');
  const res = await fetch(ASISTENCIA_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener la asistencia en eventos');
  return data;
}

export async function getAsistenciaEventoById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ASISTENCIA_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener asistencia');
  return data;
}

export async function createAsistenciaEvento(input: {
  evento_id: number;
  usuario_id: number;
  registrado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(ASISTENCIA_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear asistencia');
  return data;
}

export async function updateAsistenciaEvento(id: number, input: {
  evento_id?: number;
  usuario_id?: number;
  registrado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ASISTENCIA_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar asistencia');
  return data;
}

export async function deleteAsistenciaEvento(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${ASISTENCIA_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar asistencia');
  return data;
}
