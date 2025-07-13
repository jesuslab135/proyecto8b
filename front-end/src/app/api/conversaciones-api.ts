import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const CONVERSACIONES_API = `${API_URL}/api/conversaciones`;

export async function fetchConversaciones() {
    const token = await localStorage.getItem('token');
    const res = await fetch(CONVERSACIONES_API, {
        headers: {
            Authorization: token!,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error al obtener la asistencia en eventos');
    return data;
}

export async function getConversacionById(id: number) {
    const token = await localStorage.getItem('token');
    const res = await fetch(CONVERSACIONES_API, {
        headers: {
            Authorization: token!,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error al obtener conversacion');
    return data;
}

export async function createConversacion(input: {
    usuario_1_id: number;
    usuario_2_id: number;
    creado_en?: Date;
}) {
    const token = await localStorage.getItem('token');
    const res = await fetch(CONVERSACIONES_API, {
        method: 'POST',
        headers: {
            Authorization: token!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error al crear conversacion');
    return data;
}

export async function updateConversacion(id: number, input: {
    usuario_1_id: number;
    usuario_2_id: number;
    creado_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${CONVERSACIONES_API}/${id}`, {
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

export async function deleteConversacion(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${CONVERSACIONES_API}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });
const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar asistencia');
  return data;
}