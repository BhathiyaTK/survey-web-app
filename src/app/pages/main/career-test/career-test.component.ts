import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CdkDragDrop, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CareerTestService } from 'src/app/services/career-test.service';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

@Component({
  selector: 'app-career-test',
  templateUrl: './career-test.component.html',
  styleUrls: ['./career-test.component.scss'],
})
export class CareerTestComponent {
  token: any;
  isSubmitted: boolean = false;

  stepOneFormGroup!: FormGroup;
  stepTwoFormGroup!: FormGroup;
  stepThreeFormGroup!: FormGroup;
  stepFourFormGroup!: FormGroup;
  stepFiveFormGroup!: FormGroup;
  stepSixFormGroup!: FormGroup;

  fuzzyObjArr: any[] = [];
  fuzzyOutputObj: any[] = [];

  academicGradesList: any[] = [100, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 29];

  fuzzyIndexes: any[] = [
    [
      [0, 1, 2, 4, 5],
      [0, 2, 4, 9, 10],
      [0, 5, 7, 8, 9],
      [0, 3, 6, 9, 14],
      [2, 12, 13, 14, 16],
    ],
    [
      [4, 5, 6, 7],
      [0, 2, 8, 9],
      [0, 13, 14, 15],
      [0, 1, 2, 3],
      [5, 10, 11, 12],
    ],
    [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [16, 17, 18, 19],
    ],
    [
      [0, 1, 2, 3, 4],
      [0, 3, 5, 6, 8],
      [7, 8, 9, 10, 11],
      [11, 12, 13, 14, 15],
      [12, 16, 17, 18, 19],
    ],
    [
      [0, 1, 7, 13, 15],
      [2, 7, 13, 15, 16],
      [7, 8, 13, 15, 16],
      [10, 13, 15, 16, 17],
      [6, 7, 13, 15, 17],
    ],
    [
      [0, 1, 6, 8, 9],
      [0, 1, 3, 6, 9],
      [0, 1, 2, 5, 6],
      [0, 1, 3, 4, 5],
      [0, 1, 3, 6, 9],
    ],
    [
      [0, 6, 7, 8, 9, 13, 22],
      [1, 6, 8, 9, 10, 11, 15],
      [2, 6, 10, 11, 13, 24, 25],
      [3, 6, 8, 9, 13, 14, 15],
      [4, 6, 7, 16, 17, 18, 19],
    ],
  ];

  submittedDataObj: any = {
    testInputsObj: {
      step1: {},
      step2: {},
      step3: {},
      step4: {},
      step5: {},
      step6: {},
      step7: {},
    },
  };

  displayedRowsStep1 = [
    { subject: 'Programming Fundamentals', radioOptCount: 12 },
    { subject: 'Data Structures and Algorithms', radioOptCount: 12 },
    { subject: 'Database Systems', radioOptCount: 12 },
    { subject: 'Web Technologies', radioOptCount: 12 },
    { subject: 'Object-Oriented Programming', radioOptCount: 12 },
    { subject: 'Software Engineering', radioOptCount: 12 },
    { subject: 'Software Design Patterns', radioOptCount: 12 },
    { subject: 'Software Architecture and Design', radioOptCount: 12 },
    { subject: 'Software Project Management', radioOptCount: 12 },
    { subject: 'Agile Software Development', radioOptCount: 12 },
    { subject: 'Software Quality Assurance', radioOptCount: 12 },
    { subject: 'Human Computer Interaction', radioOptCount: 12 },
    { subject: 'Operating Systems', radioOptCount: 12 },
    { subject: 'Data Communication and Computer Networks', radioOptCount: 12 },
    { subject: 'Cloud Computing', radioOptCount: 12 },
    { subject: 'Mobile Computing', radioOptCount: 12 },
    { subject: 'Systems Administration and Maintenance', radioOptCount: 12 },
    { subject: 'Mini Project', radioOptCount: 12 },
    { subject: 'Industrial Traning', radioOptCount: 12 },
    { subject: 'Research Project', radioOptCount: 12 },
  ];

  displayedRowsStep2 = [
    { task: 'Requirement elicitation and analysis', radioOptCount: 5 },
    { task: 'Architecture modelling and diagramming', radioOptCount: 5 },
    { task: 'Prototyping (mockups, wireframes, sitemaps etc.)', radioOptCount: 5 },
    { task: 'UI design & implementation', radioOptCount: 5 },
    { task: 'Coding and development', radioOptCount: 5 },
    { task: 'Debugging and troubleshooting', radioOptCount: 5 },
    { task: 'Unit testing', radioOptCount: 5 },
    { task: 'Bug fixing', radioOptCount: 5 },
    { task: 'Test cases development', radioOptCount: 5 },
    { task: 'Test execution', radioOptCount: 5 },
    { task: 'Environment & Database configuration', radioOptCount: 5 },
    { task: 'Version and revision controlling', radioOptCount: 5 },
    { task: 'Deployment and maintenance', radioOptCount: 5 },
    { task: 'Project planning and scheduling', radioOptCount: 5 },
    { task: 'Project monitoring and tracking', radioOptCount: 5 },
    { task: 'Reporting and documentation', radioOptCount: 5 },
  ];

  displayedRowsStep3 = [
    { task: 'Writing and maintaining code', radioOptCount: 5 },
    { task: 'Unit testing', radioOptCount: 5 },
    { task: 'Debugging and Troubleshooting', radioOptCount: 5 },
    { task: 'Bug fixing', radioOptCount: 5 },
    { task: 'Develop test plans and test cases', radioOptCount: 5 },
    { task: 'Manual test execution', radioOptCount: 5 },
    { task: 'Automation test execution', radioOptCount: 5 },
    { task: 'Bug reporting and tracking', radioOptCount: 5 },
    {
      task: 'Develop project objectives, budgets, and schedules',
      radioOptCount: 5,
    },
    { task: 'Monitor and track project progress', radioOptCount: 5 },
    { task: 'Manage project tasks and resources', radioOptCount: 5 },
    { task: 'Report and document project progress', radioOptCount: 5 },
    {
      task: 'Design and build prototypes (mockups, wireframes)',
      radioOptCount: 5,
    },
    { task: 'Design and implement UI components', radioOptCount: 5 },
    { task: 'UI testing and bug fixing', radioOptCount: 5 },
    { task: 'Conducting user research', radioOptCount: 5 },
    {
      task: 'Implementing and maintaining IT infrastructure',
      radioOptCount: 5,
    },
    { task: 'Monitoring performance and troubleshooting', radioOptCount: 5 },
    { task: 'Deploying updates and fixes (CI/CD)', radioOptCount: 5 },
    { task: 'Security checks and system backups', radioOptCount: 5 },
  ];

  displayedRowsStep4_1 = [
    {
      task: 'Hands-on skills with tech stacks (languages, frameworks, tools, APIs)',
      radioOptCount: 5,
    },
    { task: 'Algorithms and data structures skills', radioOptCount: 5 },
    {
      task: 'Software design patterns and architectures skills',
      radioOptCount: 5,
    },
    { task: 'Debugging & bug fixing skills', radioOptCount: 5 },
    {
      task: 'Hands-on experience with software version & revision controlling',
      radioOptCount: 5,
    },
    {
      task: 'Hands-on experience with software quality assurance process',
      radioOptCount: 5,
    },
    { task: 'Hands-on skills with test automation', radioOptCount: 5 },
    {
      task: 'Hands-on experience with software project management process',
      radioOptCount: 5,
    },
    {
      task: 'Hands-on experience in agile software development',
      radioOptCount: 5,
    },
    {
      task: 'Hands-on experience with software estimation techniques',
      radioOptCount: 5,
    },
    { task: 'Presentation and public speaking skills', radioOptCount: 5 },
    { task: 'English language proficiency', radioOptCount: 5 },
    { task: 'Technical writing and documentation skills', radioOptCount: 5 },
    {
      task: 'Visual communication skills (prototyping, wireframing, mock-ups etc.)',
      radioOptCount: 5,
    },
    {
      task: 'Hands-on experience with UI/UX design and visual design',
      radioOptCount: 5,
    },
    { task: 'User research and usability testing', radioOptCount: 5 },
    {
      task: 'Network & system administration (scripting, configuration management)',
      radioOptCount: 5,
    },
    { task: 'Diagnosis & troubleshooting skills', radioOptCount: 5 },
    {
      task: 'Hands-on experience with firewalls and security monitoring tools',
      radioOptCount: 5,
    },
    { task: 'Hands-on experience with CI/CD', radioOptCount: 5 },
  ];

  displayedRowsStep4_2 = [
    { task: 'Critical/ logical thinking', radioOptCount: 5 },
    { task: 'Problem solving', radioOptCount: 5 },
    { task: 'Time management', radioOptCount: 5 },
    { task: 'Planning and organization', radioOptCount: 5 },
    { task: 'Leadership', radioOptCount: 5 },
    { task: 'Conflict management', radioOptCount: 5 },
    { task: 'Discipline', radioOptCount: 5 },
    { task: 'Positive attitude', radioOptCount: 5 },
    { task: 'Strong work ethics', radioOptCount: 5 },
    { task: 'Emotional Intelligence', radioOptCount: 5 },
    { task: 'Effecive communication', radioOptCount: 5 },
    { task: 'Analytical ability', radioOptCount: 5 },
    { task: 'Negotiation and persuading', radioOptCount: 5 },
    { task: 'Team working and collaboration', radioOptCount: 5 },
    { task: 'Decision making', radioOptCount: 5 },
    { task: 'Self confidence', radioOptCount: 5 },
    { task: 'Active listening and attention to details', radioOptCount: 5 },
    { task: 'Curiosity and eagerness to learn', radioOptCount: 5 },
    { task: 'Empathy', radioOptCount: 5 },
    { task: 'Creativity', radioOptCount: 5 },
  ];

  displayedRowsStep5 = [
    {
      activity:
        'Participation in national or university level competitions (hackthons, ideathons, coding challenges etc.)',
      radioOptCount: 5,
    },
    {
      activity:
        'Placements in national or university level competitions (hackthons, ideathons, coding   challenges etc.)',
      radioOptCount: 5,
    },
    {
      activity:
        'Participation in professional development workshops and training programs',
      radioOptCount: 5,
    },
    {
      activity:
        'Participation in tech community initiatives such as meetups, tech talks, conferences, bootcamps etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Volunteering in student societies such as Society of Computer Science, IEEE Student Branch, WIE, ISACA etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Volunteering in clubs such as Toastmaster Club, GavelClub, Rotaract Club, Leo Club etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Volunteering as a resource person, speaker, mentor, and organizer in initiatives such as hackthons, meetups, tech talks etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Active membership (Student/Associate) in charted organizations such as BCS, ACS, IESL, CSSL etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Actively engaging in online tech forums such as Stack overflow, Code Project, GitHub etc.',
      radioOptCount: 5,
    },
    {
      activity:
        'Sharing technology-related knowledge through blog posts and video tutorials.',
      radioOptCount: 5,
    },
  ];

  careerPrefList: any[] = [
    { prefName: 'Software Development and Product Engineering', prefVal: 'SE' },
    { prefName: 'Software Quality Assurance and Testing', prefVal: 'QA' },
    { prefName: 'Software Project Management and Delivery', prefVal: 'PM' },
    { prefName: 'User Experience Design and Engineering', prefVal: 'UX' },
    { prefName: 'Network, Systems Engineering, and Infrastructure Services', prefVal: 'INFRA' },
  ];

  globalCertificates: any[] = [];
  diplomaCourses: any[] = [];
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private careerTestService: CareerTestService
  ) {}

  ngOnInit() {
    this.token = this.authService.decodeToken();

    this.stepOneFormGroup = this.formBuilder.group({
      cgpa: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*[1-9]\d*$/),
      ]),
      grades: this.formBuilder.array(
        this.displayedRowsStep1.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
    });

    this.stepTwoFormGroup = this.formBuilder.group({
      projectEngagementLevels: this.formBuilder.array(
        this.displayedRowsStep2.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
      openSourcesProjects: new FormControl(false, [Validators.required]),
      researchPerformance: new FormControl(false, [Validators.required]),
    });

    this.stepThreeFormGroup = this.formBuilder.group({
      trainingPerformance: new FormControl(false, [Validators.required]),
      trainingEngagementLevels: this.formBuilder.array(
        this.displayedRowsStep3.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
    });

    this.stepFourFormGroup = this.formBuilder.group({
      techSkills: this.formBuilder.array(
        this.displayedRowsStep4_1.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
      softSkills: this.formBuilder.array(
        this.displayedRowsStep4_2.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
    });

    this.stepFiveFormGroup = this.formBuilder.group({
      extraActivities: this.formBuilder.array(
        this.displayedRowsStep5.map(() =>
          this.formBuilder.control('', Validators.required)
        )
      ),
    });

    this.stepSixFormGroup = this.formBuilder.group({
      globalCerts: this.formBuilder.array(
        [].map(() => this.formBuilder.control('', Validators.required))
      ),
      diplomaCourses: this.formBuilder.array(
        [].map(() => this.formBuilder.control('', Validators.required))
      ),
    });

    setTimeout(() => {
      this.globalCertificates = [
        { title: 'Dev (Oracle, AWS, Azure, Google, Apple, Salesforce, etc.)', value: 1 },
        { title: 'Quality Assurance (ISTQB, ISCB etc.)', value: 1 },
        { title: 'Project Management (PMI, Scrum Alliance, SAFe etc.)', value: 1 },
        { title: 'UI/UX (Google, Nielsen Norman, SpringBoard etc.)', value: 1 },
        { title: 'Network/ DevOps (Cisco, Red Hat, Azure, AWS, Kubernetes, Docker, etc.)', value: 1 },
        { title: 'Security (ISC2, ISACA etc.)', value: 1 },
      ];
      this.diplomaCourses = [
        { title: 'Software Engineering', value: 1 },
        { title: 'Computer Programming', value: 1 },
        { title: 'Web Application Development', value: 1 },
        { title: 'Mobile Application Development', value: 1 },
        { title: 'Software Quality Assurance', value: 1 },
        { title: 'Automation Testing', value: 1 },
        { title: 'IT Project Management', value: 1 },
        { title: 'Agile Project Management', value: 1 },
        { title: 'UI/UX Design', value: 1 },
        { title: 'Graphics and Media Design', value: 1 },
        { title: 'Network Engineering', value: 1 },
        { title: 'DevOps Engineering', value: 1 },
        { title: 'System Administration', value: 1 },
        { title: 'Hardware Engineering', value: 1 },
        { title: 'Robotics & IoT', value: 1 },
        { title: 'Cyber Security', value: 1 },
        { title: 'Machine Learning & Data Science', value: 1 },
        { title: 'SEO & Digital Marketing', value: 1 },
        { title: 'Office Computer Application', value: 1 },
        { title: 'Human Resource Management', value: 1 },
      ];
    });
  }

  ngAfterViewInit(): void {
    // this.stepper.selectedIndex = 6;
  }

  getControl(index: number, step?: number): FormControl {
    let control = {} as FormControl;
    switch (step) {
      case 1:
        control = this.grades.at(index) as FormControl;
        break;
      case 2:
        control = this.projectEngagementLevels.at(index) as FormControl;
        break;
      case 3:
        control = this.trainingEngagementLevels.at(index) as FormControl;
        break;
      case 4.1:
        control = this.techSkills.at(index) as FormControl;
        break;
      case 4.2:
        control = this.softSkills.at(index) as FormControl;
        break;
      case 5:
        control = this.extraActivities.at(index) as FormControl;
        break;
      default:
        break;
    }
    return control;
  }

  get grades(): FormArray {
    return this.stepOneFormGroup.get('grades') as FormArray;
  }
  get projectEngagementLevels(): FormArray {
    return this.stepTwoFormGroup.get('projectEngagementLevels') as FormArray;
  }
  get trainingEngagementLevels(): FormArray {
    return this.stepThreeFormGroup.get('trainingEngagementLevels') as FormArray;
  }
  get techSkills(): FormArray {
    return this.stepFourFormGroup.get('techSkills') as FormArray;
  }
  get softSkills(): FormArray {
    return this.stepFourFormGroup.get('softSkills') as FormArray;
  }
  get extraActivities(): FormArray {
    return this.stepFiveFormGroup.get('extraActivities') as FormArray;
  }

  onChange(event: any, type: number): void {
    if (type === 0) {
      const globalCert = (<FormArray>(
        this.stepSixFormGroup.get('globalCerts')
      )) as FormArray;
      if (event.checked) {
        globalCert.push(new FormControl(event.source.value));
      } else {
        const i = globalCert.controls.findIndex(
          (x) => x.value === event.source.value
        );
        globalCert.removeAt(i);
      }
    } else {
      const diplomaCourse = (<FormArray>(
        this.stepSixFormGroup.get('diplomaCourses')
      )) as FormArray;
      if (event.checked) {
        diplomaCourse.push(new FormControl(event.source.value));
      } else {
        const i = diplomaCourse.controls.findIndex(
          (x) => x.value === event.source.value
        );
        diplomaCourse.removeAt(i);
      }
    }
  }

  radioOptionCounter(i: number): number[] {
    return new Array(i);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.careerPrefList,
      event.previousIndex,
      event.currentIndex
    );
  }

  dragging(event: CdkDragMove<any>): void {
    return;
  }

  moveUp(index: number): void {
    if (index <= this.careerPrefList.length - 1 && index > 0) {
      moveItemInArray(this.careerPrefList, index, index - 1);
    }
  }

  moveDown(index: number): void {
    if (index >= 0 && index < this.careerPrefList.length) {
      moveItemInArray(this.careerPrefList, index, index + 1);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.authService.decodeToken().unique_name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.name + ' end the test');
        this.router.navigateByUrl('main');
      }
    });
  }

  openWaitingDialog(): void {
    this.dialog.open(WaitingDialogComponent, { disableClose: true });
  }

  closeWaitingDialog(): void {
    const dialogs = this.dialog.openDialogs;
    if (dialogs.length > 0) {
      const targetDialog = dialogs.find(dialog => dialog.componentInstance instanceof WaitingDialogComponent);
      targetDialog?.close();
    }
  }

  createFuzzyInputData(formDataArr: any[], indexNo: number): void {
    let sumSE = 0;
    let sumQA = 0;
    let sumPM = 0;
    let sumUX = 0;
    let sumINFRA = 0;

    this.fuzzyIndexes[indexNo - 1][0].map((eleVal: number) => { sumSE += formDataArr[eleVal]; });
    this.fuzzyIndexes[indexNo - 1][1].map((eleVal: number) => { sumQA += formDataArr[eleVal]; });
    this.fuzzyIndexes[indexNo - 1][2].map((eleVal: number) => { sumPM += formDataArr[eleVal]; });
    this.fuzzyIndexes[indexNo - 1][3].map((eleVal: number) => { sumUX += formDataArr[eleVal]; });
    this.fuzzyIndexes[indexNo - 1][4].map((eleVal: number) => { sumINFRA += formDataArr[eleVal]; });

    this.fuzzyObjArr.push({
      key: indexNo,
      value: { SE: sumSE, QA: sumQA, PM: sumPM, UX: sumUX, INFRA: sumINFRA },
    });
  }

  arrangeOptionObj(array1: any[], array2: any[]): Array<any> {
    const customArr: any[] = [];
    array1.map((value: any, index: any) => {
      customArr.push({
        key: array2.at(index)[Object.keys(array2.at(index))[0]],
        value: value,
      });
    });
    return customArr;
  }

  step1Next(): void {
    const gradesList = this.stepOneFormGroup.get('grades')?.value;
    const step1Obj = {
      cgpa: this.stepOneFormGroup.get('cgpa')?.value,
      grades: this.arrangeOptionObj(gradesList, this.displayedRowsStep1),
    };

    this.createFuzzyInputData(gradesList, 1);
    Object.assign(this.submittedDataObj.testInputsObj.step1, step1Obj);
  }

  step2Next(): void {
    const projectEngmtList = this.stepTwoFormGroup.get(
      'projectEngagementLevels'
    )?.value;
    const step2Obj = {
      projectEngagementLevels: this.arrangeOptionObj(
        projectEngmtList,
        this.displayedRowsStep2
      ),
      openSourcesProjects: this.stepTwoFormGroup.get('openSourcesProjects')
        ?.value,
      researchPerformance: this.stepTwoFormGroup.get('researchPerformance')
        ?.value,
    };

    this.createFuzzyInputData(projectEngmtList, 2);
    Object.assign(this.submittedDataObj.testInputsObj.step2, step2Obj);
  }

  step3Next(): void {
    const trainingEngmtLevelList = this.stepThreeFormGroup.get(
      'trainingEngagementLevels'
    )?.value;
    const step3Obj = {
      trainingPerformance: this.stepThreeFormGroup.get('trainingPerformance')
        ?.value,
      trainingEngagementLevels: this.arrangeOptionObj(
        trainingEngmtLevelList,
        this.displayedRowsStep3
      ),
    };

    this.createFuzzyInputData(trainingEngmtLevelList, 3);
    Object.assign(this.submittedDataObj.testInputsObj.step3, step3Obj);
  }

  step4Next(): void {
    const techSkills = this.stepFourFormGroup.get('techSkills')?.value;
    const softSkills = this.stepFourFormGroup.get('softSkills')?.value;
    const step4Obj = {
      techSkills: this.arrangeOptionObj(techSkills, this.displayedRowsStep4_1),
      softSkills: this.arrangeOptionObj(softSkills, this.displayedRowsStep4_2),
    };

    this.createFuzzyInputData(techSkills, 4);
    this.createFuzzyInputData(softSkills, 5);
    Object.assign(this.submittedDataObj.testInputsObj.step4, step4Obj);
  }

  step5Next(): void {
    const extraActivities =
      this.stepFiveFormGroup.get('extraActivities')?.value;
    const step5Obj = {
      extraActivities: this.arrangeOptionObj(
        extraActivities,
        this.displayedRowsStep5
      ),
    };

    this.createFuzzyInputData(extraActivities, 6);
    Object.assign(this.submittedDataObj.testInputsObj.step5, step5Obj);
  }

  step6Next(): void {
    const globalCerts = this.stepSixFormGroup.get('globalCerts')?.value;
    const diplomaCourses = this.stepSixFormGroup.get('diplomaCourses')?.value;
    const step6Obj = {
      globalCertificates: this.arrangeOptionObj(
        globalCerts,
        this.globalCertificates
      ),
      diplomaCourses: this.arrangeOptionObj(
        diplomaCourses,
        this.diplomaCourses
      ),
    };

    const finalStep6Arr: any[] = [];
    const fullStep6Arr = this.globalCertificates.concat(this.diplomaCourses);
    const fullSubmittedStep6Arr: any[] = globalCerts.concat(diplomaCourses);

    fullStep6Arr.map((element) => {
      if (fullSubmittedStep6Arr.includes(element.value)) {
        finalStep6Arr.push(element.value);
      } else {
        finalStep6Arr.push(0);
      }
    });

    this.createFuzzyInputData(finalStep6Arr, 7);
    Object.assign(this.submittedDataObj.testInputsObj.step6, step6Obj);
  }

  step7Next(): void {
    const step7Obj = {
      careerPathRanking: this.careerPrefList,
    };
    Object.assign(this.submittedDataObj.testInputsObj.step7, step7Obj);
    this.submit();
  }

  submit(): void {
    this.openWaitingDialog();
    this.isSubmitted = true;

    const finalDataObj = {
      userId: this.token.nameid,
      testedOn: new Date().toISOString(),
      testInputsObj: JSON.stringify(this.submittedDataObj.testInputsObj),
    };

    const detailedFuzzyObj = [];
    const preferences = ['SE', 'QA', 'PM', 'UX', 'INFRA'];
    const preferenceScores = [100, 80, 60, 40, 20];

    if (this.fuzzyObjArr.length > 0) {
      for (let index = 0; index < 5; index++) {
        const pref = preferences[index] || '';
        const prefScoreIndex = this.careerPrefList.findIndex((item: any) => item.prefVal === pref);
  
        detailedFuzzyObj.push({
          mark: (this.fuzzyObjArr[0].value?.[pref] / 5) || null,
          project: this.fuzzyObjArr[1].value?.[pref] || null,
          internship: this.fuzzyObjArr[2].value?.[pref] || null,
          technical_skills: this.fuzzyObjArr[3].value?.[pref] || null,
          soft_skills: this.fuzzyObjArr[4].value?.[pref] || null,
          preference: (preferenceScores[prefScoreIndex] / 5),
          professional_achievements: this.fuzzyObjArr[5].value?.[pref] || null,
          extra_curricular_achievements: this.fuzzyObjArr[6].value?.[pref] || null,
        });
      }
      console.log(detailedFuzzyObj);

      detailedFuzzyObj.forEach((cp, index) => {
        const fuzzyObj = {
          "input1": ((cp.mark + cp.project + cp.internship) / 120) * 100,
          "input2": ((cp.technical_skills + cp.soft_skills) / 50) * 100,
          "input3": (cp.preference / 25) * 100,
          "input4": ((cp.professional_achievements + cp.extra_curricular_achievements) / 32) * 100
        }

        this.careerTestService.processFuzzy(fuzzyObj).subscribe({
          next: (result) => {
            this.isSubmitted = false;
            console.log(result);
            if (result.output && (index === detailedFuzzyObj.length-1)) {
              this.careerTestService.submitTestData(finalDataObj).subscribe({
                next: (res) => {
                  alert(res.message);
                  this.fuzzyOutputObj.push(res.output);
                  this.stepOneFormGroup.reset();
                  this.stepTwoFormGroup.reset();
                  this.stepThreeFormGroup.reset();
                  this.stepFourFormGroup.reset();
                  this.stepFiveFormGroup.reset();
                  this.stepSixFormGroup.reset();
                },
                error: (err) => {
                  alert(err.error.message);
                },
              });
            } else {
              alert("Could not fetch the response!");
            }
            this.closeWaitingDialog();
          },
          error: (err) => {
            alert(err.error.message);
            this.isSubmitted = false;
            this.closeWaitingDialog();
          }
        })
      });
    } else {
      alert("Some data is missing!");
      this.closeWaitingDialog();
    }
  }
}

