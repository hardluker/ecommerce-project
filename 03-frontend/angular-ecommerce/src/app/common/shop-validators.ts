import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  //whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    // Check if the string only contains whitespace
    if (control.value != null && control.value.trim().length === 0) {
      //invalid, return error object
      return { notOnlyWhitespace: true };
    } else {
      //Valid, return false
      return null;
    }
  }
}
