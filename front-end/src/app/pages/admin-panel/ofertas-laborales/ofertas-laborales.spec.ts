import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasLaborales } from './ofertas-laborales';

describe('OfertasLaborales', () => {
  let component: OfertasLaborales;
  let fixture: ComponentFixture<OfertasLaborales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertasLaborales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasLaborales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
