import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUniversidadById, updateUniversidad } from '../../../api/universidades-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-universities-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './universities-form.component.html',
  styleUrls: []
})
export class UniversitiesFormComponent implements OnInit {
  form: FormGroup;
  id!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dominio_correo: ['', Validators.required],
      logo_url: ['']
    });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam);
      this.loading = true;
      try {
        const universidad = await getUniversidadById(this.id);
        this.form.patchValue({
          nombre: universidad.nombre,
          dominio_correo: universidad.dominio_correo,
          logo_url: universidad.logo_url
        });
      } catch (err) {
        console.error('Error al cargar universidad:', err);
        alert('No se pudo cargar la universidad');
        this.router.navigate(['/admin/universities']);
      } finally {
        this.loading = false;
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await updateUniversidad(this.id, this.form.value);
      alert('Universidad actualizada correctamente');
      this.router.navigate(['/admin/universities']);
    } catch (err) {
      console.error('Error al actualizar universidad:', err);
      alert('Error al actualizar universidad');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/universities']);
  }
}
