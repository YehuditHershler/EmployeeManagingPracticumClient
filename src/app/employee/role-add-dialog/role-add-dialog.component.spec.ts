import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddDialogComponent } from './role-add-dialog.component';

describe('RoleAddDialogComponent', () => {
  let component: RoleAddDialogComponent;
  let fixture: ComponentFixture<RoleAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
