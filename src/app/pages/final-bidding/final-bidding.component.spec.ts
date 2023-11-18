import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalBiddingComponent } from './final-bidding.component';

describe('FinalBiddingComponent', () => {
  let component: FinalBiddingComponent;
  let fixture: ComponentFixture<FinalBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalBiddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
