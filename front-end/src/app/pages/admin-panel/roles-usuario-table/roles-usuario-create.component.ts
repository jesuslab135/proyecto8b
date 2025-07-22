import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createRolUsuario } from '../../../api/roles-usuario-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-usuario-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles-usuario-create.component.html',
  styleUrls: []
})
export class RolesUsuarioCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await createRolUsuario(this.form.value);
      alert('Rol creado correctamente');
      this.router.navigate(['/admin/roles-usuario']);
    } catch (err) {
      console.error('Error al crear rol:', err);
      alert('Error al crear rol');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/roles-usuario']);
  }
}
