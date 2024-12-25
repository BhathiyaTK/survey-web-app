import { KeyValue, KeyValuePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { CareerTestService } from 'src/app/services/career-test.service';
import { UsersService } from 'src/app/services/users.service';

interface TestResultItem {
  [key: string]: number; // Allows any key with a numeric value
}

interface SelectedResult {
  id: number;
  refNo: number;
  userId: string;
  testInputsObj: Object;
  testedOn: string;
  testResult: TestResultItem[];
  scoreSum: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any;
  progressList: any[] = [];
  selectedResult: SelectedResult = {
    id: 0,
    refNo: 0,
    userId: '',
    testInputsObj: {},
    testedOn: '',
    testResult: [],
    scoreSum: 0
  };

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private careerService: CareerTestService,
    private location: Location,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    const token = this.authService.decodeToken();
    if (token) {
      this.getUserData(parseInt(token.nameid));
    } else {
      this.dialog.open(DialogComponent, {
        data: {
          isResponse: true,
          responseMsg: "Token not found!",
          responseType: 1
        }
      });
    }

    this.getAllTestData();
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

  getAllTestData(): void {
    this.careerService.getAllTests().subscribe({
      next: (response) => {
        this.progressList = response;
        // this.selectedResultSet(this.progressList[0]);
        console.log(this.progressList.reverse());
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectedResultSet(result: any): void {
    result.testInputsObj = JSON.parse(result.testInputsObj);
    result.testResult = JSON.parse(result.testResult);
    let scoreSum = result.testResult.reduce((sum: any, item: any) => sum + Object.values(item)[0], 0) as number;
    result['scoreSum'] = scoreSum;
    this.selectedResult = result;
    console.log(this.selectedResult);
  }

  goBack(): void {
    this.location.back();
  }

}
