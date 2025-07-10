import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesTable } from './universities-table';

describe('UniversitiesTable', () => {
  let component: UniversitiesTable;
  let fixture: ComponentFixture<UniversitiesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitiesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitiesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
