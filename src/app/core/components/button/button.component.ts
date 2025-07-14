import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-button',
  imports: [ CommonModule, LucideAngularModule ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  label = input<string>('Clique');
  selected = input<boolean>(false);
  icon = input<string>();
  styleClass = input<string>();

  private _text = false;
  private _outlined = false;

  @Output() onClick = new EventEmitter<void>();
  @Input()
  set text(val: any) {
    this._text = val !== null && val !== undefined && `${val}` !== 'false';
  }

  get text(): boolean {
    return this._text;
  }

  @Input()
  set outlined(val: any) {
    this._outlined = val !== null && val !== undefined && `${val}` !== 'false';
  }

  get outlined(): boolean {
    return this._outlined;
  }

  onButtonClick(): void {
    this.onClick.emit();
  }
}
