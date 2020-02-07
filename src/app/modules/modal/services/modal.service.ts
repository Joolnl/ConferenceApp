import { OverlayTokenData, OVERLAY_TOKEN } from './../contracts/overlay';
import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  private createInjector(overlayRef: OverlayRef, data: OverlayTokenData): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(OVERLAY_TOKEN, {
      overlayRef,
      data
    });

    return new PortalInjector(this.injector, injectionTokens);
  }

  createModal(component: any, data?: OverlayTokenData, options?: { [key: string]: any }): void {
    const overlayRef = this.overlay.create(options ? options : { hasBackdrop: true, width: '100%' });
    const portal = new ComponentPortal(component, null, this.createInjector(overlayRef, data || {}));
    overlayRef.attach(portal);
  }
}
