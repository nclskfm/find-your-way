import { Injectable } from '@angular/core';
import { Loading } from '../interfaces/loading.interface';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to handle the loading
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingStack$ = new BehaviorSubject<Loading[]>([]);

  constructor() { }

  public add(loading: Loading) {
    const newStack = this.loadingStack$.getValue();
    newStack.unshift(loading);
    this.loadingStack$.next(newStack);
  }

  public remove(key: string) {
    const newStack = this.loadingStack$.getValue();
    const index = newStack.findIndex(element => element.key === key);

    if (index === -1) {
      console.warn('could not remove loading key from loading stack: key not found!');
      return;
    }

    newStack.splice(index, 1);
    this.loadingStack$.next(newStack);
  }

  public getLoadingStack(): Observable<Loading[]> {
    return this.loadingStack$;
  }

}
