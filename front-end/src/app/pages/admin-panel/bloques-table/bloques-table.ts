// src/app/pages/admin-panel/bloques-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchBloques,
  deleteBloque,
} from '../../../api/bloques-api';

@Component({
  selector: 'app-bloques-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bloques-table.html',
  styleUrls: ['./bloques-table.css']
})
export class BloquesTableComponent implements OnInit {
  bloques: any[] = [];

  async ngOnInit() {
    await this.cargarBloques();
  }

  async cargarBloques() {
    try {
      this.bloques = await fetchBloques();
    } catch (err: any) {
      alert(err.message || 'Error al cargar bloques');
    }
  }

  editarBloque(id: number) {
    console.log('Editar bloque', id);
    // lógica de edición futura
  }

  async eliminarBloque(id: number) {
    if (!confirm('¿Eliminar este bloque?')) return;
    try {
      await deleteBloque(id);
      this.bloques = this.bloques.filter(b => b.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar bloque');
    }
  }
}
