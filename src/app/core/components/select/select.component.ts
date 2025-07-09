import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-select',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('rotateChevron', [
      state('up', style({ transform: 'rotate(0deg)' })),
      state('down', style({ transform: 'rotate(180deg)' })),
      transition('up <=> down', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectComponent implements OnInit {
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

  openSelect: boolean = false;

  ngOnInit(): void {
    this.openSelect = false;
  }
}
