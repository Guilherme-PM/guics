import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrderListComponent } from './open-order-list.component';

describe('OpenOrderListComponent', () => {
  let component: OpenOrderListComponent;
  let fixture: ComponentFixture<OpenOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
