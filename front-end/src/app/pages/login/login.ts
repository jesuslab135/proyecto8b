import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    this.http.post<any>('/api/auth/login', { email, password }).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);        // 🔐 Guardamos el JWT
          localStorage.setItem('user', JSON.stringify(res.user)); // 👤 Opcional: guardar info del usuario
          this.router.navigate(['/admin/users']);
        } else {
          alert('Login failed: no token returned');
        }
      },
      error: (err) => {
        alert(err.error?.error || 'Invalid credentials');
      }
    });
  }
}
