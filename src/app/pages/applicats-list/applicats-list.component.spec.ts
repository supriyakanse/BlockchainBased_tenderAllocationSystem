import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatsListComponent } from './applicats-list.component';

describe('ApplicatsListComponent', () => {
  let component: ApplicatsListComponent;
  let fixture: ComponentFixture<ApplicatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
