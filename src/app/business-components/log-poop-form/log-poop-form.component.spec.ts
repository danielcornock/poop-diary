import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPoopFormComponent } from './log-poop-form.component';

describe('LogPoopFormComponent', () => {
  let component: LogPoopFormComponent;
  let fixture: ComponentFixture<LogPoopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogPoopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPoopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
