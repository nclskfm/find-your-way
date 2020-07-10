import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../interfaces/location.interface';

@Pipe({
  name: 'locationsList'
})
export class LocationsListPipe implements PipeTransform {

  transform(locations: Location[]): string {
    const names: string[] = [];
    for (let i = 1; i < locations.length - 1; i++) {
      names.push(locations[i].msgLocation);
    }
    return names.join(', ');
  }

}
