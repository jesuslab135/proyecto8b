import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchForos, deleteForo } from '../../../api/foros-api';

@Component({
  selector: 'app-foros-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foros-table.html',
  styleUrls: ['./foros-table.css']
})
export class ForosTableComponent implements OnInit {
  foros: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.foros = await fetchForos();
    } catch (err) {
      console.error('Error al obtener foros:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
    this.router.navigate(['/admin/foros/create']);
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/foros/edit', id]);
  }

  async onDelete(id: number) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este foro?');
    if (!confirmDelete) return;

    try {
      await deleteForo(id);
      await this.ngOnInit(); // recargar lista
    } catch (err) {
      console.error('Error al eliminar foro:', err);
      alert('Error al eliminar foro');
    }
  }
}
