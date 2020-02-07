import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchModalComponent } from './components/search-modal/search-modal.component';

@NgModule({
  declarations: [SearchModalComponent],
  imports: [CommonModule, OverlayModule, ReactiveFormsModule, RouterModule, TranslateModule],
  exports: [SearchModalComponent, OverlayModule]
})
export class ModalModule {}
