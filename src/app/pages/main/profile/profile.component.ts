import { DatePipe, KeyValue, KeyValuePipe, Location } from '@angular/common';
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
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe],
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
  maxPath: string = '';
  maxScore: any = 0;
  isViewInputData: boolean = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private careerService: CareerTestService,
    private location: Location,
    private datePipe: DatePipe,
    public dialog: MatDialog,) {}

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
      next: (response: any[]) => {
        this.progressList = response.reverse();
        this.selectedResultSet(this.progressList[0]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectedResultSet(result: any): void {
    result.testInputsObj = JSON.parse(result.testInputsObj);
    if (result.testResult) {
      result.testResult = JSON.parse(result.testResult);
      let scoreSum = result.testResult.reduce((sum: any, item: any) => sum + Object.values(item)[0], 0) as number;

      let maxScoreRec = result.testResult.reduce((max: any, current: any) => {
        const currentValue: number = Object.values(current)[0] as number;
        const maxValue: number = Object.values(max)[0] as number;
        return (currentValue > maxValue) ? current : max;
      });

      const [key, value] = Object.entries(maxScoreRec)[0];
      this.maxPath = key.toString();
      this.maxScore = value;

      result['scoreSum'] = scoreSum;
    }
    this.selectedResult = result;
    console.log(this.selectedResult);
  }

  downloadInputJson(testInput: any, date: string): void {
    const stringfyJson = JSON.stringify(testInput);
    const blob = new Blob([stringfyJson], { type: 'application/json'});
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${this.datePipe.transform(date,'MM-dd-yyyy_hh-mm-ss-a')}.json`;
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  }

  goBack(): void {
    this.location.back();
  }

}
