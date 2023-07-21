import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor() { }
  validation(form: any) {
    if (form.value.newPassword === form.value.password) {
      return null;
    }
    return form.get('password').setErrors({ mismatch: true });
  }
}
