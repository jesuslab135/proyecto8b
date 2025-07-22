import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggablesTable } from './taggables-table';

describe('TaggablesTable', () => {
  let component: TaggablesTable;
  let fixture: ComponentFixture<TaggablesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggablesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggablesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
