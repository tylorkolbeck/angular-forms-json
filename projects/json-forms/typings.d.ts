import { AbstractControl } from '@angular/forms';

declare module '@angular/forms' {
  export interface AbstractControl {
    controlType: string;
  }
}

AbstractControl.prototype.controlType = 'TEST';