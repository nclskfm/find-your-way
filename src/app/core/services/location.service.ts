import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { DataService } from './data.service';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locations$: Observable<Location[]>;

  constructor(private dataService: DataService) {
    this.locations$ = this.dataService.getCsvData().pipe(
      map(data => {
        if (!data) { return null; }
        const locations: Location[] = [];
        console.log(data);
        data.forEach(row => {
          if (row[0] !== '' && row.length === 8) {
            const location: Location = {
              id: +row[0],
              msgLocation: row[1],
              street: row[2],
              houseNumber: row[3],
              postcode: row[4],
              city: row[5],
              latitude: +row[6],
              longitude: +row[7]
            };
            locations.push(location);
          }
        });
        return locations;
      }),
      shareReplay()
    );
  }

  getLocations(): Observable<Location[]> {
    return this.locations$;
  }
}
