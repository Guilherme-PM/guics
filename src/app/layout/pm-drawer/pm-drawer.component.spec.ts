import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmDrawerComponent } from './pm-drawer.component';

describe('PmDrawerComponent', () => {
  let component: PmDrawerComponent;
  let fixture: ComponentFixture<PmDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
