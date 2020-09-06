import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonHangDaHuyComponent } from './don-hang-da-huy.component';

describe('DonHangDaHuyComponent', () => {
  let component: DonHangDaHuyComponent;
  let fixture: ComponentFixture<DonHangDaHuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonHangDaHuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonHangDaHuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
