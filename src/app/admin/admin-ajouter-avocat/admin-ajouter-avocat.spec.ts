import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouterAvocat } from './admin-ajouter-avocat';

describe('AdminAjouterAvocat', () => {
  let component: AdminAjouterAvocat;
  let fixture: ComponentFixture<AdminAjouterAvocat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjouterAvocat],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAjouterAvocat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
