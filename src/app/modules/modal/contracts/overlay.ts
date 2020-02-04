import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export const OVERLAY_TOKEN = new InjectionToken<OverlayToken>('OVERLAY_TOKEN_DATA');

export interface OverlayToken {
  overlayRef: OverlayRef;
  data: OverlayTokenData;
}

export interface OverlayTokenData {
  [key: string]: any;
}
