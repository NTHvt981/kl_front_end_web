import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkttSuaXoaComponent } from './pktt-sua-xoa.component';

describe('PkttSuaXoaComponent', () => {
  let component: PkttSuaXoaComponent;
  let fixture: ComponentFixture<PkttSuaXoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkttSuaXoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkttSuaXoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
