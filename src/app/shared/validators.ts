import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  return /^[a-zA-Z0-9\.-]{6,}@[a-zA-Z0-9]{2,}\.(bg|com|us)$/.test(control.value) ? null : {
    invalidEmail: true
  };

}

export function sameValueAsFactory(getTargetControl: () => AbstractControl) {
  return function (control: AbstractControl) {
    const targetControl = getTargetControl();
    return targetControl?.value === control?.value ? null : { sameValue: true }
  }
}
