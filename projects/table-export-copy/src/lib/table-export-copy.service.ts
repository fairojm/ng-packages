import { ElementRef, Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import constants from './excel-export-constants';
import { responseConfig } from './table-export-copy.directive';

@Injectable({
  providedIn: 'root'
})
export class TableExportCopyService {

  defaultFileName = 'ExcelSheet.xlsx';

  constructor(private snackBar: MatSnackBar) { }

  exportexcel(parentElement: ElementRef, { fileName, tableElementID }: any): responseConfig {
    if(fileName) fileName = fileName+'.xlsx'
    try {
      /* pass here the table id */
      let element = parentElement.nativeElement.querySelector(tableElementID)
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, fileName || this.defaultFileName);
      return {status:'success',operation: constants.EXPORT_TABLE ,message:'Exported successfully'}
    }
    catch (e) {
      console.error(e, "Unable to perform the operation. Please check the table element is correctly passed", tableElementID);
      return {status:'error',operation: constants.EXPORT_TABLE, message:'Unable to perform the operation. Please check the table element is correctly passed', error:e}
    }
  }
  openAutoCloseToast(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
