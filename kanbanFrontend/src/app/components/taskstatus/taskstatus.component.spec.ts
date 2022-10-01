import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskstatusComponent } from './taskstatus.component';

describe('TaskstatusComponent', () => {
  let component: TaskstatusComponent;
  let fixture: ComponentFixture<TaskstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
