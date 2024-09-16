import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  user: any;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loggedUser(2);
  }

  loggedUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (result) => {
        this.user = result;
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

}
