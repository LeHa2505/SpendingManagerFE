import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.less']
})
export class ButtonAddComponent {
  @Input('btnName') btnName: string;
  @Input('iconBtn') iconBtn: string;
}
