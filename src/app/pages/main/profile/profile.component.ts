import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  progressList: any[] = [
    {date: '2024-06-08', time: '10:24 AM'},
    {date: '2024-06-08', time: '01:15 PM'},
    {date: '2024-07-02', time: '09:05 AM'},
    {date: '2024-07-10', time: '08:47 AM'},
    {date: '2024-07-22', time: '05:32 PM'},
  ];

  constructor(private userService: UsersService, private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    const token = this.authService.decodeToken();
    if (token) {
      this.getUserData(parseInt(token.nameid));
    } else {
      alert('Token not found');
    }
  }

  getUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
