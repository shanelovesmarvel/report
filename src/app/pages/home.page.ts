import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacts-list',
  template: `
    <h2>Welcome to APX Report Demo!</h2>
  `
})
export class HomeComponent implements OnInit {
  private contacts = null;
  constructor() {
  }

  ngOnInit() {
  }
}