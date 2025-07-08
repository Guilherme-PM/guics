import { CommonModule } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'pm-panel',
  imports: [ CommonModule ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @ContentChild('actionButton') actionButtonTemplate!: TemplateRef<any>;

  class = input<string>();

  headerPanel = input<boolean>(false);
  title = input<string>('Título do Panel');
  titleColor = input<string>('text-primary-400');
  subTitle = input<string>('Subtítulo do Panel');
  subTitleColor = input<string>('text-gray-300');
}
