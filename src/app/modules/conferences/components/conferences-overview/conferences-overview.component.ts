import { Observable } from 'rxjs';
import { ConferencesService } from './../../../../services/conferences.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conferences-overview',
  templateUrl: './conferences-overview.component.html',
  styleUrls: ['./conferences-overview.component.scss']
})
export class ConferencesOverviewComponent implements OnInit {
  conferences$: Observable<any>;

  constructor(private conferencesService: ConferencesService) {}

  ngOnInit() {
    this.conferences$ = this.conferencesService.getAllConferences();
  }
}
