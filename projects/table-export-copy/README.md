# Table Export and Copy 

This Angular package is to make a button in given element and creates an option to Copy or Export a table to Excel. Applying the directive and config is enough to make this package work. But It needs angular material and material icons package

&nbsp;

## Getting Started

```
npm install --save table-export-copy
```

If angular material is not installed in your project. Install it.
```
ng add @angular/material
```
Add below Icon package in your index.html
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

After installing table-export-copy import MatTableExporterModule in your ngModule
```
import { TableExportCopyModule } from 'table-export-copy';
```
```
@NgModule({
  imports: [
    ...
    TableExportCopyModule
  ],
 ]})
```

&nbsp;

## Usage

`tableExportCopy` is the directive selector. Use this directive in parent div element of table

exportConfig is the config option to mention the table element and button element to identify where the package need place the button. This two options are required and both accepts string with value of unique element tag or id of the element or class of the tag

```html
<div tableExportCopy [exportConfig]="{tableElementID:'table',buttonElementID:'.header'}">
```

## API

### tableExportCopyDirective

### @Input ```exportConfig``` <`Object`>

| Key | Type | Description | Example |
| --- | --- | --- | --- |
| tableElementID | `String` | (Required) The Unique html table id or tag name or class name | #my-table or table or .my-table |
| buttonElementID | `String` | (Required) The Unique div tag id or tag name or class name | #header or header or .header |
| fileName | `String` | (Optional) File name of the excel | myexcelFile |
| menuItems | `Array<String>` | (Optional) Options to perform. Two supported options only | copy_table or export_table |

### @Output ```exportResult``` <EventEmitter<void>> - Event that's fired when the Operation completed

&nbsp;&nbsp;


