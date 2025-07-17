import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const MENSAJES_ENDPOINT = `${API_URL}/api/mensajes`;

export async function fetchMensajes() {
  const token = localStorage.getItem('token');
  const res = await fetch(MENSAJES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener los mensajes');
  return data;
}

export async function getMensajesById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener los mensajes');
  return data;
}

export async function createMensajes(input: {
  id: number;
  conversacion_id: number;
  emisor_id: number;
  contenido: string;
  enviado_en: Date;
  leido: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(MENSAJES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear un mensaje');
  return data;
}

export async function updateMensajes(id: number, input: {
  id: number;
  conversacion_id: number;
  emisor_id: number;
  contenido: string;
  enviado_en: Date;
  leido: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar mensaje');
  return data;
}

export async function deleteMensajes(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar el mensaje');
  return data;
}
