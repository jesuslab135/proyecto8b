import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversaciones } from './conversaciones';

describe('Conversaciones', () => {
  let component: Conversaciones;
  let fixture: ComponentFixture<Conversaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conversaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
