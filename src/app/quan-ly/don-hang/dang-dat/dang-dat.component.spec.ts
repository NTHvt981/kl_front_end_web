import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangDatComponent } from './dang-dat.component';

describe('DangDatComponent', () => {
  let component: DangDatComponent;
  let fixture: ComponentFixture<DangDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
