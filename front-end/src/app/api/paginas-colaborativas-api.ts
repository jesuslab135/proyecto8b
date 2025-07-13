import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const PAGINAS_ENDPOINT = `${API_URL}/api/paginas-colaborativas`;

export async function fetchPaginasColaborativas() {
  const token = localStorage.getItem('token');
  const res = await fetch(PAGINAS_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener páginas colaborativas');
  return data;
}

export async function getPaginaColaborativaById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PAGINAS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener la página');
  return data;
}

export async function createPaginaColaborativa(input: {
  proyecto_id: number;
  titulo: string;
  descripcion: string;
  creada_por: number;
  permisos_lectura: string[];
  permisos_escritura: string[];
  orden?: number;
  creada_en?: Date;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(PAGINAS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear página colaborativa');
  return data;
}

export async function updatePaginaColaborativa(id: number, input: Partial<{
  proyecto_id: number;
  titulo: string;
  descripcion: string;
  creada_por: number;
  permisos_lectura: string[];
  permisos_escritura: string[];
  orden?: number;
  creada_en?: Date;
}>) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PAGINAS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar página colaborativa');
  return data;
}

export async function deletePaginaColaborativa(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${PAGINAS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar página colaborativa');
  return data;
}
