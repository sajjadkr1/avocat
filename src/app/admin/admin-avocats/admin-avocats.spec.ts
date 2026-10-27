import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAvocats } from './admin-avocats';

describe('AdminAvocats', () => {
  let component: AdminAvocats;
  let fixture: ComponentFixture<AdminAvocats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAvocats],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAvocats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
