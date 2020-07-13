import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/core/interfaces/marker.interface';
import { LocationService } from 'src/app/core/services/location.service';
import { TspInitService } from 'src/app/core/services/tsp-init.service';
import { Observable } from 'rxjs';
import { Location } from 'src/app/core/interfaces/location.interface';

/**
 * Component to display Google Maps and draw the nodes and paths.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  zoom = 6.5;

  // germany
  center: google.maps.LatLngLiteral = {
    lat: 51.133481,
    lng: 10.018343
  };

  markers: Marker[] = [];
  line: google.maps.LatLngLiteral[];

  locations$: Observable<Location[]>;

  constructor(
    private locationService: LocationService,
    private tspInitService: TspInitService
  ) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.getLocations();

    this.locations$.subscribe(locations => {
      if (!locations || !locations.length) {
        this.markers = [];
      } else {
        this.markers = [];
        locations.forEach(location => {
          const marker: Marker = {
            position: {
              lat: location.latitude,
              lng: location.longitude
            },
            title: location.msgLocation,
            label: {
              text: location.id.toString(),
              fontWeight: 'bold'
            }
          };
          this.markers.push(marker);
        });
      }
    });

    this.tspInitService.getSolution().subscribe(solution => {
      if (!solution || !solution.locations) {
        this.line = [];
      } else {
        solution.locations.forEach(location => {
          this.line.push({
            lat: location.latitude,
            lng: location.longitude
          });
        });
      }
    });
  }

}
