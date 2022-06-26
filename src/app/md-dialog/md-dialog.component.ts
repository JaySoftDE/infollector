import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ifx-md-dialog',
  templateUrl: './md-dialog.component.html',
  styleUrls: ['./md-dialog.component.scss']
})
export class MdDialogComponent { 
  constructor(@Inject(MAT_DIALOG_DATA) public mdPath: string) {}
}
