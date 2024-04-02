import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeursComponent } from './contributeurs.component';

describe('ContributeursComponent', () => {
  let component: ContributeursComponent;
  let fixture: ComponentFixture<ContributeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContributeursComponent]
    });
    fixture = TestBed.createComponent(ContributeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
