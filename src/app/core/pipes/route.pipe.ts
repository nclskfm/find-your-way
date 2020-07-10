import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../interfaces/location.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * returns a link for a google map route
   */
  transform(locations: Location[]): SafeUrl {
    const googleMapLink = 'https://www.google.com/maps/dir/?api=1';
    const origin = '&origin=' + locations[0].latitude + ',' + locations[0].longitude;
    const destination = '&destination=' + locations[locations.length - 1].latitude + ',' + locations[locations.length - 1].longitude;

    let waypoints = '';
    if (locations.length > 2) {
      waypoints = '&waypoints=';

      for (let i = 1; i < locations.length - 1; i++) {
        waypoints += locations[i].latitude + ',' + locations[i].longitude;
        if (i < locations.length - 2) {
          waypoints += '|';
        }
      }
    }

    return this.sanitizer.bypassSecurityTrustUrl(googleMapLink + origin + destination + waypoints);
  }

}
