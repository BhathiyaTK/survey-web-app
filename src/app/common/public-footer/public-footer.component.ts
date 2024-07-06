import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss']
})
export class PublicFooterComponent implements OnInit {
  year: number | undefined;

  constructor() {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
}
