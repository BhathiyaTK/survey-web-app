import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  showPassword: boolean = false;
  selectedQuoteIndex!: number;
  selectedQuote: any[] = [];
  isSigningIn: boolean = false;

  quotesList = [
    { person: "Steve Jobs", title: "Founder of Apple Inc.", pic: "assets/images/quotes/steve_jobs.png", desc: "That's been one of my mantras - focus and simplicity. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it's worth it in the end because once you get there, you can move mountains." },
    { person: "Elon Musk", title: "Founder & CEO of Tesla, PayPal & SpaceX", pic: "assets/images/quotes/elon_musk.png", desc: "In order to make the right decisions, you have to understand something. If you don’t understand something at a detailed level, you cannot make a decision."},
    { person: "Jeff Bezos", title: "Founder of Amazon", pic: "assets/images/quotes/jeff_bezos.png", desc: "One of the huge mistakes people make is that they try to force an interest on themselves. You don’t choose your passions. Your passions choose you."},
    { person: "Mark Zuckerberg", title: "Founder & CEO of Meta", pic: "assets/images/quotes/mark_zuckerberg.png", desc: "The biggest risk is not taking any risk. In a world that is changing really quickly, the only strategy that is guaranteed to fail is not taking risks."},
    { person: "Bill Gates", title: "Co-Founder of Microsoft", pic: "assets/images/quotes/bill_gates.png", desc: "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don’t let yourself be lulled into inaction."}
  ];

  constructor(private auth: AuthService, private router: Router) {}

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });

  ngOnInit(): void {
    this.pickQuoteIndex();
  }

  get sign_in() {
    return this.signinForm.controls;
  }

  pickQuoteIndex(): void {
    this.selectedQuoteIndex = Math.floor(Math.random() * this.quotesList.length);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  singIn(): void {
    this.isSigningIn = true;
    if (this.signinForm.valid) {
      this.auth.signIn(this.signinForm.value).subscribe({
        next: (res) => {
          this.signinForm.reset();
          this.router.navigateByUrl('/main');
          this.isSigningIn = false;
          localStorage.setItem('techxplore_token', res.token);
        },
        error: (err) => {
          alert(err.error.message);
          this.isSigningIn = false;
        }
      })
    } else {
      alert('Details you entered are invalid. Please validate.');
    }
    // console.log(this.signinForm.value);
  }
}
