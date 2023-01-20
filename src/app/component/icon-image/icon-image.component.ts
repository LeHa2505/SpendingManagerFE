import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-image',
  templateUrl: './icon-image.component.html',
  styleUrls: ['./icon-image.component.less']
})
export class IconImageComponent {
  @Input('iconImg') iconName: string;
}

