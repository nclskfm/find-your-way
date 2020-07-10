import { Component, OnInit } from '@angular/core';
import { TspSolver } from 'src/app/tsp-solver/tsp-solver';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Location } from 'src/app/core/interfaces/location.interface';
import { TspInitService } from 'src/app/core/services/tsp-init.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  mockAdj: number[][] =
  [[0, 75, 75, 80, 60, 90, 80, 40, 10, 90, 55, 35, 45, 40, 20, 80, 85, 30, 50, 40, 15],
[70, 0, 10, 10, 60, 75, 40, 10, 85, 70, 60, 35, 70, 95, 45, 60, 20, 40, 25, 25, 45],
[30, 10, 0, 30, 50, 10, 5, 90, 70, 75, 10, 30, 15, 35, 50, 65, 45, 70, 75, 60, 85],
[5, 15, 55, 0, 60, 15, 5, 85, 50, 50, 40, 50, 85, 60, 45, 70, 80, 85, 95, 25, 10],
[35, 95, 35, 80, 0, 70, 25, 80, 15, 75, 20, 20, 80, 5, 65, 40, 60, 15, 20, 40, 85],
[60, 50, 85, 90, 90, 0, 60, 50, 95, 45, 40, 95, 60, 50, 60, 55, 65, 90, 30, 90, 80],
[10, 75, 30, 95, 60, 45, 0, 75, 55, 75, 15, 45, 15, 65, 65, 20, 40, 60, 15, 65, 10],
[40, 5, 75, 10, 85, 70, 90, 0, 35, 70, 95, 75, 55, 10, 55, 30, 35, 45, 80, 55, 90],
[5, 80, 80, 70, 90, 55, 50, 5, 0, 35, 5, 55, 95, 65, 40, 85, 40, 20, 5, 80, 90],
[5, 10, 45, 60, 45, 55, 10, 20, 5, 0, 45, 65, 40, 85, 30, 45, 40, 35, 80, 70, 40],
[45, 70, 35, 95, 5, 80, 60, 90, 20, 90, 0, 70, 50, 85, 50, 85, 25, 90, 45, 30, 70],
[85, 65, 70, 65, 70, 80, 45, 85, 40, 5, 65, 0, 85, 5, 10, 35, 30, 95, 30, 85, 45],
[50, 85, 70, 25, 5, 60, 10, 60, 75, 50, 20, 40, 0, 15, 30, 30, 10, 70, 65, 5, 30],
[25, 50, 40, 80, 35, 65, 70, 40, 85, 30, 90, 20, 70, 0, 35, 30, 15, 35, 65, 40, 10],
[5, 15, 45, 65, 55, 95, 75, 75, 80, 60, 5, 65, 90, 55, 0, 80, 20, 25, 30, 55, 45],
[85, 85, 70, 95, 15, 80, 55, 80, 15, 20, 55, 25, 45, 35, 30, 0, 40, 75, 35, 95, 70],
[75, 65, 75, 70, 55, 15, 55, 30, 65, 60, 90, 15, 65, 20, 45, 35, 0, 60, 40, 35, 70],
[75, 60, 15, 80, 60, 55, 25, 55, 75, 5, 95, 60, 75, 15, 55, 50, 60, 0, 80, 25, 80],
[15, 90, 55, 55, 95, 35, 85, 65, 40, 60, 80, 35, 35, 30, 90, 30, 45, 65, 0, 25, 15],
[30, 5, 20, 30, 90, 30, 70, 15, 20, 65, 15, 80, 85, 30, 90, 85, 40, 30, 35, 0, 35],
[40, 30, 95, 35, 15, 40, 65, 30, 65, 10, 60, 30, 50, 85, 95, 25, 65, 90, 45, 75, 0]];

mockLocations: Location[] = [
  {
    id: 1,
    msgLocation: 'Ismaning/München (Hauptsitz)',
    street: 'Robert-Bürkle-Straße',
    houseNumber: '1',
    postcode: '85737',
    city: 'Ismaning',
    latitude: 48.229035,
    longitude: 11.686153
  },
  {
    id: 2,
    msgLocation: 'Berlin',
    street: 'Wittestraße',
    houseNumber: '30',
    postcode: '13509',
    city: 'Berlin',
    latitude: 52.580911,
    longitude: 13.293884
  },
  {
    id: 3,
    msgLocation: 'Braunschweig',
    street: 'Mittelweg',
    houseNumber: '7',
    postcode: '38106',
    city: 'Braunschweig',
    latitude: 52.278748,
    longitude: 10.524797
  },
  {
    id: 4,
    msgLocation: 'Bretten',
    street: 'Edisonstraße',
    houseNumber: '2',
    postcode: '75015',
    city: 'Bretten',
    latitude: 49.032767,
    longitude: 8.698372
  },
  {
    id: 5,
    msgLocation: 'Chemnitz',
    street: 'Zwickauer Straße',
    houseNumber: '16a',
    postcode: '09122',
    city: 'Chemnitz',
    latitude: 50.829383,
    longitude: 12.914737
  },
  {
    id: 6,
    msgLocation: 'Düsseldorf',
    street: 'Gladbecker Straße',
    houseNumber: '3',
    postcode: '40472',
    city: 'Düsseldorf',
    latitude: 51.274774,
    longitude: 6.794912
  },
  {
    id: 7,
    msgLocation: 'Essen',
    street: 'Am Thyssenhaus',
    houseNumber: '1.3',
    postcode: '45128',
    city: 'Essen',
    latitude: 51.450577,
    longitude: 7.008871
  },
  {
    id: 8,
    msgLocation: 'Frankfurt',
    street: 'Mergenthalerallee',
    houseNumber: '73-75',
    postcode: '65760',
    city: 'Eschborn',
    latitude: 50.136479,
    longitude: 8.570963
  },
  {
    id: 9,
    msgLocation: 'Görlitz',
    street: 'Melanchthonstraße',
    houseNumber: '19',
    postcode: '02826',
    city: 'Görlitz',
    latitude: 51.145511,
    longitude: 14.970028
  },
  {
    id: 10,
    msgLocation: 'Hamburg',
    street: 'Dammtorwall',
    houseNumber: '7a',
    postcode: '20354',
    city: 'Hamburg',
    latitude: 53.557577,
    longitude: 9.986065
  }
];

  constructor(
    private loadingService: LoadingService,
    private tspInitService: TspInitService
  ) {}

  ngOnInit() {

  }

  testAlgo() {
    // const tsp = new TspSolver(this.mockAdj);
    const startTime = new Date();
    // console.log(tsp.solve());
    this.tspInitService.initTsp(this.mockLocations);
    const endTime = new Date();
    console.log('time: ', (endTime.getTime() - startTime.getTime()) / 1000, ' seconds');
  }

  add(key: string) {
    this.loadingService.add({
      key,
      message: key + ' is loading ...'
    });
  }

  remove(key: string) {
    this.loadingService.remove(key);
  }

}
