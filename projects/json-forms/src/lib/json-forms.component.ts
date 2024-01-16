import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { JSONControl, JSONForm } from './form.model';
import { DynamicFormService } from './services/dynamicForm/dynamic-form.service';

@Component({
  selector: 'json-forms',
  templateUrl: './json-forms.component.html',
  styles: []
})
export class JsonFormsComponent implements OnInit {
  @Input() formData: JSONForm | JSONControl | null = null;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  get formGroup() {
    return this.dynamicFormService.form;
  }

  constructor(private dynamicFormService: DynamicFormService) {
    this.dynamicFormService.onSubmit.subscribe((value) => {
      this.onSubmit.emit(value);
    });
  }

  ngOnInit(): void {
    if (!this.formData) {
      throw new Error('JSON form was not passed to the component');
    }

    this.dynamicFormService.formData = this.formData as JSONForm;
  }
}