import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { JSONControl, JSONForm } from './form.model';
import { DynamicFormService } from './services/dynamicForm/dynamic-form.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'json-forms',
  templateUrl: './json-forms.component.html',
  styles: [],
  providers: [DynamicFormService],
})
export class JsonFormsComponent implements OnInit, OnChanges {
  @Input() formData: JSONForm | JSONControl | null = null;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter(); 
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  get formGroup() {
    return this.dynamicFormService.form;
  }

  constructor(private dynamicFormService: DynamicFormService) {
    this.dynamicFormService.onSubmit.subscribe((value) => {
      this.onSubmit.emit(value);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      this.updateDynamicForm(changes['formData'].currentValue);
    }
  }

  updateDynamicForm(newFormData: JSONForm | JSONControl | null): void {
    if (!newFormData) {
      newFormData = { controls: [], values: {} };
    }
  
    this.dynamicFormService.formData = newFormData as JSONForm;
    // any other logic you need to reinitialize or update the form
  }

  ngOnInit(): void {
    if (!this.formData) {
      this.formData = {
        controls: [],
        values: {},
      };
    }

    this.dynamicFormService.formData = this.formData as JSONForm;
    this.dynamicFormService.onChange.subscribe((value) => {
      this.onChange.emit(value);
    });
  }
}
