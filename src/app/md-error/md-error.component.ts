import { Component, Input } from '@angular/core';
import { ErrorType } from './md-error';

@Component({
  selector: 'ifx-md-error',
  templateUrl: './md-error.component.html',
  styleUrls: ['./md-error.component.scss']
})
export class MdErrorComponent {
  @Input() errorType: ErrorType = ErrorType.none;
  @Input() errorMessage: string = '';
  public ErrorTypeEnum = ErrorType;
}
