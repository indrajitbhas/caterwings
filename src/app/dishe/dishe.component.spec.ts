import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisheComponent } from './dishe.component';

describe('DisheComponent', () => {
  let component: DisheComponent;
  let fixture: ComponentFixture<DisheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
