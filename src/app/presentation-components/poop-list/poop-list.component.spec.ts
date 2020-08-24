import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoopListComponent } from './poop-list.component';

describe('PoopListComponent', () => {
  let component: PoopListComponent;
  let fixture: ComponentFixture<PoopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
