import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const RESPUESTAS_ENDPOINT = `${API_URL}/api/respuestas-hilo`;

export async function fetchRespuestasHilo() {
  const token = localStorage.getItem('token');
  const res = await fetch(RESPUESTAS_ENDPOINT, {
    headers: { Authorization: token! },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener respuestas');
  return data;
}

export async function getRespuestaHiloById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RESPUESTAS_ENDPOINT}/${id}`, {
    headers: { Authorization: token! },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener respuesta');
  return data;
}

export async function createRespuestaHilo(input: {
  hilo_id: number;
  usuario_id: number;
  contenido: string;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(RESPUESTAS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear respuesta');
  return data;
}

export async function updateRespuestaHilo(id: number, input: {
  contenido?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RESPUESTAS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar respuesta');
  return data;
}

export async function deleteRespuestaHilo(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${RESPUESTAS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token! },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar respuesta');
  return data;
}
