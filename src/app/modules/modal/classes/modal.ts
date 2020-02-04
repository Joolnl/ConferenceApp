import { Inject, Renderer2, HostListener } from '@angular/core';
import { OVERLAY_TOKEN, OverlayToken } from '../contracts/overlay';

export abstract class Modal {
  constructor(protected renderer: Renderer2, @Inject(OVERLAY_TOKEN) protected overlay: OverlayToken) {}

  close() {
    this.overlay.overlayRef.dispose();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close();
  }
}
