import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'heading',
  templateUrl: './heading.component.html'
})
export class HeadingComponent {
  @Input() size: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  constructor() {}
}
