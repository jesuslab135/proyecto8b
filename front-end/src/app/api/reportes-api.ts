import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const REPORTES_ENDPOINT = `${API_URL}/api/reportes`;

export async function fetchReportes() {
  const token = localStorage.getItem('token');
  const res = await fetch(REPORTES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener reportes');
  return data;
}

export async function getReporteById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${REPORTES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener el reporte');
  return data;
}

export async function createReporte(input: {
  reportante_id: number;
  usuario_reportado_id: number;
  tipo_contenido: string;
  contenido_id: number;
  motivo: string;
  estado?: string;
  fecha?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(REPORTES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear el reporte');
  return data;
}

export async function updateReporte(id: number, input: {
  tipo_contenido?: string;
  contenido_id?: number;
  motivo?: string;
  estado?: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${REPORTES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar el reporte');
  return data;
}

export async function deleteReporte(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${REPORTES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar el reporte');
  return data;
}
