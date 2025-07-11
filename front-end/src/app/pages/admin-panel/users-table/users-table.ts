import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule], // ✅ No se incluye HttpClientModule
  templateUrl: './users-table.html',
  styleUrls: ['./users-table.css']
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/users').subscribe(data => {
      this.users = data;
    });
  }
}
