import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRListAdminComponent } from './g-rlist-admin.component';

describe('GRListAdminComponent', () => {
  let component: GRListAdminComponent;
  let fixture: ComponentFixture<GRListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
