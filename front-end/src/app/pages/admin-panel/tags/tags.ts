import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchTags, deleteTag } from '../../../api/tags-api';

@Component({
  selector: 'app-tags-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css']
})
export class TagsTableComponent implements OnInit {
  tags: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.tags = await fetchTags();
    } catch (err) {
      console.error('Error al obtener tags:', err);
      this.router.navigate(['/login']);
    }
  }

  onCreate() {
    this.router.navigate(['/admin/tags/create']);
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/tags/edit', id]);
  }

  async onDelete(id: number) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este tag?');
    if (!confirmDelete) return;

    try {
      await deleteTag(id);
      await this.ngOnInit(); // recargar lista actualizada
    } catch (err) {
      console.error('Error al eliminar tag:', err);
      alert('Error al eliminar tag');
    }
  }
}
