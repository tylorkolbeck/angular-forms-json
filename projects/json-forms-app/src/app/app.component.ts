import { Component, OnInit } from '@angular/core';
import data from "../assets/forms/testform_without_array.json";
import { JSONForm } from 'json-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formJson: JSONForm = {
    controls: []
  };

  ngOnInit(): void {
    this.formJson = data as JSONForm;
  }

  submitHandler(value: any) {
    console.log("Form Submitted: ", value);
  }

  changeHandler(value: any) {
    console.log("Form Changed: ", value);
  }
}
