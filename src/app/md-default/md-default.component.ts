import { Component, Input } from '@angular/core';
import { HintType } from './md-default';

@Component({
  selector: 'ifx-md-default',
  templateUrl: './md-default.component.html',
  styleUrls: ['./md-default.component.scss']
})
export class MdDefaultComponent {
  @Input() hintType: HintType = HintType.noHint;
  public HintTypeEnum = HintType;
}
