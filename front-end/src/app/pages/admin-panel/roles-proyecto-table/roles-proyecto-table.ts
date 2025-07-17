import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchRolesProyecto, deleteRolProyecto } from '../../../api/roles-proyecto-api';

@Component({
  selector: 'app-roles-proyecto-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-proyecto-table.html',
  styleUrls: ['./roles-proyecto-table.css']
})
export class RolesProyectoTableComponent implements OnInit {
  roles: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.roles = await fetchRolesProyecto();
    } catch (err) {
      console.error('Error al obtener roles de proyecto:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
    this.router.navigate(['/admin/roles-proyecto/create']);
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/roles-proyecto/edit', id]);
  }

  async onDelete(id: number) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este rol de proyecto?');
    if (!confirmed) return;

    try {
      await deleteRolProyecto(id);
      await this.ngOnInit(); // recargar lista actualizada
    } catch (err) {
      console.error('Error al eliminar rol de proyecto:', err);
      alert('Error al eliminar rol de proyecto');
    }
  }
}
