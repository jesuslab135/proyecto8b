import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getForoById, updateForo } from '../../../api/foros-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foros-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foros-form.component.html',
  styleUrls: []
})
export class ForosFormComponent implements OnInit {
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
      descripcion: ['']
    });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam);
      this.loading = true;
      try {
        const foro = await getForoById(this.id);
        this.form.patchValue({
          nombre: foro.nombre,
          descripcion: foro.descripcion
        });
      } catch (err) {
        console.error('Error al cargar foro:', err);
        alert('No se pudo cargar el foro');
        this.router.navigate(['/admin/foros']);
      } finally {
        this.loading = false;
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await updateForo(this.id, this.form.value);
      alert('Foro actualizado correctamente');
      this.router.navigate(['/admin/foros']);
    } catch (err) {
      console.error('Error al actualizar foro:', err);
      alert('Error al actualizar foro');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/foros']);
  }
}
