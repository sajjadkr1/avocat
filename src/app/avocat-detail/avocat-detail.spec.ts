import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatDetail } from './avocat-detail';

describe('AvocatDetail', () => {
  let component: AvocatDetail;
  let fixture: ComponentFixture<AvocatDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvocatDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AvocatDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
