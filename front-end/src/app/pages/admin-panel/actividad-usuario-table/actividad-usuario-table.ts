import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchActividadUsuario, deleteActividadUsuario } from '../../../api/actividad-usuario-api'; // ajusta si es necesario

@Component({
  selector: 'app-actividad-usuario-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actividad-usuario-table.html',
  styleUrls: ['./actividad-usuario-table.css']
})
export class ActividadUsuarioTableComponent implements OnInit {
  actividades: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.actividades = await fetchActividadUsuario();
    } catch (err) {
      console.error('Error al obtener actividad de usuario:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
  this.router.navigate(['/admin/actividad/create']);
}

onEdit(id: number) {
  this.router.navigate(['/admin/actividad/edit', id]);
}

async onDelete(id: number) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta actividad?');
  if (!confirmDelete) return;

  try {
    await deleteActividadUsuario(id);
    await this.ngOnInit();
  } catch (err) {
    console.error(err);
    alert('Error al eliminar actividad');
  }
}

}
