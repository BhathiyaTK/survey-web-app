import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { jwtDecode } from 'jwt-decode';
import { CustomToken } from 'src/app/interface/custom-token';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  user: any;

  constructor(private userService: UsersService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.decodeToken();
    if (token) {
      this.loggedUser(parseInt(token.nameid));
    } else {
      alert('Token not found');
    }
  }

  loggedUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (result) => {
        this.user = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('techxplore_token');
    this.router.navigateByUrl('/');
  }
}
