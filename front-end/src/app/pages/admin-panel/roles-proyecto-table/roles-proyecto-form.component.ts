import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getRolProyectoById, updateRolProyecto } from '../../../api/roles-proyecto-api';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-proyecto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles-proyecto-form.component.html',
  styleUrls: []
})
export class RolesProyectoFormComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [''],
      puede_editar: [false],
      puede_comentar: [false],
      puede_subir_archivos: [false],
      puede_validar: [false]
    });
  }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const data = await getRolProyectoById(this.id);
    this.form.patchValue(data);
  }

  async onSubmit() {
    try {
      await updateRolProyecto(this.id, this.form.value);
      alert('Rol actualizado correctamente');
      this.router.navigate(['/admin/roles-proyecto']);
    } catch (err) {
      console.error('Error al actualizar rol:', err);
      alert('Error al actualizar rol');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/roles-proyecto']);
  }
}
