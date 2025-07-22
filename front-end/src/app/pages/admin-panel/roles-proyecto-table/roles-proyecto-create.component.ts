import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createRolProyecto } from '../../../api/roles-proyecto-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-proyecto-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles-proyecto-create.component.html',
  styleUrls: []
})
export class RolesProyectoCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      nombre: [''],
      puede_editar: [false],
      puede_comentar: [false],
      puede_subir_archivos: [false],
      puede_validar: [false]
    });
  }

  async onSubmit() {
    try {
      await createRolProyecto(this.form.value);
      console.log('Payload enviado:', this.form.value);
      alert('Rol creado correctamente');
      this.router.navigate(['/admin/roles-proyecto']);
    } catch (err) {
      console.error('Error al crear rol:', err);
      alert('Error al crear rol');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/roles-proyecto']);
  }
}
