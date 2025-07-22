import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTable } from './eventos-table';

describe('EventosTable', () => {
  let component: EventosTable;
  let fixture: ComponentFixture<EventosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
