import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchUniversidades, deleteUniversidad } from '../../../api/universidades-api';

@Component({
  selector: 'app-universities-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './universities-table.html',
  styleUrls: ['./universities-table.css']
})
export class UniversitiesTableComponent implements OnInit {
  universities: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadUniversities();
  }

  async loadUniversities() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.universities = await fetchUniversidades();
    } catch (err) {
      console.error('Error fetching universities:', err);
      this.router.navigate(['/login']);
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/universities/edit', id]);
  }

  async onDelete(id: number) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar esta universidad?');
    if (!confirmed) return;

    try {
      await deleteUniversidad(id);
      await this.loadUniversities(); // actualiza la tabla
    } catch (err) {
      console.error('Error deleting university:', err);
      alert('Error al eliminar universidad');
    }
  }

  onCreate() {
    this.router.navigate(['/admin/universities/create']);
  }
}
