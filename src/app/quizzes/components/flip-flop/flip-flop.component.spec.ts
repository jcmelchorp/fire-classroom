import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipFlopComponent } from './flip-flop.component';

describe('FlipFlopComponent', () => {
  let component: FlipFlopComponent;
  let fixture: ComponentFixture<FlipFlopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipFlopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipFlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
