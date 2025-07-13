import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchPostulaciones } from '../../../api/postulaciones-api';

@Component({
  selector: 'app-oportunidades-table',
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
}
