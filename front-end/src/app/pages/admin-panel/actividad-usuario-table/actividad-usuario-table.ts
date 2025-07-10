import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-usuario-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actividad-usuario-table.html',
  styleUrls: ['./actividad-usuario-table.css']
})
export class ActividadUsuarioTableComponent {
  actividades = [
    {
      id: 1,
      usuario_id: 101,
      tipo_actividad: 'Login',
      objeto_id: null,
      contexto: 'auth',
      fecha: '2025-07-10 10:00'
    },
    {
      id: 2,
      usuario_id: 102,
      tipo_actividad: 'Editar Perfil',
      objeto_id: 5,
      contexto: 'usuario',
      fecha: '2025-07-10 11:30'
    },
    {
      id: 3,
      usuario_id: 101,
      tipo_actividad: 'Registrarse en evento',
      objeto_id: 12,
      contexto: 'eventos',
      fecha: '2025-07-09 16:45'
    }
  ];
}
