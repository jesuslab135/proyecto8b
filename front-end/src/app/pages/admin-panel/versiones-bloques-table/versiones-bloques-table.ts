// src/app/pages/admin-panel/versiones-bloques-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchVersionesBloques,
  deleteVersionBloque,
} from '../../../api/versiones-bloques-api';

@Component({
  selector: 'app-versiones-bloques-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './versiones-bloques-table.html',
  styleUrls: ['./versiones-bloques-table.css'],
})
export class VersionesBloquesTableComponent implements OnInit {
  versiones: any[] = [];

  async ngOnInit() {
    await this.cargarVersiones();
  }

  async cargarVersiones() {
    try {
      this.versiones = await fetchVersionesBloques();
    } catch (err: any) {
      alert(err.message || 'Error al cargar versiones de bloques');
    }
  }

  editarVersion(id: number) {
    console.log('Editar versión', id);
    // Aquí podrías abrir un modal o redirigir a una vista de edición
  }

  async eliminarVersion(id: number) {
    if (!confirm('¿Eliminar esta versión?')) return;
    try {
      await deleteVersionBloque(id);
      this.versiones = this.versiones.filter((v) => v.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar versión');
    }
  }
}
