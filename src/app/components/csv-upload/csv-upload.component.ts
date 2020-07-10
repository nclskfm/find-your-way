import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  csvControl = new FormControl();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.csvControl.valueChanges.subscribe(_ => {
      const files = this.csvControl.value?.files;

      if (files !== null && files !== undefined && files.length > 0) {
        this.dataService.convertCsv(files[0]);
      } else {
        this.dataService.convertCsv(null);
      }

    });
  }

}
