import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonHangDaNhanComponent } from './don-hang-da-nhan.component';

describe('DonHangDaNhanComponent', () => {
  let component: DonHangDaNhanComponent;
  let fixture: ComponentFixture<DonHangDaNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonHangDaNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonHangDaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
