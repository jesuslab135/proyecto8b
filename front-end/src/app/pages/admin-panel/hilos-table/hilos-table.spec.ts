import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HilosTable } from './hilos-table';

describe('HilosTable', () => {
  let component: HilosTable;
  let fixture: ComponentFixture<HilosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HilosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HilosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
