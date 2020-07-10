import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private csvData$ = new BehaviorSubject<string[][]>(null);

  constructor(
    private papaParser: Papa
  ) { }

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
      const csvTableHeader = results.data[0];

      const csvTableData = [...results.data.slice(1, results.data.length)];

      console.log(csvTableHeader);
      console.log(csvTableData);

      this.setCsvData(csvTableData);

    } else {
      for (const error of results.errors) {
        console.log( 'Error Parsing CSV File: ', error.message);
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
