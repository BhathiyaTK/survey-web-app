import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent implements OnInit {
  year: number | undefined;

  constructor() {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
}
