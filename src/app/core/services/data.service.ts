import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Papa } from 'ngx-papaparse';

/**
 * Service to handle the csv upload and store the data in a behavior subject.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private csvData$ = new BehaviorSubject<string[][]>(null);

  constructor(
    private papaParser: Papa
  ) { }

  /**
   * credits: https://stackoverflow.com/a/56143413/10967372
   */
  public convertCsv(blob: Blob) {

    if (!blob) {
      this.setCsvData(null);
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsText(blob);
    reader.onload = e => {

    const csv = reader.result;
    const results = this.papaParser.parse(csv as string, { header: false });

    // VALIDATE PARSED CSV FILE
    if (results !== null && results !== undefined && results.data !== null &&
      results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {

      // PERFORM OPERATIONS ON PARSED CSV
      const csvTableData = [...results.data.slice(1, results.data.length)];

      this.setCsvData(csvTableData);

    } else {
      for (const error of results.errors) {
        console.warn( 'Error Parsing CSV File: ', error.message);
      }
    }
  };
  }

  private setCsvData(data: string[][]): void {
    this.csvData$.next(data);
  }

  public getCsvData(): Observable<string[][]> {
    return this.csvData$;
  }


}
