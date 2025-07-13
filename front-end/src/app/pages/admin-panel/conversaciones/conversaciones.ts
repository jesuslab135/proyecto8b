import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchConversaciones } from '../../../api/conversaciones-api';

@Component({
  selector: 'app-conversaciones-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversaciones.html',
  styleUrl: './conversaciones.css'
})
export class Conversaciones implements OnInit {
    conversaciones: any[] = [];
  
    constructor(private router: Router) {}
  
    async ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
  
      try {
        this.conversaciones = await fetchConversaciones();
      } catch (err) {
        console.error('Error fetching conversaciones:', err);
        this.router.navigate(['/login']);
      }
    }
}
