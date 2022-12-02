import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TableExportCopyService } from './table-export-copy.service';
import { ExportListModalComponent } from './export-list-modal/export-list-modal.component';
import constants from './excel-export-constants';

@Directive({
  selector: '[tableExportCopy]'
})
export class TableExportCopyDirective {

  @Input() exportConfig: excelExportConfig = { tableElementID: '', buttonElementID: '' };
  defaultMenuItems = [constants.COPY_TABLE, constants.EXPORT_TABLE]
  @Output() exportResult: EventEmitter<Object> = new EventEmitter()

  constructor(private ele: ElementRef, private renderer: Renderer2,
    private exportService: TableExportCopyService, private matDialog: MatDialog) {
  }

  ngAfterViewInit() {
    /** FUNCTION TO CREATE BUTTON AND RETURNING THE ELEMENT */
    let { divTag, optionButton } = this.createElements() 
    try {
      console.log("***Generating button for "+this.exportConfig.buttonElementID+"***");
      /** STORING THE BUTTON ELEMENT FROM EXPORTCONFIG */
      let parent = this.ele.nativeElement.querySelector(this.exportConfig.buttonElementID)
      /** APPENDING PARENT DIV TAG TO HEADER TAG */
      this.renderer.appendChild(parent, divTag); 
      /** LISTENING FOR BUTTON CLICK */
      this.listenForButtonClick(optionButton)
    }
    catch (e) {
      console.error(e);
      this.exportService.openAutoCloseToast("Unable to perform operation. Please check the button element is correctly passed")
    }

  }

  createElements() {
    /** CREATING DIV TAG WITH INLINE STYLE */
    let divTag = this.renderer.createElement('div')
    this.renderer.addClass(divTag, 'option-div')
    this.renderer.setAttribute(divTag, 'style', 'display:inline;float:right;')

    /** CREATING MATERIAL ICON */
    const optionButton = this.renderer.createElement("mat-icon");
    this.renderer.setAttribute(optionButton, "class", "material-icons mat-icon");
    this.renderer.setStyle(optionButton,'cursor','pointer');
    this.renderer.setAttribute(optionButton, "inline", "true")
    this.renderer.setAttribute(optionButton, 'id', 'generated-btn' + this.exportConfig.buttonElementID)
    this.renderer.setProperty(optionButton, 'innerHTML', 'more_vert')

    this.renderer.appendChild(divTag, optionButton); /** APPENDING BUTTON TAG TO DIVTAG */
    return { divTag, optionButton }
  }

  listenForButtonClick(optionButton: any) {
    this.renderer.listen(optionButton, 'click', e => {
      let btnEle = document.getElementById(optionButton.id)
      /** OPENING DIALOG TO SHOW THE OPTIONS (COPY TABLE, EXPORT TABLE) */
      let dialogRef = this.matDialog.open(ExportListModalComponent, {
        data: {
          positionRelativeToElement: btnEle,
          menuItems: this.exportConfig.menuItems || this.defaultMenuItems
        },
        backdropClass: 'cdk-overlay-transparent-backdrop',
        disableClose: false,
        panelClass: "export-option-cls"
      })
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        let response: responseConfig = {status:'',operation:'',message:''}
        switch (result) {
          case constants.COPY_TABLE:
            response = this.copyTable();
            break;
          case constants.EXPORT_TABLE:
            response = this.exportService.exportexcel(this.ele, this.exportConfig)
            break;
          default:
            break;
        }
        if(result)
          this.exportResult.emit(response)
      });
    })
  }

  copyTable():responseConfig {
    try{
    var urlField = this.ele.nativeElement.querySelector(this.exportConfig.tableElementID);
    let range = document.createRange();
    range.selectNodeContents(urlField)
    let select: any = window.getSelection()
    select.removeAllRanges()
    select.addRange(range)


    // execute 'copy', can't 'cut' in this case
    document.execCommand('copy');
    select.removeAllRanges()
    return {status:'success', operation: constants.COPY_TABLE, message:'Copied successfully'}
    // this.exportService.openAutoCloseToast("Table Copied to Clipboard")
    }
    catch(e) {
      console.error(e, "Unable to perform the operation. Please check the table element is correctly passed",);
      return {status:'error',operation: constants.COPY_TABLE, message:'Unable to perform the operation. Please check the table element is correctly passed', error:e}
    }
  }

}

export interface excelExportConfig {
  /** UNIQUE EXPORT TABLE ID or class or element ex: #table1 or .tbl-1 or table */
  tableElementID: String,  
  /** UNIQUE ELEMENT ID OR CLASS TO ATTACH THE EXPORT BUTTON in header ex: #option-btn or .option-btn or div*/
  buttonElementID: String,  
  /** FILE NAME OF THE EXCEL */
  fileName?: String,         
  /** List of items to show in a dialog Refer excel-export-constants.ts for available options*/
  menuItems?: Array<String> 
}

export interface responseConfig {
  status: String,
  operation: String,
  message: String,
  error?: any
}
