import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchUsers } from '../../../api/users-api'; // Ajusta ruta si es necesario

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.html',
  styleUrls: ['./users-table.css']
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.users = await fetchUsers(); // usa fetch con Authorization header
    } catch (err: any) {
      console.error('Error fetching users:', err);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
