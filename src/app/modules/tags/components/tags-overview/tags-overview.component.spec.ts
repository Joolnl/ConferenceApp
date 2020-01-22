import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsOverviewComponent } from './tags-overview.component';

describe('TagsOverviewComponent', () => {
  let component: TagsOverviewComponent;
  let fixture: ComponentFixture<TagsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagsOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
