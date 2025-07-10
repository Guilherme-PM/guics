import { CommonModule } from '@angular/common';
import { Component, input, Optional, Self, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-input',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  readonly class = input<string>();
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly helpText = input<string>();
  readonly iconColor = input<string>('text-gray-300');
  readonly placeholder = input<string>('Digite aqui...');

  value = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
