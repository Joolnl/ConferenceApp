import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencesOverviewComponent } from './conferences-overview.component';

describe('ConferencesOverviewComponent', () => {
  let component: ConferencesOverviewComponent;
  let fixture: ComponentFixture<ConferencesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConferencesOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
