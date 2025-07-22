import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForosTable } from './foros-table';

describe('ForosTable', () => {
  let component: ForosTable;
  let fixture: ComponentFixture<ForosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
