import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'find-your-way';

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient) {}

ngAfterViewInit() {

  // load the api key dynamically
  // make sure the api key for google maps is in a file with the name "API_KEY"
  this.http.get('API_KEY.txt', { responseType: 'text' }).pipe(
    catchError(err => {
      console.error('MISSING/WRONG API_KEY', 'please make sure, you have created a file "/src/API_KEY.txt with your google api key!');
      return throwError(err);
    })
  ).subscribe(apiKey => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
    this.elementRef.nativeElement.appendChild(s);
  });
}

}
