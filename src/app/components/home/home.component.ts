import { Component, OnInit } from '@angular/core';

/**
 * Component to include all other components of the app (Csv-Upload, Input, Output, Map & RoutesList)
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
