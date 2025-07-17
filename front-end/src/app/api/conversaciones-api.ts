import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const CONVERSACIONES_ENDPOINT = `${API_URL}/api/conversaciones`;

export async function fetchConversaciones() {
  const token = localStorage.getItem('token');
  const res = await fetch(CONVERSACIONES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las conversaciones');
  return data;
}

export async function getConversacionById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${CONVERSACIONES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las conversación');
  return data;
}

export async function createConversacion(input: {
  id: number;
  usuario_1_id: number;
  usuario_2_id: number;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(CONVERSACIONES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear una conversacion');
  return data;
}

export async function updateConversacion(id: number, input: {
  id: number;
  usuario_1_id: number;
  usuario_2_id: number;
  creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${CONVERSACIONES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar conversacion');
  return data;
}

export async function deleteConversacion(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${CONVERSACIONES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar la conversacion');
  return data;
}
