import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonComponent } from './home-person.component';

describe('HomePersonComponent', () => {
  let component: HomePersonComponent;
  let fixture: ComponentFixture<HomePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
