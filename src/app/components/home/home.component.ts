import { Observable } from 'rxjs';
import { TagService } from './../../services/tag.service';
import { Component, OnInit } from '@angular/core';
import { TagItems } from 'src/app/contracts/tags';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularTags$: Observable<TagItems>;

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.popularTags$ = this.tagService.getPopularTags(25);
  }
}
