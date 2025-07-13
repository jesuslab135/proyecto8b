import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTable } from './reportes-table';

describe('ReportesTable', () => {
  let component: ReportesTable;
  let fixture: ComponentFixture<ReportesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
