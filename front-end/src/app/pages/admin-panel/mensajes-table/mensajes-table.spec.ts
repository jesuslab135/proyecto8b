import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesTable } from './mensajes-table';

describe('MensajesTable', () => {
  let component: MensajesTable;
  let fixture: ComponentFixture<MensajesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
