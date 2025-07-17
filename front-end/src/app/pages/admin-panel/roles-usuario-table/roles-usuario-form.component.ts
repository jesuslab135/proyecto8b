import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getRolUsuarioById, updateRolUsuario } from '../../../api/roles-usuario-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles-usuario-form.component.html',
  styleUrls: []
})
export class RolesUsuarioFormComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const data = await getRolUsuarioById(this.id);
    this.form.patchValue(data);
  }

  async onSubmit() {
    try {
      await updateRolUsuario(this.id, this.form.value);
      alert('Rol actualizado correctamente');
      this.router.navigate(['/admin/roles-usuario']);
    } catch (err) {
      console.error('Error al actualizar rol:', err);
      alert('Error al actualizar rol');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/roles-usuario']);
  }
}
