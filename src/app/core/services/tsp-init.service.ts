import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solution } from '../interfaces/solution.interface';
import { Location } from '../interfaces/location.interface';
import { LoadingService } from './loading.service';
import { TspSolver } from 'src/app/tsp-solver/tsp-solver';
import { LocationService } from './location.service';

// tslint:disable: prefer-for-of

/**
 * Service to initiate the tsp solver and save the solution.
 * The actual tsp algorithm is outsourced in an extra class `TspSolver`.
 */
@Injectable({
  providedIn: 'root'
})
export class TspInitService {

  private solution$ = new BehaviorSubject<Solution>(null);

  constructor(
    private loadingService: LoadingService,
    private locationService: LocationService
  ) {
    this.locationService.getLocations().subscribe(locations => {
      // reset the solution
      if (!(locations && locations.length)) {
        this.solution$.next(null);
      }
    });
  }

  /**
   * function to calculate the distance between two points.
   *
   * Credits: https://stackoverflow.com/a/27943/10967372
   */
  private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const r = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  /**
   * function to convert
   * @param locations array of locations
   * into
   * @returns adjacency matrix (number[][])
   */
  private calculateAdj(locations: Location[]): number[][] {
    const adj: number[][] = [];

    for (let i = 0; i < locations.length; i++) {
      const row: number[] = [];
      for (let k = 0; k < locations.length; k++) {
        if (i === k) {
          row.push(0);
        } else {
          row.push(this.getDistanceFromLatLonInKm(locations[i].latitude, locations[i].longitude,
            locations[k].latitude, locations[k].longitude));
        }
      }
      adj.push(row);
    }
    return adj;
  }

  /**
   * function to sort a locations array by a given path
   */
  private mapLocationsToPath(path: number[], locations: Location[]): Location[] {
    const newLocations: Location[] = [];

    path.forEach(point => {
      const location = locations.find(l => l.id === point);

      if (!location) {
        return null;
      }
      newLocations.push(location);
    });

    return newLocations;
  }

  /**
   * function to initalize the tsp. The calculated result is stored into the behavior subject `solution$`.
   * @param locations locations array
   */
  public initTsp(locations: Location[]) {

    const adj = this.calculateAdj(locations);

    this.loadingService.add({
      key: 'calculate-tsp',
      message: 'Die beste Route wird berechnet... Dieser Vorgang kann bis zu einer Minute dauern...'
    });

    setTimeout((_ => {
      const tsp = new TspSolver(adj);
      const solution = tsp.solve();

      // increase every path
      solution.path = solution.path.map(point => point + 1);

      solution.locations = this.mapLocationsToPath(solution.path, locations) || null;
      this.loadingService.remove('calculate-tsp');
      this.solution$.next(solution);

    }), 10);
  }

  public getSolution(): Observable<Solution> {
    return this.solution$;
  }
}
