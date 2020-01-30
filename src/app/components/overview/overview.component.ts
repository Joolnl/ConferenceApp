import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { MarkdownResponse } from 'src/app/contracts/markdown';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() items: Observable<MarkdownResponse[]>;
  @Input() baseUrl: string;

  constructor() {}

  ngOnInit() {}
}
