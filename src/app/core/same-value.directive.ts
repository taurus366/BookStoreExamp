import {Directive, Input, OnDestroy} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NgForm, ValidationErrors, Validator} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appSameValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueDirective,
      multi: true
    }
  ]
})
export class SameValueDirective implements Validator {

  @Input() appSameValue = "";
  @Input() secondPassValue!: string;

  otherControl!: AbstractControl;
  subscription!: Subscription;

  constructor(private form:NgForm) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const firstPasswordValue = this.form.controls[this.appSameValue]?.value;

    const secondPasswordValue = control.value;

    const firstPasswordForm = this.form.controls[this.appSameValue];
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = firstPasswordForm.valueChanges.subscribe(() => {
      control.updateValueAndValidity({onlySelf: false})
    })
    // console.log('firstPAssword: ' + firstPasswordValue);
    // console.log('secondPAssword: ' + this.secondPassValue);
    // console.log(control.value);



    // console.log(firstPasswordValue)
    // console.log(secondPasswordValue)

    return secondPasswordValue !== firstPasswordValue ? {
      firstPassValue: {
        [this.appSameValue]: firstPasswordValue,
        [this.secondPassValue]: secondPasswordValue
      }
    } : null;

  }



}

