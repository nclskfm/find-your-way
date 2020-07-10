import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/core/interfaces/location.interface';
import { TspInitService } from 'src/app/core/services/tsp-init.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  locations$: Observable<Location[]>;

  locations: Location[] = [];

  constructor(
    private locationService: LocationService,
    private tspInitService: TspInitService
  ) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.getLocations();
    this.locations$.subscribe(locations => {
      this.locations = locations;
      console.log(locations);
    });
  }

  solveTsp() {
    if (this.locations && this.locations.length) {
      this.tspInitService.initTsp(this.locations);
    }
  }

}
