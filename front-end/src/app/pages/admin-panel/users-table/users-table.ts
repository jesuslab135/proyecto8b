import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.html',
  styleUrls: ['./users-table.css']
})
export class UsersTableComponent {
  users = [
    { id: 1, name: 'Alice Martínez', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Sánchez', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Carol García', email: 'carol@example.com', role: 'Moderator' },
  ];
}
