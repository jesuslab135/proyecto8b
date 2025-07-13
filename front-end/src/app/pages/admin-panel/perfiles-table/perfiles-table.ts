import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchPerfiles,
  deletePerfil,
} from '../../../api/perfiles-api';

@Component({
  selector: 'app-perfiles-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfiles-table.html',
  styleUrls: ['./perfiles-table.css'],
})
export class PerfilesTableComponent implements OnInit {
  perfiles: any[] = [];

  async ngOnInit() {
    await this.cargarPerfiles();
  }

  async cargarPerfiles() {
    try {
      this.perfiles = await fetchPerfiles();
    } catch (err: any) {
      alert(err.message || 'Error al cargar perfiles');
    }
  }

  editarPerfil(id: number) {
    console.log('Editar perfil:', id);
    // Puedes abrir un modal o navegar a un formulario
  }

  async eliminarPerfil(id: number) {
    if (!confirm('¿Eliminar este perfil?')) return;
    try {
      await deletePerfil(id);
      this.perfiles = this.perfiles.filter(p => p.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar perfil');
    }
  }
}
