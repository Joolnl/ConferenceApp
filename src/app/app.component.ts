import { IdleMonitorService } from '@scullyio/ng-lib';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private idle: IdleMonitorService, translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

}
