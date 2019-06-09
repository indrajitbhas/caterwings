import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetaurantMenuComponent } from './retaurant-menu.component';

describe('RetaurantMenuComponent', () => {
  let component: RetaurantMenuComponent;
  let fixture: ComponentFixture<RetaurantMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetaurantMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetaurantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
