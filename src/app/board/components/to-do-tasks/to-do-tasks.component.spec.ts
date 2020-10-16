import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTasksComponent } from './to-do-tasks.component';

describe('ToDoTasksComponent', () => {
  let component: ToDoTasksComponent;
  let fixture: ComponentFixture<ToDoTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
