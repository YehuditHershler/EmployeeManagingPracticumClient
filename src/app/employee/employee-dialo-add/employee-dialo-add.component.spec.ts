import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialoAddComponent } from './employee-dialo-add.component';

describe('EmployeeDialoAddComponent', () => {
  let component: EmployeeDialoAddComponent;
  let fixture: ComponentFixture<EmployeeDialoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDialoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDialoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
