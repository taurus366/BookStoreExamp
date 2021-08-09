import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  registerHandler(form: NgForm) {
    if (form.invalid) {
      console.log("invalid datas!");
    }
  }
}
