import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import constants from '../excel-export-constants';

@Component({
  selector: 'app-export-list-modal',
  templateUrl: './export-list-modal.component.html',
  // styleUrls: ['./export-list-modal.component.scss']
})
export class ExportListModalComponent implements OnInit {
  private positionRelativeToElement: HTMLElement
  constants = constants
  config: Array<String> = []

  constructor(public dialogRef: MatDialogRef<ExportListModalComponent>, @Inject(MAT_DIALOG_DATA) public options: { positionRelativeToElement: HTMLElement, menuItems: Array<String> }) {
    this.positionRelativeToElement = options.positionRelativeToElement
    this.config = this.options.menuItems
  }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.positionRelativeToElement.getBoundingClientRect()
    // console.log(rect, window.screen.width)
    let screenWidth = window.screen.width
    var percentage = ( screenWidth - rect.right ) /screenWidth
    // console.log("per",percentage)
    matDialogConfig.position = { right: `${rect.right}px`, left: `${rect.left - 100}px`, top: `${rect.top + 30}px`, bottom: `${rect.bottom}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  handleClick(flag: String) {
    this.dialogRef.close(flag);
  }

}
