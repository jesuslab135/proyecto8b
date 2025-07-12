import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { login } from '../../api/auth-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const res = await login(this.email, this.password);
      console.log('Login response:', res); // 👈 pon esto temporalmente

      // ✅ guardar token si existe
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/admin/users']);
      } else {
        alert('No token returned');
      }
    } catch (err: any) {
      alert(err.message || 'Invalid credentials');
    }
  }
}
