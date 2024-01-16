import { Injectable, EventEmitter } from '@angular/core';
import { ControlType, JSONControl, JSONForm } from '../../form.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private _form: FormGroup | null = null;
  private _formData: JSONForm | null = null;

  onSubmit: EventEmitter<any> = new EventEmitter();
  onChange: EventEmitter<any> = new EventEmitter();
  onCancel: EventEmitter<boolean> = new EventEmitter();

  arrayClones: any = {};

  get form(): FormGroup | null {
    return this._form;
  }

  set form(formData: FormGroup | null) {
    this._form = formData;
  }

  get formData(): JSONForm | null {
    return this._formData;
  }

  set formData(formData: JSONForm | null) {
    this._formData = formData;

    if (formData) {
      this.form = this.createFormGroupFromSchema(formData);
      this.form.valueChanges.subscribe((value) => {
        this.onChange.emit(value);
      });
    }
  }

  constructor(private fb: FormBuilder) {}

  cancelHandler() {
    this.onCancel.emit(true);
  }

  submitHandler() {
    if (this.form?.invalid) {
      this.form?.markAllAsTouched();
    } else {
      if (this.form) this.onSubmit.emit(this.form.value);
    }
  }

  createFormGroupFromSchema(
    form: JSONForm | JSONControl,
    parentKey: string = ''
  ) {
    const formGroup: any = {};

    form?.controls?.forEach((control) => {
      const currentKey = parentKey
        ? `${parentKey}.${control.name}`
        : control.name;

      if (
        control.type !== ControlType.Group &&
        control.type !== ControlType.Array &&
        control.type !== ControlType.Button
      ) {
        formGroup[control.name] = [
          '', // initial value
          control.validations ? this.getValidators(control.validations) : [], // validators
        ];
      } else if (control.type === ControlType.Group) {
        formGroup[control.name] = this.createFormGroupFromSchema(
          control,
          currentKey
        );
      } else if (control.type === ControlType.Array) {
        // create a reference to the array data for cloning
        if (!this.arrayClones[control.name]) {
          this.arrayClones[control.name] = control.controls?.filter(
            (c) => c.type === ControlType.Group
          );
        }

        formGroup[control.name] = this.fb.array([
          this.createFormGroupFromSchema(control, currentKey), // create a form group for each item in the array
        ]);
      }
    });

    return this.fb.group(formGroup);
  }

  private getValidators(validations: any[]): any[] {
    const validatorsArray: any[] = [];

    validations?.forEach(val => {
      switch (val.name) {
        case 'required':
          validatorsArray.push(Validators.required);
          break;
        case 'minLength':
          validatorsArray.push(Validators.minLength(val.value));
          break;
        // add other validators as needed
      }
    });
    return validatorsArray;
  }
}
