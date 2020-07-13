import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Loading } from 'src/app/core/interfaces/loading.interface';
import { LoadingService } from 'src/app/core/services/loading.service';

/**
 * component to show a global loading screen.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loadingStack$: Observable<Loading[]>;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingStack$ = this.loadingService.getLoadingStack();
  }
}
