import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesLaborales } from './postulaciones-laborales';

describe('PostulacionesLaborales', () => {
  let component: PostulacionesLaborales;
  let fixture: ComponentFixture<PostulacionesLaborales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulacionesLaborales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulacionesLaborales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
