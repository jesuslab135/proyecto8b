import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;
const OFERTAS_LABORALES_ENDPOINT = `${API_URL}/api/ofertas-laborales`;

export async function fetchOfertasLaborales() {
  const token = localStorage.getItem('token');
  const res = await fetch(OFERTAS_LABORALES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las ofertas laborales');
  return data;
}

export async function getOfertasLaboralesById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OFERTAS_LABORALES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener las ofertas laborales');
  return data;
}

export async function createOfertasLaborales(input: {
  id: number;
  titulo: string;
  descripcion: string;
  empresa: string;
  ubicacion: string;
  tipo_contrato: string;
  salario: number;
  fecha_publicacion: Date;
  fecha_limite: Date;
  creado_por: number;
  estado: string;
  logo_url: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(OFERTAS_LABORALES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear una oferta laboral');
  return data;
}

export async function updateOfertasLaborales(id: number, input: {
  id: number;
  titulo: string;
  descripcion: string;
  empresa: string;
  ubicacion: string;
  tipo_contrato: string;
  salario: number;
  fecha_publicacion: Date;
  fecha_limite: Date;
  creado_por: number;
  estado: string;
  logo_url: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OFERTAS_LABORALES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar la oferta laboral');
  return data;
}

export async function deleteOfertasLaborales(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${OFERTAS_LABORALES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar la oferta laboral');
  return data;
}
