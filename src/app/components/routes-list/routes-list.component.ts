import { Component, OnInit } from '@angular/core';
import { TspInitService } from 'src/app/core/services/tsp-init.service';
import { Location } from 'src/app/core/interfaces/location.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  splittedRoutes$: Observable<Location[][]>;

  displayedColumns = ['origin', 'destination', 'via', 'route'];

  constructor(
    private tspInitService: TspInitService
  ) { }

  ngOnInit(): void {
    this.splittedRoutes$ = this.tspInitService.getSolution().pipe(
      map(solution => {
        if (!solution || !solution.locations || !solution.locations.length ) {
          return [];
        }
        const countRows = Math.floor(solution.locations.length / 10);

        const locations = solution.locations;

        // google map supports only 9 waypoints and 1 destination
        const limit = 10;
        const splittedRoutes: Location[][] = [];
        let k = 1;
        let row: Location[] = [];

        for (let i = 0; i < locations.length; i++) {
          if (i > limit * k) {
            splittedRoutes.push(row);
            k++;
            i--;
            row = [];
          }
          row.push(locations[i]);
        }

        if (row.length > 1) {
          splittedRoutes.push(row);
        }

        console.log(splittedRoutes);
        return splittedRoutes;

      })
    );
  }

}
