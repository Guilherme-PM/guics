import { LucideAngularModule } from 'lucide-angular';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pm-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  class = input<string>();

  title = input<string>();
  titleColor = input<string>();
  icon = input<string>();
  iconColor = input<string>('text-primary-400');
  content = input<string>();
  subContent = input<string>();
  contentColor = input<string>('text-primary-400');
  subContentColor = input<string>('text-gray-300');
}
