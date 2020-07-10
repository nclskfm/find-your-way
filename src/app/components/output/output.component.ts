import { Component, OnInit } from '@angular/core';
import { TspInitService } from 'src/app/core/services/tsp-init.service';
import { Observable } from 'rxjs';
import { Solution } from 'src/app/core/interfaces/solution.interface';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  solution$: Observable<Solution>;

  displayedColumns = ['id', 'msgLocation', 'street', 'city', 'route'];

  constructor(
    private tspInitService: TspInitService
  ) { }

  ngOnInit(): void {
    this.solution$ = this.tspInitService.getSolution();
  }

}
