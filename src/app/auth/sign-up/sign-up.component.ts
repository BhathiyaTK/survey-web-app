import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  showPassword: boolean = false;
  showConfPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfPasswordVisibility(): void {
    this.showConfPassword = !this.showConfPassword;
  }
}
