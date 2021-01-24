import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemTinNhanComponent } from './xem-tin-nhan.component';

describe('XemTinNhanComponent', () => {
  let component: XemTinNhanComponent;
  let fixture: ComponentFixture<XemTinNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemTinNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemTinNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
