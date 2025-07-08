import { CommonModule } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-select',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() controlName!: string;

  readonly controlContainer = inject(ControlContainer, { optional: true });
  readonly class = input<string>();
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly helpText = input<string>();
  readonly iconColor = input<string>('text-gray-300');
  readonly placeholder = input<string>('Digite aqui...');

  readonly filter = input<boolean>(true);
  readonly options = input<any[]>([]);

  readonly optionLabel = input<string>('label');
  readonly optionValue = input<string>('value');
}
