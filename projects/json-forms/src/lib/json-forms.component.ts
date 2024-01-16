import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { JSONControl, JSONForm } from './form.model';
import { DynamicFormService } from './services/dynamicForm/dynamic-form.service';

@Component({
  selector: 'json-forms',
  templateUrl: './json-forms.component.html',
  styles: [],
  providers: [DynamicFormService],
})
export class JsonFormsComponent implements OnInit {
  @Input() formData: JSONForm | JSONControl | null = null;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  get formGroup() {
    return this.dynamicFormService.form;
  }

  constructor(private dynamicFormService: DynamicFormService) {
    this.dynamicFormService.onSubmit.subscribe((value) => {
      debugger;
      this.onSubmit.emit(value);
    });
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
