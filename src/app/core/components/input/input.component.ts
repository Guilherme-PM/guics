import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-input',
  imports: [ LucideAngularModule, CommonModule ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
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
        '[pm-input] Este componente precisa estar dentro de um <form> com [formGroup] ou [ngForm].'
      );
    }
  }
}
