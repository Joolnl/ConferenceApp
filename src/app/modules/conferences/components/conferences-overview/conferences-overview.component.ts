import { AppRoutesService } from './../../../../services/app-routes.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conferences-overview',
  templateUrl: './conferences-overview.component.html',
  styleUrls: ['./conferences-overview.component.scss']
})
export class ConferencesOverviewComponent implements OnInit {
  conferences$: Observable<any>;

  @Input() limit: number;
  @Input() heading = 1;

  constructor(private routes: AppRoutesService) {}

  ngOnInit() {
    this.conferences$ = this.routes.getRoutes('conferences', this.limit);
  }
}
