import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchParticipacionesProyectos } from '../../../api/participaciones-proyecto-api';

@Component({
  selector: 'app-participaciones-proyectos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participaciones-proyectos-table.html',
  styleUrls: ['./participaciones-proyectos-table.css']
})
export class ParticipacionesProyectosTableComponent implements OnInit {
  participacionesProyectos: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.participacionesProyectos = await fetchParticipacionesProyectos();
    } catch (err) {
      console.error('Error al obtener participaciones de proyectos:', err);
      this.router.navigate(['/login']);
    }
  }
}
