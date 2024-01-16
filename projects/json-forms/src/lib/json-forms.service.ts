import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class JsonFormsService {
  constructor(private fb: FormBuilder) {}

}
