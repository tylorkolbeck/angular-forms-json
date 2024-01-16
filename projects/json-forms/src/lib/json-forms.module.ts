import { NgModule } from '@angular/core';
import { JsonFormsComponent } from './json-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentResolverComponent } from './components/fieldComponents';

@NgModule({
  declarations: [
    JsonFormsComponent,
  ],
  imports: [
    ComponentResolverComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    JsonFormsComponent,
  ]
})
export class JsonFormsModule { }
