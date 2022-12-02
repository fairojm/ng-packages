import { NgModule } from '@angular/core';
import { TableExportCopyDirective } from './table-export-copy.directive';
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { ExportListModalComponent } from './export-list-modal/export-list-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    TableExportCopyDirective,
    ExportListModalComponent
  ],
  imports: [
    MatDialogModule,
    MatListModule,
    MatSnackBarModule
  ],
  exports: [
    TableExportCopyDirective,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class TableExportCopyModule { }
