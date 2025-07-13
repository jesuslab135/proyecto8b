import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquesTable } from './bloques-table';

describe('BloquesTable', () => {
  let component: BloquesTable;
  let fixture: ComponentFixture<BloquesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloquesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloquesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
