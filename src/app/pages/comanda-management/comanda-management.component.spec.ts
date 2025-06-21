import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaManagementComponent } from './comanda-management.component';

describe('ComandaManagementComponent', () => {
  let component: ComandaManagementComponent;
  let fixture: ComponentFixture<ComandaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComandaManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComandaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
