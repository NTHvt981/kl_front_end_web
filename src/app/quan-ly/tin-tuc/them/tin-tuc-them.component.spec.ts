import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucThemComponent } from './tin-tuc-them.component';

describe('TinTucThemComponent', () => {
  let component: TinTucThemComponent;
  let fixture: ComponentFixture<TinTucThemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinTucThemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTucThemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
