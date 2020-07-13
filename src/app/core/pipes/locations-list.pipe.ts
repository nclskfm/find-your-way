import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../interfaces/location.interface';

/**
 * Pipe to return a string containing the chained location names.
 * The first and last location are ignored.
 */
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
