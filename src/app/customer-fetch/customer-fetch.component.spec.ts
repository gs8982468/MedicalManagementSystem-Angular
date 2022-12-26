import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFetchComponent } from './customer-fetch.component';

describe('CustomerFetchComponent', () => {
  let component: CustomerFetchComponent;
  let fixture: ComponentFixture<CustomerFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFetchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
