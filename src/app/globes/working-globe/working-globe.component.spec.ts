import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingGlobeComponent } from './working-globe.component';

describe('WorkingGlobeComponent', () => {
  let component: WorkingGlobeComponent;
  let fixture: ComponentFixture<WorkingGlobeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingGlobeComponent]
    });
    fixture = TestBed.createComponent(WorkingGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
