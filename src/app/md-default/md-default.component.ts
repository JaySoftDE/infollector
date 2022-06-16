import { Component, OnInit, Input } from '@angular/core';

import { DefaultMode } from './md-default';

@Component({
  selector: 'ifx-md-default',
  templateUrl: './md-default.component.html',
  styleUrls: ['./md-default.component.scss']
})
export class MdDefaultComponent implements OnInit {

  @Input() mode: DefaultMode = DefaultMode.noHint;

  public ModeEnum = DefaultMode;

  constructor() { }

  ngOnInit(): void {
  }

}
