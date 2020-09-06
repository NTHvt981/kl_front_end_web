import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkttThemComponent } from './pktt-them.component';

describe('PkttThemComponent', () => {
  let component: PkttThemComponent;
  let fixture: ComponentFixture<PkttThemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkttThemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkttThemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
