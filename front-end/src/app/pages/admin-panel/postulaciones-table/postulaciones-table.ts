import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchPostulaciones, deletePostulacion } from '../../../api/postulaciones-api';

@Component({
  selector: 'app-postulaciones-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postulaciones-table.html',
  styleUrls: ['./postulaciones-table.css']
})
export class PostulacionesTableComponent implements OnInit {
  postulaciones: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.postulaciones = await fetchPostulaciones();
    } catch (err) {
      console.error('Error al obtener postulaciones:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
    this.router.navigate(['/admin/postulaciones/create']);
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/postulaciones/edit', id]);
  }

  async onDelete(id: number) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta postulación?');
    if (!confirmDelete) return;

    try {
      await deletePostulacion(id);
      await this.ngOnInit();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar postulación');
    }
  }
}
