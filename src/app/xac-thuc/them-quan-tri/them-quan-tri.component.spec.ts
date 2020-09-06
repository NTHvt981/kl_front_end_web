import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemQuanTriComponent } from './them-quan-tri.component';

describe('ThemQuanTriComponent', () => {
  let component: ThemQuanTriComponent;
  let fixture: ComponentFixture<ThemQuanTriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemQuanTriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemQuanTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
