import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoopFloatComponent } from './poop-float.component';

describe('PoopFloatComponent', () => {
  let component: PoopFloatComponent;
  let fixture: ComponentFixture<PoopFloatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoopFloatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoopFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
