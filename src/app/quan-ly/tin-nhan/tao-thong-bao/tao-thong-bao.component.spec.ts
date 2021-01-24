import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoThongBaoComponent } from './tao-thong-bao.component';

describe('TaoThongBaoComponent', () => {
  let component: TaoThongBaoComponent;
  let fixture: ComponentFixture<TaoThongBaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoThongBaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
