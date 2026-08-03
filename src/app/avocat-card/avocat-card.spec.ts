import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatCard } from './avocat-card';

describe('AvocatCard', () => {
  let component: AvocatCard;
  let fixture: ComponentFixture<AvocatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvocatCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AvocatCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
