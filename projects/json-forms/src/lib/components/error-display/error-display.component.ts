import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForOf, KeyValuePipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'lib-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['../fieldComponents/form-styles.scss'],
  imports: [NgForOf, KeyValuePipe, NgIf],
})
export class ErrorDisplayComponent {
  @Input() control: FormControl | null = null;
  @Input() validations: any = null;

  constructor() {}

  getValidationMessage(validation: any) {
    if (typeof validation.value !== 'string') {
      return this.validations.find(
        (v: any) => v.name.toUpperCase() === validation.key.toUpperCase()
      );
    } else {
      return { message: validation.value } // this was a passed in validation
    }
  }
}
