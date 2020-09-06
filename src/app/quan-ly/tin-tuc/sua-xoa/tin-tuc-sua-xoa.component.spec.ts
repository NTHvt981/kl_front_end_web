import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucSuaXoaComponent } from './tin-tuc-sua-xoa.component';

describe('TinTucSuaXoaComponent', () => {
  let component: TinTucSuaXoaComponent;
  let fixture: ComponentFixture<TinTucSuaXoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinTucSuaXoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTucSuaXoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
