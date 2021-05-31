import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassengersComponent } from './list-passengers.component';

describe('ListPassengersComponent', () => {
  let component: ListPassengersComponent;
  let fixture: ComponentFixture<ListPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPassengersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
