import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchTaggables,
  deleteTaggable,
} from '../../../api/taggables-api';

@Component({
  selector: 'app-taggables-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taggables-table.html',
  styleUrls: ['./taggables-table.css']
})
export class TaggablesTableComponent implements OnInit {
  taggables: any[] = [];

  async ngOnInit() {
    await this.cargarTaggables();
  }

  async cargarTaggables() {
    try {
      this.taggables = await fetchTaggables();
    } catch (err: any) {
      alert(err.message || 'Error al cargar taggables');
    }
  }

  editarTaggable(id: number) {
    console.log('Editar taggable', id);
    // Agrega lógica para editar
  }

  async eliminarTaggable(id: number) {
    if (!confirm('¿Eliminar este taggable?')) return;
    try {
      await deleteTaggable(id);
      this.taggables = this.taggables.filter(t => t.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar taggable');
    }
  }
}
