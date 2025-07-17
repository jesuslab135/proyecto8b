import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchRolesUsuario, deleteRolUsuario } from '../../../api/roles-usuario-api';

@Component({
  selector: 'app-roles-usuario-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-usuario-table.html',
  styleUrls: ['./roles-usuario-table.css']
})
export class RolesUsuarioTableComponent implements OnInit {
  roles: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.roles = await fetchRolesUsuario();
    } catch (err) {
      console.error('Error al obtener roles de usuario:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
  this.router.navigate(['/admin/roles-usuario/create']);
}

onEdit(id: number) {
  this.router.navigate(['/admin/roles-usuario/edit', id]);
}

async onDelete(id: number) {
  const confirmed = confirm('¿Estás seguro de eliminar este rol de usuario?');
  if (!confirmed) return;

  try {
    await deleteRolUsuario(id);
    await this.ngOnInit();
  } catch (err) {
    console.error('Error al eliminar rol:', err);
    alert('Error al eliminar rol');
  }
  }
}
