import { Component, Input } from '@angular/core';
import { InfollectorError, ErrorType, ErrorSubtype } from './md-error';

import { 
  LBL_ERROR_FILE,
  LBL_ERROR_STRUCTURE,
 } from '../app.const';

@Component({
  selector: 'ifx-md-error',
  templateUrl: './md-error.component.html',
  styleUrls: ['./md-error.component.scss']
})
export class MdErrorComponent {
  @Input() infollectorError= new InfollectorError;
  
  public ErrorTypeEnum = ErrorType;
  public ErrorSubTypeEnum = ErrorSubtype;

  public errMsgFile = LBL_ERROR_FILE;
  public errMsgStructure = LBL_ERROR_STRUCTURE;

  hasError(): boolean {
    return (this.infollectorError.type != ErrorType.none);
  }
}
