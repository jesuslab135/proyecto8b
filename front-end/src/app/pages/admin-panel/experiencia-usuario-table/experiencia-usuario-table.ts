import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchExperienciaUsuario } from '../../../api/experiencia-usuario-api';

@Component({
  selector: 'app-experiencia-usuario-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiencia-usuario-table.html',
  styleUrls: ['./experiencia-usuario-table.css'],
})
export class ExperienciaUsuarioTableComponent implements OnInit {
  experiencias: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.experiencias = await fetchExperienciaUsuario();
    } catch (err) {
      console.error('Error al obtener experiencias:', err);
      this.router.navigate(['/login']);
    }
  }
}
