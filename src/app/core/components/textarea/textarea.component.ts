import { Component, inject, input, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'pm-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() controlName!: string;

  readonly controlContainer = inject(ControlContainer, { optional: true });
  readonly class = input<string>();
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly helpText = input<string>();
  readonly iconColor = input<string>('text-gray-300');
  readonly placeholder = input<string>('Digite aqui...');

  constructor() {
    if (!this.controlContainer && this.controlName) {
      throw new Error(
        '[pm-textarea] Este componente precisa estar dentro de um <form> com [formGroup] ou [ngForm].'
      );
    }
  }
}
