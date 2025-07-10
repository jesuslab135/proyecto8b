import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private router: Router) {}

  login() {
    // Aquí iría la lógica real de autenticación. Por ahora, simulamos éxito:
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    if (email && password) {
      // Puedes verificar con un backend aquí
      this.router.navigate(['/admin/users']);
    } else {
      alert('Please enter email and password');
    }
  }
}
