import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {emailValidator, sameValueAsFactory} from "../../shared/validators";
import {ContentService} from "../../content.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {




   // form: FormGroup;

  emailValidator = emailValidator;
  nrSelect: string = 'Male';

  registerError = '';



  constructor( private fb: FormBuilder, private userService: UserService,private router: Router) {

    // this.form = this.fb.group({
    //   fname: ['',[Validators.required, Validators.minLength(6)]],
    //   sname: ['',[Validators.required, Validators.minLength(6)]],
    //   address: ['',[Validators.required]],
    //   pnumber: ['',[Validators.required, Validators.minLength(8)]],
    //   email: ['', [Validators.required, emailValidator]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   repeatPassword: ['', Validators.minLength(8), [Validators.required]]
    // });

    //sameValueAsFactory(() => this.form.get("password")!)

    // this.form = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required,Validators.minLength(6)],
    //   repeatPassword: ['', Validators.required,Validators.minLength(6)]
    // });
    // const sameValueValidate = sameValueValidateFactory('repeatPassword',this.form.get('password'),'password')
    //
    // this.form.controls.repeatPassword.setValidators([this.form.controls.resetPassword])
  // }
// registerHandler(form: NgForm) {
  //   if (form.invalid) {
  //     console.log("invalid datas!");
  //   }
  // }
}


  register(form: NgForm): void {
    this.registerError = '';

    if (form.invalid) {
      return;
    }
    this.userService.register(form.value).subscribe({
      next:(user) => {
  this.router.navigate(['/']);
    console.log(user.session.authToken)
        this.userService.populateLocalStorage(user);
      },
      error: (err) => {
        console.error(err.error)
        this.registerError = err.error;
        //  setInterval(() => {
        //   this.registerError = '';
        // },20000)

      }
    })
  }
}
