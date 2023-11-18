import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizingWorkComponent } from './finalizing-work.component';

describe('FinalizingWorkComponent', () => {
  let component: FinalizingWorkComponent;
  let fixture: ComponentFixture<FinalizingWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizingWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
