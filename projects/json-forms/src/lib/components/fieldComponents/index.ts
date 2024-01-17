import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FieldComponentBase } from './fieldComponentBase.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf, KeyValuePipe } from '@angular/common';
import { ErrorDisplayComponent } from '../error-display/error-display.component';

@Component({
  standalone: true,
  selector: 'lib-component-resolver',
  template: `<ng-template #container></ng-template>
    <lib-error-display
      [validations]="data.validations"
      [control]="getControl(data.name)"
    ></lib-error-display> `,
  styleUrls: ['form-styles.scss'],
  imports: [ReactiveFormsModule, NgClass, ErrorDisplayComponent],
})
export class ComponentResolverComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Input() controlType: any;
  @Input() data: any;
  @Input() formGroup: any;

  private componentRef: any;

  constructor() {}

  getControl(controlName: string) {
    return this.formGroup.get(controlName);
  }

  getHasErrors() {
    return this.formGroup.get(this.data.name)?.errors;
  }

  ngOnInit() {
    this.initComponent(this.controlType);
  }

  @HostBinding('class')
  get layoutClass() {
    const cols = this.data?.layout?.width || 12;
    return `col-${cols}`;
  }

  initComponent(type: string) {
    const component = componentMapping[type];

    if (component) {
      this.componentRef = this.container.createComponent(component);
      this.componentRef.instance.data = this.data;
      this.componentRef.instance.formGroup = this.formGroup;
    }

    return component;
  }
}

// Text
@Component({
  standalone: true,
  template: `<div [formGroup]="formGroup">
    <label>{{ data.label }}<span *ngIf="getIsRequired()">*</span></label>
    <input
      [type]="data.type"
      [formControlName]="data.name"
      [placeholder]="data.placeholder"
      [ngClass]="{'input-error': getHasErrorAndTouched()}"
    />
  </div>`,
  imports: [ReactiveFormsModule, NgIf, KeyValuePipe, NgClass ],
  styleUrls: ['form-styles.scss'],
})
class InputComponent extends FieldComponentBase {}

// Select
@Component({
  standalone: true,
  template: `<div [formGroup]="formGroup">
    <label>{{ data.label }}<span *ngIf="getIsRequired()">*</span></label>
    <select [formControlName]="data.name" [ngClass]="{'input-error': getHasErrorAndTouched()}">
      <option *ngFor="let option of data.options" [value]="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>`,
  imports: [ReactiveFormsModule, NgForOf, NgIf, NgClass],
  styleUrls: ['form-styles.scss'],
})
class SelectInputComponent extends FieldComponentBase {}

// Date
@Component({
  standalone: true,
  template: `<div [formGroup]="formGroup">
    <label>{{ data.label }}</label>
    <input [type]="data.type" [formControlName]="data.name" />
  </div>`,
  imports: [ReactiveFormsModule, NgForOf],
  styleUrls: ['form-styles.scss'],
})
class DateInputComponent extends FieldComponentBase {}

// Textarea
@Component({
  standalone: true,
  template: `<div [formGroup]="formGroup">
    <label>{{ data.label }}</label>
    <textarea
      [rows]="data.rows ?? 2"
      [formControlName]="data.name"
      [placeholder]="data.placeholder"
    ></textarea>
  </div>`,
  imports: [ReactiveFormsModule, NgForOf],
  styleUrls: ['form-styles.scss'],
})
class TextAreaInputComponent extends FieldComponentBase {}

// Button
@Component({
  standalone: true,
  template: `<button [ngClass]="data.layout?.class">{{ data.label }}</button>`,
  imports: [ReactiveFormsModule, NgClass],
  styleUrls: ['form-styles.scss'],
})
class ButtonComponent extends FieldComponentBase {}

// Group
@Component({
  standalone: true,
  template: `
    <div class="groupWrapper">
      <h2 *ngIf="data?.label" class="groupLabel">{{ data.label }}</h2>
      <div
        class="group grid-container"
        [ngClass]="getLayoutClass(data.layout?.width)"
      >
        <ng-container *ngFor="let field of data.controls">
          <lib-component-resolver
            [formGroup]="formGroup"
            [controlType]="field.type"
            [data]="field"
            [formGroup]="getNestedFormGroup(formGroup)"
          ></lib-component-resolver>
        </ng-container>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, NgForOf, ComponentResolverComponent, NgClass, NgIf],
  styleUrls: ['form-styles.scss'],
})
export class GroupInputComponent extends FieldComponentBase {
  getNestedFormGroup(formGroup: FormGroup) {
    try {
      if (formGroup && formGroup?.get(this.data.name)) {
        const childFormGroup = formGroup.get(this.data.name);
        return childFormGroup as FormGroup;
      } else {
        throw new Error('No form group');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

// Array
// @Component({
//   standalone: true,
//   template: `
//     <h2>{{ data.label }}</h2>

//     <div [formGroup]="formGroup" class="array">
//       <ng-container [formArrayName]="data.name">
//         <ng-container
//           *ngFor="
//             let contact of formGroup.get(data.name).controls;
//             let i = index
//           "
//         >
//           <div [formGroupName]="i">
//             <ng-container *ngFor="let field of data.controls">
//               <lib-component-resolver
//                 [formGroup]="formGroup.get(data.name).controls[i]"
//                 [controlType]="field.type"
//                 [data]="field"
//               ></lib-component-resolver>
//             </ng-container>
//           </div>
//         </ng-container>
//       </ng-container>
//     </div>
//   `,
//   imports: [ReactiveFormsModule, NgForOf, ComponentResolverComponent],
//   styleUrls: ['form-styles.scss'],
// })
// export class ArrayInputComponent extends FieldComponentBase {}

export const componentMapping: Record<string, any> = {
  text: InputComponent,
  password: InputComponent,
  number: InputComponent,
  date: InputComponent,
  textarea: TextAreaInputComponent,

  select: SelectInputComponent,
  group: GroupInputComponent,
  button: ButtonComponent,
};
