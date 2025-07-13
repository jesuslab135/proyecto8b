// src/app/pages/admin-panel/relaciones-bloques-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchRelacionesBloques,
  deleteRelacionBloque,
} from '../../../api/relaciones-bloques-api';

@Component({
  selector: 'app-relaciones-bloques-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relaciones-bloques-table.html',
  styleUrls: ['./relaciones-bloques-table.css'],
})
export class RelacionesBloquesTableComponent implements OnInit {
  relaciones: any[] = [];

  async ngOnInit() {
    await this.cargarRelaciones();
  }

  async cargarRelaciones() {
    try {
      this.relaciones = await fetchRelacionesBloques();
    } catch (err: any) {
      alert(err.message || 'Error al cargar relaciones');
    }
  }

  editarRelacion(id: number) {
    console.log('Editar relación', id);
    // Implementar navegación o modal
  }

  async eliminarRelacion(id: number) {
    if (!confirm('¿Eliminar esta relación de bloques?')) return;
    try {
      await deleteRelacionBloque(id);
      this.relaciones = this.relaciones.filter((r) => r.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar relación');
    }
  }
}
