import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('password') passwordField!: ElementRef;

  showPassword: boolean = false;
  showConfPassword: boolean = false;
  selectedQuoteIndex!: number;
  selectedQuote: any[] = [];
  passwordFieldPosition: number = 0;
  isPasswordValidBoxShow: boolean = false;
  isConfPassword: boolean = false;
  positionOfPasswordValidBox: any = '0';
  passwordReqs: any = {};
  confirmPasswordReqs: any = {};

  quotesList = [
    {
      person: 'Steve Jobs',
      title: 'Founder of Apple Inc.',
      pic: 'assets/images/quotes/steve_jobs.png',
      desc: "That's been one of my mantras - focus and simplicity. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it's worth it in the end because once you get there, you can move mountains.",
    },
    {
      person: 'Elon Musk',
      title: 'Founder & CEO of Tesla, PayPal & SpaceX',
      pic: 'assets/images/quotes/elon_musk.png',
      desc: 'In order to make the right decisions, you have to understand something. If you don’t understand something at a detailed level, you cannot make a decision.',
    },
    {
      person: 'Jeff Bezos',
      title: 'Founder of Amazon',
      pic: 'assets/images/quotes/jeff_bezos.png',
      desc: 'One of the huge mistakes people make is that they try to force an interest on themselves. You don’t choose your passions. Your passions choose you.',
    },
    {
      person: 'Mark Zuckerberg',
      title: 'Founder & CEO of Meta',
      pic: 'assets/images/quotes/mark_zuckerberg.png',
      desc: 'The biggest risk is not taking any risk. In a world that is changing really quickly, the only strategy that is guaranteed to fail is not taking risks.',
    },
    {
      person: 'Bill Gates',
      title: 'Co-Founder of Microsoft',
      pic: 'assets/images/quotes/bill_gates.png',
      desc: 'We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don’t let yourself be lulled into inaction.',
    },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/),
      ]),
    },
    { validators: this.auth.customPasswordMatching.bind(this) }
  );

  ngOnInit(): void {
    this.pickQuoteIndex();
    // let datas = document.getElementById('password')?.getBoundingClientRect();
  }

  get sign_up() {
    return this.signupForm.controls;
  }

  pickQuoteIndex(): void {
    this.selectedQuoteIndex = Math.floor(
      Math.random() * this.quotesList.length
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfPasswordVisibility(): void {
    this.showConfPassword = !this.showConfPassword;
  }

  togglePasswordValidBox(): void {
    this.isPasswordValidBoxShow = true;
  }

  validatePassword(passwordVal: any): void {
    this.passwordReqs = this.auth.passwordValidator(passwordVal);
  }

  validateConfirmPassword(passwordVal: any): void {
    this.confirmPasswordReqs = this.auth.passwordValidator(passwordVal);
  }

  signUp(): void {
    if (this.signupForm.valid) {
      const signupObj: any = this.signupForm.value;
      signupObj['Role'] = 'user';
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.router.navigateByUrl('/sign-in');
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    } else {
      alert('Details you entered are invalid. Please validate.');
    }
    // console.log(this.signupForm.value);
  }
}
