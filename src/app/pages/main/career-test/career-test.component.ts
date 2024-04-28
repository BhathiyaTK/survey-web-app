import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-test',
  templateUrl: './career-test.component.html',
  styleUrls: ['./career-test.component.scss'],
})
export class CareerTestComponent {

  stepSixFormGroup!: FormGroup;
  userName: string = 'John Doe';

  displayedRowsStep1 = [
    { subject: 'Programming Fundamentals', radioOptCount: 6 },
    { subject: 'Data Structures and Algorithms', radioOptCount: 6 },
    { subject: 'Database Systems', radioOptCount: 6 },
    { subject: 'Web Technologies', radioOptCount: 6 },
    { subject: 'Object-Oriented Programming', radioOptCount: 6 },
    { subject: 'Software Engineering', radioOptCount: 6 },
    { subject: 'Software Design Patterns', radioOptCount: 6 },
    { subject: 'Software Architecture and Design', radioOptCount: 6 },
    { subject: 'Software Project Management', radioOptCount: 6 },
    { subject: 'Agile Software Development', radioOptCount: 6 },
    { subject: 'Software Quality Assurance', radioOptCount: 6 },
    { subject: 'Human Computer Interaction', radioOptCount: 6 },
    { subject: 'Operating Systems', radioOptCount: 6 },
    { subject: 'Data Communication and Computer Networks', radioOptCount: 6 },
    { subject: 'Cloud Computing', radioOptCount: 6 },
    { subject: 'Mobile Computing', radioOptCount: 6 },
    { subject: 'Systems Administration and Maintenance', radioOptCount: 6 },
    { subject: 'Mini Project', radioOptCount: 6 },
    { subject: 'Industrial Traning', radioOptCount: 6 },
    { subject: 'Research Project', radioOptCount: 6 },
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
    { task: 'Develop project objectives, budgets, and schedules', radioOptCount: 5 },
    { task: 'Monitor and track project progress', radioOptCount: 5 },
    { task: 'Manage project tasks and resources', radioOptCount: 5 },
    { task: 'Report and document project progress', radioOptCount: 5 },
    { task: 'Design and build prototypes (mockups, wireframes)', radioOptCount: 5 },
    { task: 'Design and implement UI components', radioOptCount: 5 },
    { task: 'UI testing and bug fixing', radioOptCount: 5 },
    { task: 'Conducting user research', radioOptCount: 5 },
    { task: 'Implementing and maintaining IT infrastructure', radioOptCount: 5 },
    { task: 'Monitoring performance and troubleshooting', radioOptCount: 5 },
    { task: 'Deploying updates and fixes (CI/CD)', radioOptCount: 5 },
    { task: 'Security checks and system backups', radioOptCount: 5 },
  ];

  displayedRowsStep4_1 = [
    { task: 'Hands-on skills with tech stacks (languages, frameworks, tools, APIs)', radioOptCount: 5 },
    { task: 'Algorithms and data structures skills', radioOptCount: 5 },
    { task: 'Software design patterns and architectures skills', radioOptCount: 5 },
    { task: 'Debugging & bug fixing skills', radioOptCount: 5 },
    { task: 'Hands-on experience with software version & revision controlling', radioOptCount: 5 },
    { task: 'Hands-on experience with software quality assurance process', radioOptCount: 5 },
    { task: 'Hands-on skills with test automation', radioOptCount: 5 },
    { task: 'Hands-on experience with software project management process', radioOptCount: 5 },
    { task: 'Hands-on experience in agile software development', radioOptCount: 5 },
    { task: 'Hands-on experience with software estimation techniques', radioOptCount: 5 },
    { task: 'Presentation and public speaking skills', radioOptCount: 5 },
    { task: 'English language proficiency', radioOptCount: 5 },
    { task: 'Technical writing and documentation skills', radioOptCount: 5 },
    { task: 'Visual communication skills (prototyping, wireframing, mock-ups etc.)', radioOptCount: 5 },
    { task: 'Hands-on experience with UI/UX design and visual design', radioOptCount: 5 },
    { task: 'User research and usability testing', radioOptCount: 5 },
    { task: 'Network & system administration (scripting, configuration management)', radioOptCount: 5 },
    { task: 'Diagnosis & troubleshooting skills', radioOptCount: 5 },
    { task: 'Hands-on experience with firewalls and security monitoring tools', radioOptCount: 5 },
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
    { activity: 'Participation in national or university level competitions (hackthons, ideathons, coding challenges etc.)', radioOptCount: 5 },
    { activity: 'Participation in professional development workshops and training programs', radioOptCount: 5 },
    { activity: 'Participation in tech community initiatives such as meetups, tech talks, conferences, bootcamps etc.', radioOptCount: 5 },
    { activity: 'Volunteering in student societies such as Society of Computer Science, IEEE Student Branch, WIE, ISACA etc.', radioOptCount: 5 },
    { activity: 'Volunteering in clubs such as Toastmaster Club, GavelClub, Rotaract Club, Leo Club etc.', radioOptCount: 5 },
    { activity: 'Volunteering as a resource person, speaker, mentor, and organizer in initiatives such as hackthons, meetups, tech talks etc.', radioOptCount: 5 },
    { activity: 'Actively engaging in online tech forums such as Stack overflow, Code Project, GitHub etc.', radioOptCount: 5 },
    { activity: 'Sharing technology-related knowledge through blog posts and video tutorials.', radioOptCount: 5 },
    { activity: 'Placements in national or university level competitions (hackthons, ideathons, coding   challenges etc.)', radioOptCount: 5 },
  ];

  careerPrefList: any[] = [
    'Software Development and Product Engineering',
    'Software Project Management and Delivery',
    'Network and Systems Engineering',
    'DevOps and Infrastructure Services',
    'Software Quality Assurance and Testing',
    'Other (Non-IT career path)',
    'User Experience Design and Engineering',
    'Information Systems and Cyber Security Engineering',
    'Business Analysis and Requirements Engineering',
    'Other (IT related career path)'
  ]

  globalCertificates: any[] = [];
  diplomaCourses: any[] = [];
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.stepSixFormGroup = this.formBuilder.group({
      globalCerts: this.formBuilder.array([]),
      diplomaCourses: this.formBuilder.array([])
    });

    setTimeout(() => {
      this.globalCertificates = [
        { value: 'dev', title: 'Dev (Oracle, AWS, Azure, Google, Apple, Salesforce, etc.)' },
        { value: 'qa', title: 'Quality Assurance (ISTQB, ISCB etc.)' },
        { value: 'pm', title: 'Project Management (PMI, Scrum Alliance, SAFe etc.)' },
        { value: 'uiux', title: 'UI/UX (Google, Nielsen Norman, SpringBoard etc.)' },
        { value: 'devops', title: 'Network/ DevOps (Cisco, Red Hat, Azure, AWS, Kubernetes, Docker, etc.)' },
        { value: 'security', title: 'Security (ISC2, ISACA etc.)' },
      ];
      this.diplomaCourses = [
        { value: 'se', title: 'Software Engineering' },
        { value: 'cp', title: 'Computer Programming' },
        { value: 'wad', title: 'Web Application Development' },
        { value: 'mad', title: 'Mobile Application Development' },
        { value: 'sqa', title: 'Software Quality Assurance' },
        { value: 'itpm', title: 'IT Project Management' },
        { value: 'apm', title: 'Agile Project Management' },
        { value: 'uiux', title: 'UI/UX Design' },
        { value: 'gmd', title: 'Graphics and Media Design' },
        { value: 'ne', title: 'Network Engineering' },
        { value: 'dpe', title: 'DevOps Engineering' },
        { value: 'sa', title: 'System Administration' },
        { value: 'he', title: 'Hardware Engineering' },
        { value: 'ri', title: 'Robotics & IoT' },
        { value: 'cse', title: 'Cyber Security' },
        { value: 'mlds', title: 'Machine Learning & Data Science' },
        { value: 'seo', title: 'SEO & Digital Marketing' },
        { value: 'oca', title: 'Office Computer Application' },
        { value: 'hrm', title: 'Human Resource Management' },
      ];
    });
  }

  ngAfterViewInit(): void {
    // this.stepper.selectedIndex = 6;
  }

  onChange(event: any, type: number): void {
    if (type === 0) {
      const globalCert = <FormArray>this.stepSixFormGroup.get('globalCerts') as FormArray;
      if (event.checked) {
        globalCert.push(new FormControl(event.source.value));
      } else {
        const i = globalCert.controls.findIndex(x => x.value === event.source.value);
        globalCert.removeAt(i);
      }
    } else {
      const diplomaCourse = <FormArray>this.stepSixFormGroup.get('diplomaCourses') as FormArray;
      if (event.checked) {
        diplomaCourse.push(new FormControl(event.source.value));
      } else {
        const i = diplomaCourse.controls.findIndex(x => x.value === event.source.value);
        diplomaCourse.removeAt(i);
      }
    }
  }

  radioOptionCounter(i: number): number[] {
    return new Array(i);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.careerPrefList, event.previousIndex, event.currentIndex);
  }

  dragging(event: CdkDragMove<any>): void {
    return;
  }

  moveUp(index: number): void {
    if (index <= (this.careerPrefList.length - 1) && index > 0) {
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
      data: {name: this.userName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.name + ' left the test');
        this.router.navigateByUrl('main');
      }
    });
  }
}
