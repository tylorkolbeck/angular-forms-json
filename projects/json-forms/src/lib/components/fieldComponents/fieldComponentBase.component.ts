import { Component, ElementRef, EventEmitter, Input, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ControlType } from '../../form.model';
import { DynamicFormService } from '../../services/dynamicForm/dynamic-form.service';

@Component({
  standalone: true,
  template: ``,
})
export class FieldComponentBase {
  @Input() data: any;
  @Input() formGroup: any;

  // formArray: any = null;

  arrayReferenceForClone: any = null;

  @Input() arrayIndex: number | null = null;
  @Input() formArrayRef: any = null;

  constructor(private renderer: Renderer2, private el: ElementRef, private dynamicFormService: DynamicFormService) {}

  btnActionMap: Record<string, () => void> = {
    deleteArrayItem: () => this.deleteArrayItem(this.arrayIndex, this.formArrayRef),
    addArrayItem: () => this.addArrayItem(this.arrayIndex, this.formArrayRef),
    submit: () => this.dynamicFormService.submitHandler(),
  }

  mapButtonAction() {
    const action = this.btnActionMap[this.data.action];

    if (typeof action !== 'function') {
      return null
    } else {
      return action;
    }
  }

  deleteArrayItemCallback: EventEmitter<number> = new EventEmitter();

  ngAfterViewInit() {
    if (this.getFormArray() instanceof FormArray) {
      this.createArrayItemReference();
    }

    if (this.data.type === ControlType.Button && this.el) {
      const action = this.mapButtonAction();

      if (action) {
        this.renderer.listen(this.el.nativeElement, 'click', () => {
          action();
        });
      } else {
        console.warn("Action does not exist: ", this.data.action, " for button: ", this.data.label || "No label")
      }
    }
  }

  // Get the index in a form array of the current control
  get index() {
    return this.arrayIndex;
  }

  /**
   *
   *  Need to make a reference to the first item in the array so we can clone it later
   * even if all were deleted
   *
   * */
  createArrayItemReference() {
    const formItem = this.getFormArray();
    this.arrayReferenceForClone = this.cloneFormGroup(
      formItem.controls[0] as FormGroup
    );
  }

  cloneFormGroup(original: FormGroup): FormGroup {
    const cloned = new FormGroup({});
    if (!original) {
      return cloned;
    }
    Object.keys(original.controls).forEach((key) => {
      const control = original.get(key);
      if (control instanceof FormControl) {
        cloned.addControl(key, new FormControl('')); // or use control.value if you want to copy values too
      } else if (control instanceof FormGroup) {
        cloned.addControl(key, this.cloneFormGroup(control));
      } else if (control instanceof FormArray) {
        cloned.addControl(key, new FormArray([])); // You might want to recursively clone array items too if needed
      }
    });
    return cloned;
  }

  addArrayItem(index: number | null, formArrayRef: any) {
    if (this.arrayReferenceForClone) {
      const groupClone = this.cloneFormGroup(this.arrayReferenceForClone);

      if (formArrayRef) {
        formArrayRef.controls.push(groupClone);
      }
    }
  }

  deleteArrayItem(index: number | null, formArrayRef: any) {
    if (index === null) {
      return;
    }

    if (formArrayRef && typeof formArrayRef.removeAt === 'function') {
      formArrayRef.removeAt(index);
    } else {
      console.warn(
        "Tried to delete array item but couldn't find the form array"
      );
    }
  }

  getFormArray() {
    return this.formGroup.get(this.data.name) as FormArray;
  }

  getLayoutClass(cols: number) {
    if (!cols) {
      return 'col-12';
    }
    return `col-${cols}`;
  }

  getHasErrorAndTouched() {
    const control = this.formGroup.get(this.data.name);
    return control?.touched && control?.invalid;
  }

  getIsRequired() {
    return this.data.validations?.find((v: any) => v.name === 'required');
  }


}
