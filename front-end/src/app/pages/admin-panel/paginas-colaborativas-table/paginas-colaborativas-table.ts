// src/app/pages/admin-panel/paginas-colaborativas-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchPaginasColaborativas,
  deletePaginaColaborativa,
} from '../../../api/paginas-colaborativas-api';

@Component({
  selector: 'app-paginas-colaborativas-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginas-colaborativas-table.html',
  styleUrls: ['./paginas-colaborativas-table.css'],
})
export class PaginasColaborativasTableComponent implements OnInit {
  paginas: any[] = [];

  async ngOnInit() {
    await this.cargarPaginas();
  }

  async cargarPaginas() {
    try {
      this.paginas = await fetchPaginasColaborativas();
    } catch (err: any) {
      alert(err.message || 'Error al cargar páginas colaborativas');
    }
  }

  editarPagina(id: number) {
    console.log('Editar página', id);
    // Aquí podrías abrir un modal o navegar a una vista de edición
  }

  async eliminarPagina(id: number) {
    if (!confirm('¿Eliminar esta página colaborativa?')) return;
    try {
      await deletePaginaColaborativa(id);
      this.paginas = this.paginas.filter((p) => p.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la página');
    }
  }
}
